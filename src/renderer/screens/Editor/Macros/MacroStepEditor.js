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
import Box from "@mui/material/Box";

import EditInterval from "./StepEditor/EditInterval";
import EditWait from "./StepEditor/EditWait";

const MacroStepEditor = (props) => {
  const { stepIndex, step, open } = props;

  const onValueChange = (event) => {
    const newStep = Object.assign({}, step);
    newStep.value = event.target.value;
    props.onChange(stepIndex, newStep);
  };

  if (!open) return null;
  if (stepIndex == null) return null;
  if (step == null) return null;
  if (["KEYUP", "KEYDOWN", "TAP"].includes(step.type)) return null;

  let mainWidget;
  if (step.type == "INTERVAL") {
    mainWidget = <EditInterval value={step.value} onChange={onValueChange} />;
  } else if (step.type == "WAIT") {
    mainWidget = <EditWait value={step.value} onChange={onValueChange} />;
  }

  return <Box sx={{ my: 2 }}>{mainWidget}</Box>;
};

export default MacroStepEditor;
