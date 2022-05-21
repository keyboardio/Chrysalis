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
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import AvTimerIcon from "@mui/icons-material/AvTimer";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const focus = new Focus();
const db = new KeymapDB();

const MacroStepAsIconChip = (props) => {
  const { step } = props;

  const onDelete = () => {};

  const formatLabel = (step) => {
    if (step.type == "INTERVAL" || step.type == "WAIT")
      return step.value.toString();
    if (step.type == "TAP" || step.type == "KEYUP" || step.type == "KEYDOWN")
      return db.format(step.value).main;
    if (step.type == "TAPSEQUENCE") {
      const seq = step.value.map((k) => db.format(k).main);
      return seq.join(" ");
    }
    return "<unknown>";
  };
  const icons = {
    WAIT: (
      <Tooltip title="Wait for the given milliseconds" arrow>
        <HourglassEmptyIcon />
      </Tooltip>
    ),
    TAP: (
      <Tooltip title="Tap the given key" arrow>
        <TouchAppIcon />
      </Tooltip>
    ),
    INTERVAL: (
      <Tooltip
        title="Wait for the given milliseconds between each following step"
        arrow
      >
        <AvTimerIcon />
      </Tooltip>
    ),
    TAPSEQUENCE: (
      <Tooltip title="Tap a sequence of keys" arrow>
        <TouchAppIcon />
      </Tooltip>
    ),
    KEYUP: (
      <Tooltip title="Release the given key" arrow>
        <KeyboardArrowUpIcon />
      </Tooltip>
    ),
    KEYDOWN: (
      <Tooltip title="Push the given key down" arrow>
        <KeyboardArrowDownIcon />
      </Tooltip>
    ),
  };

  return (
    <Chip
      onDelete={onDelete}
      icon={icons[step.type]}
      label={formatLabel(step)}
    />
  );
};

const MacroStep = MacroStepAsIconChip;

const MacroEditor = (props) => {
  const { onClose, macroId, open } = props;
  const [macros, setMacros] = useState({ macros: [] });

  const getMacros = async () => {
    setMacros(await focus.command("macros"));
  };

  useEffect(() => {
    getMacros();
  }, []);

  if (macroId == null) return null;
  if (macroId > macros.macros.length) return null;
  const macro = macros.macros[macroId];

  const steps = macro.map((step, index) => {
    const key = "macro-step-" + index.toString();
    return <MacroStep key={key} step={step} />;
  });

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xl" fullWidth>
      <DialogTitle>Macro #{macroId}</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={1}>
          {steps}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MacroEditor;
