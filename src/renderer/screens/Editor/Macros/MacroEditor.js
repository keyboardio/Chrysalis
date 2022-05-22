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
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";

import { PageTitle } from "@renderer/components/PageTitle";

import MacroStep from "./MacroStep";
import MacroStepAdd from "./MacroStepAdd";
import MacroStepEditor from "./MacroStepEditor";

const focus = new Focus();
const db = new KeymapDB();

const MacroEditor = (props) => {
  const { macroId, macro } = props;
  const [wipMacro, setWipMacro] = useState(null);
  const [stepEditorOpen, setStepEditorOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  const onStepDelete = (index) => {
    const m = wipMacro.map((v) => Object.assign({}, v));
    m.splice(index, 1);
    setWipMacro(m);
  };

  const onStepSelect = (index) => {
    if (index == selectedStep) {
      setSelectedStep(null);
      setStepEditorOpen(false);
    } else {
      setSelectedStep(index);
      setStepEditorOpen(true);
    }
  };

  const onApply = async () => {
    await props.onApply(macroId, wipMacro);
    await props.onClose();
  };

  const onClose = async () => {
    const fkp_channel = new BroadcastChannel("floating-key-picker");
    await fkp_channel.postMessage("show");
    await fkp_channel.close();

    props.onClose();
  };

  const onMacroStepChange = async (stepIndex, step) => {
    const m = wipMacro.map((s, index) => {
      if (index == stepIndex) return step;
      return s;
    });
    setWipMacro(m);
  };

  useEffect(() => {
    if (wipMacro == null) setWipMacro(macro);

    const fkp_channel = new BroadcastChannel("floating-key-picker");
    fkp_channel.postMessage("hide");

    return function cleanup() {
      fkp_channel.close();
    };
  });

  if (macroId == null) return null;
  if (wipMacro == null) return null;

  const steps = wipMacro.map((step, index) => {
    const key = "macro-step-" + index.toString();
    return (
      <MacroStep
        key={key}
        step={step}
        index={index}
        onDelete={onStepDelete}
        onClick={onStepSelect}
        selected={index == selectedStep}
      />
    );
  });

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PageTitle title=": Macro Editor" />
      <Card
        sx={{
          my: 4,
          mx: "auto",
          width: "75%",
        }}
      >
        <CardHeader title={`Macro #${macroId}`} />
        <CardContent>
          <Stack direction="row" flexWrap="wrap">
            {steps}
            <MacroStepAdd />
          </Stack>
        </CardContent>
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onApply}>Apply</Button>
        </CardActions>
      </Card>
      <MacroStepEditor
        onChange={onMacroStepChange}
        stepIndex={selectedStep}
        step={wipMacro[selectedStep]}
        open={stepEditorOpen}
      />
    </Stack>
  );
};

export default MacroEditor;
