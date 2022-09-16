// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import useCheckDeviceSupportsPlugins from "@renderer/hooks/useCheckDeviceSupportsPlugins";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";
import EscapeOneShotPreferences from "./plugins/EscapeOneShot";
import SpaceCadetPreferences from "./plugins/SpaceCadet";

const PluginPreferences = (props) => {
  const { t } = useTranslation();
  const { onSaveChanges } = props;

  const [loaded, plugins] = useCheckDeviceSupportsPlugins([
    "EscapeOneShot",
    "spacecadet.mode",
  ]);

  const foundSomePlugins = Object.values(plugins).some((v) => v);
  if (loaded && !foundSomePlugins) return null;

  const sections = [
    {
      name: "oneshot",
      plugin: "EscapeOneShot",
      Component: EscapeOneShotPreferences,
    },
    {
      name: "spacecadet",
      plugin: "spacecadet.mode",
      Component: SpaceCadetPreferences,
    },
  ];
  return sections.map(({ name, plugin, Component }, index) => {
    if (!plugins[plugin]) return null;

    const key = `preferences.plugins.${name}`;

    return (
      <PreferenceSection
        name={`keyboard.plugins.${name}`}
        loaded={loaded}
        key={`${key}/${index}`}
      >
        <Component onSaveChanges={onSaveChanges} />
      </PreferenceSection>
    );
  });
};

export { PluginPreferences as default };
