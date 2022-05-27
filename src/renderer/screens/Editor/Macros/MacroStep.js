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

import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";

import KeymapDB from "@api/focus/keymap/db";

const db = new KeymapDB();

const MacroStep = (props) => {
  const { step, index, selected } = props;
  const { t } = useTranslation();

  const onDelete = () => {
    props.onDelete(index);
  };

  const onClick = () => {
    props.onClick(index);
  };

  const formatStep = (step) => {
    if (step.type == "INTERVAL" || step.type == "WAIT")
      return t("editor.macros.steps.time_ms", { value: step.value });
    if (["KEYDOWN", "KEYUP", "TAP"].includes(step.type)) {
      const format = db.format(step.value, "full", false);
      return (format.hint ? format.hint + " " : "") + format.main;
    }
    if (
      ["EXPLICIT_REPORT", "IMPLICIT_REPORT", "SEND_REPORT"].includes(step.type)
    ) {
      return t("editor.macros.steps." + step.type);
    }
    return t("editor.macros.steps.unknown");
  };

  const formatLabel = (step) => {
    if (
      ["EXPLICIT_REPORT", "IMPLICIT_REPORT", "SEND_REPORT"].includes(step.type)
    ) {
      return t("editor.macros.steps.unsupported");
    }
    return t("editor.macros.steps." + step.type);
  };

  const createLabel = (step) => {
    const label = formatLabel(step);

    return (
      <React.Fragment>
        <strong>{label}:</strong> {formatStep(step)}
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
