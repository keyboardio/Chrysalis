// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import { logger } from "@api/log";
import { getFilesystemPathForStaticAsset } from "@renderer/config";
import { spawn } from "child_process";
import path from "path";
import sudo from "sudo-prompt";
import tmp from "tmp";

const installUdevRules = async (devicePath) => {
  const rules = getFilesystemPathForStaticAsset(
    path.join("udev", "60-kaleidoscope.rules")
  );
  const tmpRules = tmp.fileSync();

  logger().debug("copying udev rules to temporary place", {
    source: rules,
    destination: tmpRules.name,
  });
  await spawn("cp", [rules, tmpRules.name]);

  const cmd =
    "(mv /etc/udev/rules.d/60-kaleidoscope.rules " +
    "/etc/udev/rules.d/60-kaleidoscope.rules.orig || true) && " +
    "install -d -o root -g root /etc/udev/rules.d && " +
    "install -o root -g root " +
    tmpRules.name +
    " /etc/udev/rules.d/60-kaleidoscope.rules && " +
    "rm " +
    tmpRules.name +
    " && " +
    "udevadm control --reload-rules && " +
    "udevadm trigger " +
    devicePath;
  return new Promise(async (resolve, reject) => {
    logger().debug("installing udev rules with sudo", { command: cmd });
    sudo.exec(cmd, { name: "Chrysalis" }, (error) => {
      if (error) {
        logger().error("error installing udev rules", { error: error });
        reject(error);
      } else {
        logger().debug("udev rules installed");
        resolve(true);
      }
    });
  });
};

export { installUdevRules };
