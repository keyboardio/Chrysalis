// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import React from "react";
import { useTranslation } from "react-i18next";

import { Step } from "@api/focus/macros";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const MacroStepEditor = (props) => {
  const { stepIndex, step, open } = props;
  const { t } = useTranslation();

  if (!open) return null;
  if (stepIndex == null) return null;
  if (step == null) return null;
  if (![Step.INTERVAL, Step.WAIT].includes(step.type)) return null;

  const onValueChange = (event) => {
    let value = event.target.value;
    try {
      value = parseInt(value);
    } catch (e) {
      value = 0;
    }
    if (isNaN(value)) value = 0;
    if (value < 0) {
      value = 255;
    }
    if (value > 255) {
      value = 0;
    }

    const newStep = Object.assign({}, step);
    newStep.value = value;
    props.onChange(stepIndex, newStep);
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        label={t("editor.macros.steps.INTERVAL")}
        type="number"
        min={0}
        max={255}
        value={step.value}
        onChange={onValueChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {t("editor.macros.steps.in_ms")}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default MacroStepEditor;
