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

const  fs = require("fs");

const { loadAllKeymaps} = require("./precompile/cldr_data.js");
const { extractLanguageNames } = require("./precompile/cldr_languages.js");

const generateCLDRData = async () => {
  if (fs.existsSync("./src/api/focus/keymap/.cldr_data_generated")) {
    console.log("* ./src/api/focus/keymap/.cldr_data_generated exists. Skipping regeneration.");
      return;
  }
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
exports.generateCLDRData = generateCLDRData;
