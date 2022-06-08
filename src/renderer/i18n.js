// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import i18n from "i18next";
import LanguageDetector from "i18next-electron-language-detector";
import { initReactI18next } from "react-i18next";
import English from "./i18n/en";
import Hungarian from "./i18n/hu";
import Dutch from "./i18n/nl";

const resources = {
  en: {
    messages: English,
  },
  hu: {
    messages: Hungarian,
  },
  nl: {
    messages: Dutch,
  },
};

i18n // eslint-disable-line import/no-named-as-default-member
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    react: {
      wait: true,
    },
    resources: resources,
    lng: "en",
    keySeparator: ".",
    ns: ["messages"],
    defaultNS: "messages",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

i18n.refreshHardware = (device) => {
  Object.keys(i18n.options.resources).forEach((code) => {
    const key =
      "devices." +
      device?.info.vendor +
      "." +
      device?.info.product +
      ".updateInstructions";
    const instructions = {
      updateInstructions: i18n.exists(key) ? i18n.t(key) : undefined, // eslint-disable-line import/no-named-as-default-member
    };
    i18n.addResource(code, "messages", "hardware", instructions);
  });
};

export default i18n;
