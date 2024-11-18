const fs = require("fs");
const path = require("path");

const generateI18nIndex = () => {
  const i18nDir = path.join(__dirname, "../../src/renderer/i18n");
  const files = fs.readdirSync(i18nDir).filter(file => 
    file.endsWith('.json') && fs.statSync(path.join(i18nDir, file)).size > 0
  );

  // Generate language maps index
  const langMapsContent = `// This file is auto-generated. Do not edit manually.
export const languageMaps = {
  ${files.map(file => {
    const langCode = path.basename(file, '.json');
    // Convert to lowercase and replace hyphens with underscores for CLDR compatibility
    const cldrLangCode = langCode.toLowerCase().replace('-', '_');
    return `"${langCode}": require("./cldr_languages/${cldrLangCode}.json")`;
  }).join(',\n  ')}
};
`;

  // Ensure the directory exists
  const langMapsDir = path.join(__dirname, "../../src/api/focus/keymap");
  if (!fs.existsSync(langMapsDir)){
    fs.mkdirSync(langMapsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(langMapsDir, "language_maps.js"),
    langMapsContent
  );

  // Generate i18n index
  const imports = files.map(file => {
    const langCode = path.basename(file, '.json');
    return `import ${langCode.replace('-', '_')} from "@renderer/i18n/${langCode}";`;
  }).join('\n');

  const resources = files.map(file => {
    const langCode = path.basename(file, '.json');
    return `  "${langCode}": {
    messages: ${langCode.replace('-', '_')},
  },`;
  }).join('\n');

  const i18nContent = `// This file is auto-generated. Do not edit manually.
${imports}
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
${resources}
};

i18n
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: true,
    },
    resources: resources,
    lng: "en",
    keySeparator: ".",
    ns: ["messages"],
    returnEmptyString: true,
    defaultNS: "messages",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

i18n.refreshHardware = (device) => {
  Object.keys(i18n.options.resources).forEach((code) => {
    const key = "devices." + device?.info.vendor + "." + device?.info.product + ".updateInstructions";
    const instructions = {
      updateInstructions: i18n.exists(key) ? i18n.t(key) : undefined,
    };
    i18n.addResource(code, "messages", "hardware", instructions);
  });
};

export default i18n;
`;

  fs.writeFileSync(
    path.join(__dirname, "../../src/renderer/i18n.js"),
    i18nContent
  );
};

exports.generateI18nIndex = generateI18nIndex; 