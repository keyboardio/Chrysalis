// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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
import { initReactI18next } from "react-i18next";

import English from "./i18n/en";
import Hungarian from "./i18n/hu";

const resources = {
  en: {
    messages: English
  },
  hu: {
    messages: Hungarian
  }
};

i18n.use(initReactI18next).init({
  react: {
    wait: true
  },
  resources: resources,
  lng: "en",
  keySeparator: ".",
  ns: ["messages"],
  defaultNS: "messages",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

i18n.refreshHardware = ({ device }) => {
  Object.keys(i18n.options.resources).forEach(code => {
    const instructions = device.instructions ? device.instructions[code] : {};
    i18n.addResource(code, "messages", "hardware", instructions);
  });
};

export default i18n;
