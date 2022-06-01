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

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";

const KeyboardLayerPreferences = (props) => {
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;
  const { registerModifications } = props;

  const [keymap, setKeymap] = useState({
    custom: [],
    default: [],
    onlyCustom: false,
  });
  const [defaultLayer, setDefaultLayer] = useState(126);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setKeymap(await activeDevice.focus.command("keymap"));

      let layer = await activeDevice.focus.command("settings.defaultLayer");
      layer = layer ? parseInt(layer) : 126;
      setDefaultLayer(layer <= 126 ? layer : layer);
      setLoaded(true);
    };

    const context_bar_channel = new BroadcastChannel("context_bar");
    context_bar_channel.onmessage = async (event) => {
      if (event.data === "changes-discarded") {
        await initialize();
      }
    };

    initialize();

    return () => {
      context_bar_channel.close();
    };
  }, [activeDevice]);

  const selectDefaultLayer = async (event) => {
    const layer = event.target.value;
    await setDefaultLayer(layer);
    await registerModifications("settings.defaultLayer", layer);
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
      {loaded ? (
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography variant="body1">
              {t("preferences.keyboard.defaultLayer.label")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("preferences.keyboard.defaultLayer.help")}
            </Typography>
          </Box>
          <span style={{ flexGrow: 1 }} />
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
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={320} height={79} />
      )}
    </PreferenceSection>
  );
};

export { KeyboardLayerPreferences as default };
