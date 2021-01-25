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

import { GuiShortLabel } from "./base/gui";

const modMap = {
  ctrl: 1 << 8,
  alt: 1 << 9,
  altgr: 1 << 10,
  shift: 1 << 11,
  gui: 1 << 12
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
    // Single mods
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
    },
    {
      categories: ["gui"],
      offset: modMap.gui,
      label: key => {
        return GuiShortLabel + "+" + key.label.base;
      }
    },

    // Two mods
    {
      categories: ["ctrl", "shift"],
      offset: modMap.ctrl + modMap.shift,
      label: key => {
        return "C+S+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "alt"],
      offset: modMap.ctrl + modMap.alt,
      label: key => {
        return "C+A+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "altgr"],
      offset: modMap.ctrl + modMap.altgr,
      label: key => {
        return "C+AGr+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "gui"],
      offset: modMap.ctrl + modMap.gui,
      label: key => {
        return "C+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["shift", "alt"],
      offset: modMap.shift + modMap.alt,
      label: key => {
        return "S+A+" + key.label.base;
      }
    },
    {
      categories: ["shift", "altgr"],
      offset: modMap.shift + modMap.altgr,
      label: key => {
        return "S+AGr+" + key.label.base;
      }
    },
    {
      categories: ["shift", "gui"],
      offset: modMap.shift + modMap.gui,
      label: key => {
        return "S+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["alt", "altgr"],
      offset: modMap.alt + modMap.altgr,
      label: key => {
        return "A+AGr+" + key.label.base;
      }
    },
    {
      categories: ["alt", "gui"],
      offset: modMap.alt + modMap.gui,
      label: key => {
        return "A+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["altgr", "gui"],
      offset: modMap.altgr + modMap.gui,
      label: key => {
        return "AGr+" + GuiShortLabel + "+" + key.label.base;
      }
    },

    // Three mods
    {
      categories: ["ctrl", "shift", "alt"],
      offset: modMap.ctrl + modMap.shift + modMap.alt,
      label: key => {
        return "C+S+A+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "shift", "altgr"],
      offset: modMap.ctrl + modMap.shift + modMap.altgr,
      label: key => {
        return "C+S+AGr+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "shift", "gui"],
      offset: modMap.ctrl + modMap.shift + modMap.gui,
      label: key => {
        return "C+S+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "alt", "altgr"],
      offset: modMap.ctrl + modMap.alt + modMap.altgr,
      label: key => {
        return "C+A+AGr+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "alt", "gui"],
      offset: modMap.ctrl + modMap.alt + modMap.gui,
      label: key => {
        return "C+A+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "altgr", "gui"],
      offset: modMap.ctrl + modMap.altgr + modMap.gui,
      label: key => {
        return "C+AGr+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["shift", "alt", "altgr"],
      offset: modMap.shift + modMap.alt + modMap.altgr,
      label: key => {
        return "S+A+AGr+" + key.label.base;
      }
    },
    {
      categories: ["shift", "alt", "gui"],
      offset: modMap.shift + modMap.alt + modMap.gui,
      label: key => {
        return "S+A+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["shift", "altgr", "gui"],
      offset: modMap.shift + modMap.altgr + modMap.gui,
      label: key => {
        return "S+AGr+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["alt", "altgr", "gui"],
      offset: modMap.shift + modMap.altgr + modMap.gui,
      label: key => {
        return "A+AGr+" + GuiShortLabel + "+" + key.label.base;
      }
    },

    // 4 mods
    {
      categories: ["ctrl", "shift", "alt", "altgr"],
      offset: modMap.ctrl + modMap.shift + modMap.alt + modMap.altgr,
      label: key => {
        return "C+S+A+AGr+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "shift", "alt", "gui"],
      offset: modMap.ctrl + modMap.shift + modMap.alt + modMap.gui,
      label: key => {
        return "C+S+A+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "shift", "gui", "altgr"],
      offset: modMap.ctrl + modMap.shift + modMap.gui + modMap.altgr,
      label: key => {
        return "C+S+" + GuiShortLabel + "+AGr+" + key.label.base;
      }
    },
    {
      categories: ["ctrl", "alt", "altgr", "gui"],
      offset: modMap.ctrl + modMap.alt + modMap.altgr + modMap.gui,
      label: key => {
        return "C+A+AGr+" + GuiShortLabel + "+" + key.label.base;
      }
    },
    {
      categories: ["shift", "alt", "altgr", "gui"],
      offset: modMap.shift + modMap.alt + modMap.altgr + modMap.gui,
      label: key => {
        return "S+A+AGr+" + GuiShortLabel + "+" + key.label.base;
      }
    },

    // All mods
    {
      categories: ["ctrl", "shift", "alt", "altgr", "gui"],
      offset:
        modMap.ctrl + modMap.shift + modMap.alt + modMap.altgr + modMap.gui,
      label: key => {
        return "C+S+A+AGr+" + GuiShortLabel + "+" + key.label.base;
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
