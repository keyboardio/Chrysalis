// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

import fs from "fs";
import path from "path";

import { getStaticPath } from "../config";

const checkExternalFlasher = async device => {
  if (!device.externalFlasher) return false;

  const flasherPath = path.join(
    getStaticPath(),
    device.externalFlasher,
    process.platform
  );

  let available = true;
  try {
    fs.accessSync(flasherPath, fs.constants.R_OK);
  } catch (_) {
    available = false;
  }
  return available;
};

export { checkExternalFlasher as default };
