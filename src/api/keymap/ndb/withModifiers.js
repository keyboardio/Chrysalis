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

/*
single:
- ctrl: 256
- alt: 512
- altgr: 1024
- shift: 2048
- gui: 4096

double:
- ctrl+alt: 768
- ctrl+altgr: 1280
- ctrl+shift: 2304
- ctrl+gui: 4352
- alt+altgr: 1536
- alt+shift: 2560
- alt+gui: 4608
- altgr+shift: 3072
- altgr+gui: 5120

triple:
- ctrl+alt+altgr: 1792
- ctrl+alt+shift (meh): 2816
- ctrl+alt+gui: 4864
- ctrl+altgr+shift: 3328
- ctrl+altgr+gui: 5376
- ctrl+shift+gui: 6400
- alt+altgr+shift: 3584
- alt+altgr+gui: 5632
- alt+shift+gui: 6656
- altgr+shift+gui: 7168

quad:
- ctrl+alt+shift+altgr (meh+altgr): 3840
- ctrl+alt+altgr+gui: 5888
- alt+altgr+shift+gui: 7680

all:
- hyper+altgr: 7936
 */

const withModifiers = keys => {
  let newKeys = [];

  const mods = [
    {
      categories: ["ctrl"],
      offset: 256,
      label: key => {
        return "C+" + key.label.base;
      }
    },
    {
      categories: ["shift"],
      offset: 2048,
      label: key => {
        return key.label.shifted || "S+" + key.label.base;
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

export default withModifiers;
