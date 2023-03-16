/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { app, ipcMain, net } from "electron";
import pkg from "../../package.json";
import { sendToRenderer } from "./utils";

import Store from "electron-store";
import fs from "fs";
import path from "path";
import semver from "semver";
import tar from "tar";
import yaml from "js-yaml";

const version = pkg.version;
const isDevelopment = process.env.NODE_ENV !== "production";

export const registerFirmwareHandlers = () => {
  const slug = "keyboardio/Chrysalis-Firmware-Bundle";
  const firmwarePath = path.join(app.getPath("userData"), "latest-firmware");

  const gh = async (url, headers, cb) => {
    const options = {
      method: "GET",
      headers: Object.assign({ "User-Agent": `Chrysalis/${version}` }, headers),
      url: url,
    };

    return new Promise((resolve) => {
      const request = net.request(options);
      let data = "";
      request.on("error", async (error) => {
        cb && cb("error", error);
        resolve(null);
      });
      request.on("response", async (response) => {
        if (response.statusCode != 200) {
          cb &&
            cb("error", {
              statusCode: response.statusCode,
              url: url,
            });
          resolve(null);
          return;
        }
        const total = parseInt(response.headers["content-length"]);
        let size = 0;
        response.on("data", (chunk) => {
          size += chunk.length;
          data += chunk;

          if (cb) {
            if (total) {
              sendToRenderer("firmware-update.download-progress", {
                total,
                size,
                percent: (size / total) * 100,
              });
            }
            cb("data", chunk);
          }
        });
        response.on("end", () => {
          resolve(data);
          cb && cb("end");
        });
        response.on("error", () => {
          resolve(null);
          cb && cb("error");
        });
      });
      request.end();
    });
  };

  const ghApi = async (path) => {
    const data = await gh(`https://api.github.com/repos/${slug}${path}`, {
      Accept: "application/vnd.github.v3+json",
    });

    try {
      return JSON.parse(data);
    } catch (_) {
      return null;
    }
  };

  const ghDL = (tag, asset, cb) => {
    return gh(
      `https://github.com/${slug}/releases/download/${tag}/${asset}`,
      {},
      cb
    );
  };

  const getLatestInfo = async () => {
    let releases = await ghApi("/releases");
    if (!Array.isArray(releases) || releases.length == 0) {
      sendToRenderer(
        "firmware-update.warning",
        "Unable to fetch latest release"
      );
      return null;
    }

    // If we're not a snapshot version, then filter out snapshot firmware
    // releases.
    if (!version.match(/-snapshot/)) {
      releases = releases?.filter((rel) => !rel.prerelease);
    }

    const latestTag = releases[0].tag_name;
    if (!releases || !latestTag) {
      sendToRenderer(
        "firmware-update.warning",
        "Unable to fetch latest release"
      );
      return null;
    }
    const latestYaml = await ghDL(latestTag, "build-info.yml");
    if (!latestYaml) {
      sendToRenderer(
        "firmware-update.warning",
        `Unable to fetch ${latestTag}/build-info.yml`
      );
      return null;
    }

    let buildInfo;
    try {
      buildInfo = yaml.load(latestYaml);
    } catch (e) {
      sendToRenderer(
        "firmware-update.warning",
        `Unable to parse ${latestTag}/build-info.yml: ${e}`
      );
      return null;
    }

    return { latestTag, buildInfo };
  };

  const checkForUpdates = async () => {
    const info = await getLatestInfo();
    if (!info) return;

    let localBuildInfo;
    try {
      const data = fs.readFileSync(path.join(firmwarePath, "build-info.yml"));
      localBuildInfo = yaml.load(data);
    } catch (_) {
      // Ignore errors
    }

    if (
      (localBuildInfo &&
        semver.gt(info.buildInfo.version, localBuildInfo.version)) ||
      (!localBuildInfo && semver.gt(info.buildInfo.version, version))
    ) {
      sendToRenderer("firmware-update.update-available", info.buildInfo);
    }
  };

  const updateFirmware = async () => {
    const info = await getLatestInfo();
    if (!info) {
      sendToRenderer(
        "firmware-update.error",
        "getLatestInfo() failed, after checkForUpdates() succeeded"
      );
      return;
    }

    fs.mkdirSync(firmwarePath, { recursive: true });

    const t = tar.x({
      strip: 1,
      gzip: true,
      cwd: firmwarePath,
      onwarn: (warn) => {
        sendToRenderer("firmware-update.error", warn);
      },
    });

    const r = await ghDL(
      info.latestTag,
      "firmware-files.tar.gz",
      (event, chunk) => {
        if (event == "data") {
          t.write(chunk);
        } else if (event == "end") {
          t.end();
        } else if (event == "error") {
          sendToRenderer("firmware-update.error", chunk);
        }
      }
    );
    if (r) {
      sendToRenderer("firmware-update.update-downloaded", info.buildInfo);
    }
  };

  ipcMain.handle("firmware-update.check-for-updates", (event, mode) => {
    if (mode != "automatic") return;

    checkForUpdates();
  });

  ipcMain.handle("firmware-update.download", (event) => {
    updateFirmware();
  });

  const shouldPresentDownloadedSnapshot = () => {
    let buildInfo;
    try {
      const data = fs.readFileSync(path.join(firmwarePath, "build-info.yml"));
      buildInfo = yaml.load(data);
    } catch (_) {
      return false;
    }
    const fwVersion = buildInfo.version.match(/[^+]*/)[0];

    // If Chrysalis is a snapshot version, just show the latest firmware.
    if (version.match(/-snapshot/)) {
      return true;
    }

    // If Chrysais is not a snapshot, only show the downloaded firmware if it
    // isn't a snapshot, either.
    return !fwVersion.match(/-snapshot/);
  };

  const getFirmwareBaseDirectory = () => {
    const settings = new Store();

    if (
      settings.get("firmwareAutoUpdate.mode", "automatic") == "automatic" &&
      shouldPresentDownloadedSnapshot()
    ) {
      try {
        fs.accessSync(path.join(firmwarePath, "build-info.yml"));
        return firmwarePath;
      } catch (_) {
        // Ignore, we'll use the default static return value
      }
    }
    if (isDevelopment) {
      return path.join("/static");
    } else {
      return path.join("../../../../static");
    }
  };

  ipcMain.on("firmware.get-changelog", (event) => {
    const baseDir = getFirmwareBaseDirectory();
    const changelog = fs.readFileSync(
      path.join(baseDir, "firmware-changelog.md")
    );

    event.returnValue = new TextDecoder().decode(changelog);
  });

  ipcMain.on("firmware.get-version", (event) => {
    const baseDir = getFirmwareBaseDirectory();
    const data = fs.readFileSync(path.join(baseDir, "build-info.yml"));
    const buildInfo = yaml.load(data);

    event.returnValue = buildInfo.version.match(/[^+]*/)[0];
  });

  ipcMain.on("firmware.get-base-directory", (event) => {
    event.returnValue = getFirmwareBaseDirectory();
  });
};
