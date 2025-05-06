import { GuiLabel, GuiShortLabel } from "./gui";

const CTRL_FLAG = 1 << 8;
const ALT_FLAG = 1 << 9;
const ALTGR_FLAG = 1 << 10;
const SHIFT_FLAG = 1 << 11;
const GUI_FLAG = 1 << 12;
const TOPSYTURVY_FLAG = 53293;

const modifiers = {
  ctrl: { keycode_flags: CTRL_FLAG, label: { full: "Ctrl+", "1u": "C+" } },
  alt: { keycode_flags: ALT_FLAG, label: { full: "Alt+", "1u": "A+" } },
  altgr: { keycode_flags: ALTGR_FLAG, label: { full: "AltGr+", "1u": "AGr+" } },
  shift: { keycode_flags: SHIFT_FLAG, label: { full: "Shift+", "1u": "S+" } },
  gui: { keycode_flags: GUI_FLAG, label: { full: GuiLabel.full + "+", "1u": GuiShortLabel + "+" } },
  topsyturvy: { keycode_flags: TOPSYTURVY_FLAG, label: { full: "TopsyTurvy+", "1u": "Ƨ+" } },
  meh: { keycode_flags: CTRL_FLAG | ALT_FLAG | SHIFT_FLAG, label: { full: "Meh+", "1u": "M+" } },
  hyper: { keycode_flags: CTRL_FLAG | ALT_FLAG | SHIFT_FLAG | GUI_FLAG, label: { full: "Hyper+", "1u": "H+" } },
};

const addModifier = (keyCode, mod) => keyCode + modifiers[mod].keycode_flags;
const removeModifier = (keyCode, mod) => keyCode - modifiers[mod].keycode_flags;

const createModCombination = (categories, labelFunc = (key) => setModifiersLabel(key, categories)) => ({
  categories,
  offset: categories.reduce((acc, mod) => acc | modifiers[mod].keycode_flags, 0),
  label: labelFunc,
});

const setModifiersLabel = (key, mods) => {
  const isHyper = mods.includes("ctrl") && mods.includes("shift") && mods.includes("alt") && mods.includes("gui");
  const isMeh = mods.includes("ctrl") && mods.includes("shift") && mods.includes("alt");
  const isTopsy = mods.includes("topsyturvy");

  let hint = { full: "", "1u": "" };

  if (isMeh || isHyper) {
    const restatedMods = mods.filter((mod) => !["ctrl", "shift", "alt", "gui"].includes(mod));
    restatedMods.push(isHyper ? "hyper" : "meh");
    mods = restatedMods;
  }

  let baseLabel;
  if (mods.includes("shift") && key.label.shifted !== undefined) {
    baseLabel = key.label.shifted;
    // remove the shift modifier from the list of modifiers
    mods = mods.filter((mod) => mod !== "shift");
  } else if (mods.includes("altgr") && key.label.altgr !== undefined) {
    baseLabel = key.label.altgr;
    // remove the altgr modifier from the list of modifiers
    mods = mods.filter((mod) => mod !== "altgr");
  } else if (isTopsy && key.label.shifted !== undefined) {
    baseLabel = key.label.shifted;
  } else {
    baseLabel = key.label.base;
  }

  hint = mods.reduce(
    (acc, mod) => ({
      full: acc.full + modifiers[mod].label.full,
      "1u": acc["1u"] + modifiers[mod].label["1u"],
    }),
    { full: "", "1u": "" }
  );

  return { hint: hint, base: baseLabel };
};

const generateModifierCombinations = () => {
  const modKeys = ["ctrl", "alt", "altgr", "shift", "gui"];
  const combinations = [];

  // Nested loops to generate all combinations
  for (let i = 0; i < modKeys.length; i++) {
    combinations.push(createModCombination([modKeys[i]]));

    for (let j = i + 1; j < modKeys.length; j++) {
      combinations.push(createModCombination([modKeys[i], modKeys[j]]));

      for (let k = j + 1; k < modKeys.length; k++) {
        combinations.push(createModCombination([modKeys[i], modKeys[j], modKeys[k]]));

        for (let l = k + 1; l < modKeys.length; l++) {
          combinations.push(createModCombination([modKeys[i], modKeys[j], modKeys[k], modKeys[l]]));

          for (let m = l + 1; m < modKeys.length; m++) {
            combinations.push(createModCombination([modKeys[i], modKeys[j], modKeys[k], modKeys[l], modKeys[m]]));
          }
        }
      }
    }
  }

  // TT can't be combined with other mods because its
  // keycode range would collide with DynamicMacros or other keys.
  combinations.push(createModCombination(["topsyturvy"]));

  return combinations;
};

const modifierCombinations = generateModifierCombinations();

// add versions of keys in `keys` with all possible modifier combinations to the keymap
const withModifiers = (keys) => {
  const newKeys = [];

  for (const key of keys) {
    if (newKeys[key.code]) continue;
    newKeys[key.code] = { ...key };

    if (key.code > 255) continue;

    for (const mod of modifierCombinations) {
      const newKey = {
        ...key,
        categories: ["with-modifiers", ...mod.categories],
        code: key.code + mod.offset,
        baseCode: key.code,
        label: mod.label(key),
      };
      newKeys[key.code + mod.offset] = newKey;
    }
  }

  return newKeys.filter((x) => x !== null);
};

export { withModifiers, addModifier, removeModifier };
