// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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

import http from "http";
import https from "https";
import { version } from "../../../package.json";

let __latestVersion;

const getLatestVersionFromS3 = async () => {
  const extensions = {
    linux: "AppImage",
    darwin: "dmg",
    windows: "exe"
  };
  const options = {
    method: "HEAD",
    host: "kaleidoscope-builds.s3.amazonaws.com",
    port: "80",
    path: "/Chrysalis/latest/Chrysalis." + extensions[process.platform]
  };

  return new Promise(resolve => {
    try {
      const req = http.request(options, result => {
        try {
          const uri = decodeURIComponent(
            result.headers["x-amz-website-redirect-location"]
          ).split("/");
          let version = uri[uri.length - 1].split("-")[1];
          version = null;
          version = version.substring(
            0,
            version.length - extensions[process.platform].length - 1
          );
          resolve({
            version: version,
            url: result.headers["x-amz-website-redirect-location"]
          });
        } catch (_) {
          resolve(null);
        }
      });
      req.on("error", () => {
        resolve(null);
      });
      req.end();
    } catch (_) {
      resolve(null);
    }
  });
};

const getLatestVersionFromGitHub = async () => {
  const options = {
    method: "GET",
    host: "api.github.com",
    path: "/repos/keyboardio/Chrysalis/releases",
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": `Chrysalis/${version}`
    }
  };
  const extensions = {
    linux: "AppImage",
    darwin: "dmg",
    windows: "exe"
  };
  const extension = extensions[process.platform];

  return new Promise(resolve => {
    let data = "";
    try {
      const req = https.request(options, response => {
        response.on("data", chunk => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            data = JSON.parse(data)[0];
            const release = data.name.split(" ")[1];
            resolve({
              version: release,
              url: `https://github.com/keyboardio/Chrysalis/releases/download/chrysalis-${release}/Chrysalis-${release}.${extension}`
            });
          } catch (_) {
            resolve(null);
          }
        });
      });
      req.on("error", () => {
        resolve(null);
      });
      req.end();
    } catch (_) {
      resolve(null);
    }
  });
};

const getLatestVersion = async () => {
  if (__latestVersion) return __latestVersion;

  try {
    if (version.indexOf("+") > 0) {
      __latestVersion = await getLatestVersionFromS3();
    } else {
      __latestVersion = await getLatestVersionFromGitHub();
    }
  } catch (_) {
    return null;
  }

  return __latestVersion;
};

export { getLatestVersion as default };
