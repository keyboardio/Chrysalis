/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

import fs from "fs";

import { loadAllKeymaps } from "./precompile/cldr_data.mjs";
import { extractLanguageNames } from "./precompile/cldr_languages.mjs";

const generateCLDRData = async () => {
  console.log("* Generating CLDR data...");

  const db = await loadAllKeymaps();
  extractLanguageNames();

  fs.writeFileSync(
    "./src/api/focus/keymap/cldr_data.json",
    JSON.stringify(db, null, 2)
  );
  fs.writeFileSync(
    "./src/api/focus/keymap/.cldr_data_generated",
    ""
  );

};

if (fs.existsSync("./src/api/focus/keymap/.cldr_data_generated")) {
    console.log("* ./src/api/focus/keymap/.cldr_data_generated exists. Skipping regeneration.");
} else {
    generateCLDRData();
}
