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

const cldrDir = "static/cldr";

import fs from "fs";
import path from "path";
import { unraw } from "unraw";
import xml2js from "xml2js";

const modMap = {
  ctrl: 1 << 8,
  alt: 1 << 9,
  altgr: 1 << 10,
  shift: 1 << 11,
  gui: 1 << 12,
};

const addModifier = (keyCode, mod) => {
  return keyCode + modMap[mod];
};

const cldr2keycode = {
  E00: 53,
  E01: 30,
  E02: 31,
  E03: 32,
  E04: 33,
  E05: 34,
  E06: 35,
  E07: 36,
  E08: 37,
  E09: 38,
  E10: 39,
  E11: 45,
  E12: 46,
  E13: 49,

  D01: 20,
  D02: 26,
  D03: 8,
  D04: 21,
  D05: 23,
  D06: 28,
  D07: 24,
  D08: 12,
  D09: 18,
  D10: 19,
  D11: 47,
  D12: 48,
  D13: 49,

  C01: 4,
  C02: 22,
  C03: 7,
  C04: 9,
  C05: 10,
  C06: 11,
  C07: 13,
  C08: 14,
  C09: 15,
  C10: 51,
  C11: 52,
  C12: 49,

  B00: 100,
  B01: 29,
  B02: 27,
  B03: 6,
  B04: 25,
  B05: 5,
  B06: 17,
  B07: 16,
  B08: 54,
  B09: 55,
  B10: 56,

  A03: 44,
};

const decode = (code) => {
  if (code.match(/^\\u/)) {
    return unraw(code);
  }
  if (code == " ") return "Space";
  return code;
};

const loadKeyboard = async (group, isDefault, file) => {
  const data = fs.readFileSync(file);
  const cldrKeyboard = (await xml2js.parseStringPromise(data)).keyboard;
  const cldrKeymap = cldrKeyboard.keyMap;

  const hasAltRmods = (mods) =>
    mods.split(/ /).some((v) => v.match(/^altR(\+caps\?)*$/));

  const name = cldrKeyboard.names[0].name[0]["$"].value;

  const keymap = {};
  const db = [];

  for (const map of cldrKeymap) {
    if (!map["$"]) {
      for (const key of map.map) {
        keymap[key["$"].iso] = {
          code: cldr2keycode[key["$"].iso] || 0,
          label: {
            base: decode(key["$"].to),
          },
        };
      }
    } else if (map["$"].modifiers == "shift") {
      for (const key of map.map) {
        keymap[key["$"].iso].label.shifted = decode(key["$"].to);

        // Add the label to the modified keycode too
        const code = cldr2keycode[key["$"].iso] || 0;
        const moddedCode = addModifier(code, "shift");
        keymap[moddedCode] = {
          code: moddedCode,
          baseCode: code,
          label: {
            base: decode(key["$"].to),
          },
        };
      }
    } else if (hasAltRmods(map["$"].modifiers)) {
      for (const key of map.map) {
        if (!keymap[key["$"].iso]) continue;
        keymap[key["$"].iso].label.altgr = decode(key["$"].to);

        // Add the label to the modified keycode too.
        const code = cldr2keycode[key["$"].iso] || 0;
        const moddedCode = addModifier(code, "altgr");
        keymap[moddedCode] = {
          code: moddedCode,
          baseCode: code,
          label: {
            base: decode(key["$"].to),
          },
        };
      }
    }
  }

  for (const idx of Object.keys(keymap)) {
    db.push(keymap[idx]);
  }

  return {
    name: name,
    group: group,
    default: isDefault,
    codetable: db,
  };
};

export const loadAllKeymaps = async () => {
  const windowsFiles = fs.readdirSync(path.join(cldrDir, "keyboards/windows/"));
  // There are some layouts that aren't available in CLDR's windows layouts, but
  // are on others. We slurp those up here in addition. We can't just slurp up
  // all of the chromeos layouts and filter out the duplicates, because naming
  // is inconsistent, so we go on a case-by-case basis for now.
  const chromeosFiles = fs
    .readdirSync(path.join(cldrDir, "keyboards/chromeos"))
    .filter((fn) => fn.match("^hr-t-k0"));
  const files = windowsFiles.concat(chromeosFiles);

  // Load the default layout for each language
  let languages = [];
  for (const f of files) {
    if (f.match("^...?-t-k0-(windows|osx|chromeos)\\.xml") && !f.startsWith("en-")) {
      languages.push(f);
    }
  }

  const db = {};
  for (const l of languages) {
    const os = l.match("-(windows|osx|chromeos)")[1];
    const layout = await loadKeyboard(
      l.match("^(...?)-t-")[1],
      true,
      path.join(cldrDir, "keyboards", os, l)
    );

    db[layout.name] = layout;
  }

  // Load all other layouts
  languages = [];
  for (const f of files) {
    if (
      !f.match("^...?-t-k0-(windows|osx|chromeos)\\.xml") &&
      f.match("-(windows|osx)")
    ) {
      languages.push(f);
    }
  }

  for (const l of languages) {
    const os = l.match("-(windows|osx|chromeos)")[1];
    const layout = await loadKeyboard(
      l.match("^(...?)-")[1],
      false,
      path.join(cldrDir, "keyboards", os, l)
    );

    db[layout.name] = layout;
  }

  return db;
};
