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

import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";

import { KeymapDB } from "@api/keymap";

const db = new KeymapDB();

const MacroStep = (props) => {
  const { step, index, selected } = props;

  const onDelete = () => {
    props.onDelete(index);
  };

  const onClick = () => {
    props.onClick(index);
  };

  const formatLabel = (step) => {
    if (step.type == "INTERVAL" || step.type == "WAIT")
      return step.value.toString() + "ms";
    if (step.type == "KEYUP" || step.type == "KEYDOWN")
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

  const color = selected ? "primary" : "default";

  return (
    <Chip
      onClick={onClick}
      onDelete={onDelete}
      color={color}
      label={createLabel(step)}
      deleteIcon={<DeleteIcon />}
      sx={{ m: 0.5 }}
    />
  );
};

export default MacroStep;
