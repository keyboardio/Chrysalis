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

import https from "https";
import { version } from "../../../package.json";

let __latestVersion;

const getLatestProductionRelease = async () => {
  const options = {
    method: "GET",
    host: "api.github.com",
    path: "/repos/keyboardio/Chrysalis/releases/latest",
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": `Chrysalis/${version}`
    }
  };

  const extensions = {
    linux: "AppImage",
    darwin: "dmg",
    win32: "exe"
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
            data = JSON.parse(data);
            const release = data.name.split(" ")[1];
            const tag_name = data.tag_name;
            resolve({
              version: release,
              url: `https://github.com/keyboardio/Chrysalis/releases/download/${tag_name}/Chrysalis-${release}.${extension}`
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

const getLatestDevelopmentBuild = async () => {
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
    win32: "exe"
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
            const tag_name = data.tag_name;
            const release = tag_name.match("v(.*-snapshot)")[1];
            resolve({
              version: release,
              url: `https://github.com/keyboardio/Chrysalis/releases/download/${tag_name}/Chrysalis-${release}.${extension}`
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
    if (version.indexOf("-snapshot") > 0) {
      __latestVersion = await getLatestDevelopmentBuild();
    } else {
      __latestVersion = await getLatestProductionRelease();
    }
  } catch (_) {
    return null;
  }

  return __latestVersion;
};

export { getLatestVersion as default };
