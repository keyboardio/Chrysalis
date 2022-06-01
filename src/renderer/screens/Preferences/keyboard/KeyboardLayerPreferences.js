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

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";
import PreferenceWithHeading from "../components/PreferenceWithHeading";

const KeyboardLayerPreferences = (props) => {
  const { t } = useTranslation();
  const { onSaveChanges } = props;

  const [keymap, setKeymap] = useState({
    custom: [],
    default: [],
    onlyCustom: false,
  });
  const [defaultLayer, setDefaultLayer] = useState(126);

  const initialize = async (focus) => {
    setKeymap(await focus.command("keymap"));

    let layer = await focus.command("settings.defaultLayer");
    layer = layer ? parseInt(layer) : 126;
    setDefaultLayer(layer <= 126 ? layer : layer);
  };
  const loaded = usePluginEffect(initialize);

  const selectDefaultLayer = async (event) => {
    const layer = event.target.value;
    await setDefaultLayer(layer);
    await onSaveChanges("settings.defaultLayer", layer);
  };

  const layers = keymap.custom.map((_, index) => {
    return (
      <MenuItem value={index} key={index}>
        {t("components.layer", { index: index })}
      </MenuItem>
    );
  });

  return (
    <PreferenceSection name="keyboard.layers">
      <PreferenceWithHeading
        heading={t("preferences.keyboard.defaultLayer.label")}
        subheading={t("preferences.keyboard.defaultLayer.help")}
      >
        {loaded ? (
          <FormControl size="small">
            <Select
              onChange={selectDefaultLayer}
              value={defaultLayer}
              sx={{ minWidth: "10em" }}
            >
              <MenuItem value={126}>
                {t("preferences.keyboard.defaultLayer.noDefault")}
              </MenuItem>
              {layers}
            </Select>
          </FormControl>
        ) : (
          <Skeleton variant="rectangle" width="10em" height={40} />
        )}
      </PreferenceWithHeading>
    </PreferenceSection>
  );
};

export { KeyboardLayerPreferences as default };
