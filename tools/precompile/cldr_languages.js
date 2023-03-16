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

const cldr = require("cldr");
const fs = require("fs");

const extractLanguageNames = () => {
  const language_names = {};

  fs.mkdir(
    "./src/api/focus/keymap/cldr_languages/",
    { recursive: true },
    (err) => {
      if (err) console.log(err);
    }
  );

  cldr.localeIds.forEach((localeId) => {
    fs.writeFileSync(
      "./src/api/focus/keymap/cldr_languages/" + localeId + ".json",
      JSON.stringify(cldr.extractLanguageDisplayNames(localeId), null, 2)
    );
  });

  return language_names;
};

exports.extractLanguageNames = extractLanguageNames;
