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

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import React from "react";
import { useTranslation } from "react-i18next";

import PreferenceSwitch from "../../components/PreferenceSwitch";

const DefaultLedMode = (props) => {
  const { t } = useTranslation();

  const { visible, onLedModeChange, ledMode, onAutoSaveChange, autoSave } =
    props;

  if (!visible) return null;

  return (
    <>
      <PreferenceSwitch
        option="keyboard.led.default.autoSave"
        checked={autoSave}
        onChange={onAutoSaveChange}
      />
      <Box sx={{ display: "flex" }}>
        <Box>
          <Typography variant="body1">
            {t("preferences.keyboard.led.default.label")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("preferences.keyboard.led.default.help")}
          </Typography>
        </Box>
        <span style={{ flexGrow: 1 }} />
        <TextField
          sx={{ width: "10em" }}
          size="small"
          disabled={autoSave}
          type="number"
          min={0}
          max={31}
          value={ledMode}
          onChange={onLedModeChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </>
  );
};

export { DefaultLedMode as default };
