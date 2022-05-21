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

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { green } from "@mui/material/colors";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import { PageTitle } from "@renderer/components/PageTitle";

const focus = new Focus();
const db = new KeymapDB();

const MacroStepAdd = (props) => {
  return (
    <Avatar
      component="a"
      sx={{
        bgcolor: green[500],
        width: 32,
        height: 32,
        m: 0.5,
      }}
    >
      <AddIcon />
    </Avatar>
  );
};

const MacroStep = (props) => {
  const { step, index, onDelete } = props;

  const onStepDelete = () => {
    onDelete(index);
  };

  const formatLabel = (step) => {
    if (step.type == "INTERVAL" || step.type == "WAIT")
      return step.value.toString() + "ms";
    if (step.type == "TAP" || step.type == "KEYUP" || step.type == "KEYDOWN")
      return db.format(step.value).main;
    if (step.type == "TAPSEQUENCE") {
      const seq = step.value.map((k) => db.format(k).main);
      return seq.join(", ");
    }
    return "<unknown>";
  };

  const createLabel = (step) => {
    const descs = {
      INTERVAL: "Delay between steps:",
      TAP: "Tap:",
      TAPSEQUENCE: "Tap:",
      WAIT: "Wait:",
      KEYUP: "Release key:",
      KEYDOWN: "Hold key:",
    };

    return (
      <React.Fragment>
        <strong>{descs[step.type]}</strong> {formatLabel(step)}
      </React.Fragment>
    );
  };

  return (
    <Chip onDelete={onStepDelete} label={createLabel(step)} sx={{ m: 0.5 }} />
  );
};

const MacroEditor = (props) => {
  const { macroId, onClose } = props;
  const [macro, setMacro] = useState(null);

  const getMacro = async (id) => {
    const macros = await focus.command("macros");
    setMacro(macros.macros[id]);
  };

  const onDelete = (index) => {
    const m = macro.map((v) => Object.assign({}, v));
    m.splice(index, 1);
    setMacro(m);
  };

  useEffect(() => {
    if (macro == null) getMacro(macroId);
  }, []);

  if (macroId == null) return null;
  if (macro == null) return null;

  const steps = macro.map((step, index) => {
    const key = "macro-step-" + index.toString();
    return (
      <MacroStep key={key} step={step} index={index} onDelete={onDelete} />
    );
  });

  return (
    <Box
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
          maxWidth: "75%",
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
          title={`Macro #${macroId}`}
        />
        <CardContent>
          <Stack direction="row" flexWrap="wrap">
            {steps}
            <MacroStepAdd />
          </Stack>
        </CardContent>
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="primary">Apply</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default MacroEditor;
