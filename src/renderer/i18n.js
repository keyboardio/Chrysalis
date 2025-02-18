// This file is auto-generated. Do not edit manually.
import de from "@renderer/i18n/de";
import en from "@renderer/i18n/en";
import es from "@renderer/i18n/es";
import fr from "@renderer/i18n/fr";
import id from "@renderer/i18n/id";
import nb_NO from "@renderer/i18n/nb-NO";
import nl from "@renderer/i18n/nl";
import pl from "@renderer/i18n/pl";
import ta from "@renderer/i18n/ta";
import zh_Hans from "@renderer/i18n/zh-Hans";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "de": {
    messages: de,
  },
  "en": {
    messages: en,
  },
  "es": {
    messages: es,
  },
  "fr": {
    messages: fr,
  },
  "id": {
    messages: id,
  },
  "nb-NO": {
    messages: nb_NO,
  },
  "nl": {
    messages: nl,
  },
  "pl": {
    messages: pl,
  },
  "ta": {
    messages: ta,
  },
  "zh-Hans": {
    messages: zh_Hans,
  },
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
