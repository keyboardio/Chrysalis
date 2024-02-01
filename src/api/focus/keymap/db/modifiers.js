import { GuiLabel, GuiShortLabel } from "./gui";

const modifiers = {
  ctrl: { flag: 256, label: { full: "Ctrl+", "1u": "C+" } },
  alt: { flag: 512, label: { full: "Alt+", "1u": "A+" } },
  altgr: { flag: 1024, label: { full: "AltGr+", "1u": "AGr+" } },
  shift: { flag: 2048, label: { full: "Shift+", "1u": "S+" } },
  gui: { flag: 4096, label: { full: GuiLabel.full + "+", "1u": GuiShortLabel + "+" } },
  topsyturvy: { flag: 53293, label: { full: "TopsyTurvy+", "1u": "Ƨ+" } },
  meh: { flag: 2816, label: { full: "Meh+", "1u": "M+" } },
  hyper: { flag: 6912, label: { full: "Hyper+", "1u": "H+" } },
};

const addModifier = (keyCode, mod) => keyCode + modifiers[mod].flag;
const removeModifier = (keyCode, mod) => keyCode - modifiers[mod].flag;

const combineLabels = (mods) =>
  mods.reduce(
    (acc, mod) => ({
      full: acc.full + modifiers[mod].label.full,
      "1u": acc["1u"] + modifiers[mod].label["1u"],
    }),
    { full: "", "1u": "" }
  );

const createModCombination = (categories, labelFunc = (key) => modLabelFunc(key, categories)) => ({
  categories,
  offset: categories.reduce((acc, mod) => acc + modifiers[mod].flag, 0),
  label: labelFunc,
});

const modLabelFunc = (key, mods) => {
  const isHyper = mods.includes("ctrl") && mods.includes("shift") && mods.includes("alt") && mods.includes("gui");
  const isMeh = mods.includes("ctrl") && mods.includes("shift") && mods.includes("alt");
  const isTopsy = mods.includes("topsyturvy");

  let label = { full: "", "1u": "" };
  if (isMeh || isHyper) {
    const restatedMods = mods.filter((mod) => !["ctrl", "shift", "alt", "gui"].includes(mod));
    restatedMods.push(isHyper ? "hyper" : "meh");
    label = combineLabels(restatedMods);
  } else {
    label = combineLabels(mods);
  }

  const baseLabel = isTopsy ? key.label.shifted || key.label.base : key.label.base;
  return { hint: label, base: baseLabel };
};

const generateCombinations = () => {
  const modKeys = ["ctrl", "alt", "altgr", "shift", "gui", "topsyturvy"];
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

            for (let n = m + 1; n < modKeys.length; n++) {
              combinations.push(
                createModCombination([modKeys[i], modKeys[j], modKeys[k], modKeys[l], modKeys[m], modKeys[n]])
              );
            }
          }
        }
      }
    }
  }

  return combinations;
};

const modifierCombinations = generateCombinations();

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
