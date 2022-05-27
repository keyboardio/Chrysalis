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
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import CloseIcon from "@mui/icons-material/Close";

import MacroStep from "./MacroStep";
import MacroStepAdd from "./MacroStepAdd";
import MacroStepEditor from "./MacroStepEditor";

const MacroEditor = (props) => {
  const { macroId, macro, onMacroChange, macroStep, setMacroStep } = props;
  const [stepEditorOpen, setStepEditorOpen] = useState(false);
  const { t } = useTranslation();

  const onStepDelete = (index) => {
    const newMacro = macro.map((v) => Object.assign({}, v));
    newMacro.splice(index, 1);
    onMacroChange(macroId, newMacro);
  };

  const addStep = (step) => {
    const newMacro = macro.map((v) => Object.assign({}, v));
    newMacro.push(step);
    onMacroChange(macroId, newMacro);
    setMacroStep(newMacro.length - 1);
  };

  const onStepSelect = (index) => {
    if (index == macroStep) {
      setMacroStep(null);
      setStepEditorOpen(false);
    } else {
      setMacroStep(index);
      setStepEditorOpen(true);

      if (["KEYUP", "KEYDOWN", "TAP"].includes(macro[index].type)) {
        props.setSelectorKey(macro[index].value);
      }
    }
  };

  const onClose = async () => {
    const fkp_channel = new BroadcastChannel("floating-key-picker");
    await fkp_channel.postMessage("show");
    await fkp_channel.close();

    props.onClose();
  };

  const onMacroStepChange = async (stepIndex, step) => {
    const newMacro = macro.map((s, index) => {
      if (index == stepIndex) return step;
      return s;
    });
    onMacroChange(macroId, newMacro);
  };

  useEffect(() => {
    const fkp_channel = new BroadcastChannel("floating-key-picker");

    const step = macro && macro[macroStep];
    if (["KEYDOWN", "KEYUP", "TAP"].includes(step?.type)) {
      fkp_channel.postMessage("show");
    } else {
      fkp_channel.postMessage("hide");
    }

    return function cleanup() {
      fkp_channel.close();
    };
  });

  if (macroId == null) return null;

  const steps = macro.map((step, index) => {
    const key = "macro-step-" + index.toString();
    return (
      <MacroStep
        key={key}
        step={step}
        index={index}
        onDelete={onStepDelete}
        onClick={onStepSelect}
        currentKey={props.currentKey}
        setSelectorKey={props.setSelectorKey}
        selected={index == macroStep}
      />
    );
  });

  return (
    <React.Fragment>
      <Card
        sx={{
          my: 4,
          mx: "auto",
          width: "75%",
        }}
      >
        <CardHeader
          title={t("editor.macros.title", { index: macroId })}
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Stack direction="row" flexWrap="wrap">
            {steps}
            <MacroStepAdd addStep={addStep} />
          </Stack>
          <MacroStepEditor
            setSelectorKey={props.setSelectorKey}
            onChange={onMacroStepChange}
            stepIndex={macroStep}
            step={macro[macroStep]}
            open={stepEditorOpen}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default MacroEditor;
