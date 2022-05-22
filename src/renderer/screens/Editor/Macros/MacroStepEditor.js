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

import React, { useEffect, useState } from "react";

import Focus from "@api/focus";
import { KeymapDB } from "@api/keymap";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const focus = new Focus();
const db = new KeymapDB();

const EditInterval = (props) => {
  return (
    <TextField
      label="Delay between steps"
      type="number"
      value={props.value}
      onChange={props.onChange}
      InputLabelProps={{
        shrink: true,
      }}
      helperText="In milliseconds"
    />
  );
};

const EditWait = (props) => {
  return (
    <TextField
      label="Wait"
      type="number"
      value={props.value}
      onChange={props.onChange}
      InputLabelProps={{
        shrink: true,
      }}
      helperText="In milliseconds"
    />
  );
};

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

  let mainWidget;
  if (step.type == "INTERVAL") {
    mainWidget = <EditInterval value={step.value} onChange={onValueChange} />;
  }
  if (step.type == "WAIT") {
    mainWidget = <EditWait value={step.value} onChange={onValueChange} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          my: 4,
          mx: "auto",
          width: "75%",
        }}
      >
        <CardHeader title={`Step #${stepIndex}`} />
        <Divider />
        <CardContent>{mainWidget}</CardContent>
      </Card>
    </Box>
  );
};

export default MacroStepEditor;
