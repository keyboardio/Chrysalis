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

import KeymapDB from "@api/focus/keymap/db";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const MacroStepAdd = (props) => {
  const { addStep } = props;
  const { t } = useTranslation();

  const db = new KeymapDB();
  const stepTypeDefaults = {
    TAP: db.lookup(),
    KEYDOWN: db.lookup(0),
    KEYUP: db.lookup(0),

    WAIT: 0,
    INTERVAL: 0,
  };
  const stepButton = (stepType) => {
    return (
      <Button
        onClick={() => {
          addStep({ type: stepType, value: stepTypeDefaults[stepType] });
        }}
      >
        {t("editor.macros.steps." + stepType)}
      </Button>
    );
  };
  return (
    <React.Fragment>
      <Typography>{t("editor.macros.steps.add")}</Typography>
      {Object.keys(stepTypeDefaults).map((stepType) => stepButton(stepType))}
    </React.Fragment>
  );
};

export default MacroStepAdd;
