/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

const modMap = {
  ctrl: 1 << 8,
  alt: 1 << 9,
  altgr: 1 << 10,
  shift: 1 << 11,
  gui: 1 << 1
};

const addModifier = (keyCode, mod) => {
  return keyCode + modMap[mod];
};

const removeModifier = (keyCode, mod) => {
  return keyCode - modMap[mod];
};

const withModifiers = keys => {
  let newKeys = [];

  const mods = [
    {
      categories: ["ctrl"],
      offset: modMap.ctrl,
      label: key => {
        return "C+" + key.label.base;
      }
    },
    {
      categories: ["shift"],
      offset: modMap.shift,
      label: key => {
        return key.label.shifted || "S+" + key.label.base;
      }
    },
    {
      categories: ["alt"],
      offset: modMap.alt,
      label: key => {
        return "A+" + key.label.base;
      }
    },
    {
      categories: ["altgr"],
      offset: modMap.altgr,
      label: key => {
        return key.label.altgr || "AGr+" + key.label.base;
      }
    }
  ];

  for (const key of keys) {
    newKeys.push(key);

    for (const mod of mods) {
      const newKey = Object.assign({}, key, {
        categories: ["with-modifiers"].concat(mod.categories),
        code: key.code + mod.offset,
        baseCode: key.code,
        label: {
          base: mod.label(key)
        }
      });
      newKeys.push(newKey);
    }
  }

  return newKeys;
};

export { addModifier, removeModifier, withModifiers };
