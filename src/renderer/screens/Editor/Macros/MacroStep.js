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

import KeymapDB from "@api/focus/keymap/db";
import { Step } from "@api/focus/macros";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import { DraggableItemTypes } from "@renderer/components/Constants";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";

const db = new KeymapDB();

const MacroStep = (props) => {
  const { step, index, selected, id, moveStep } = props;
  const { t } = useTranslation();

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: DraggableItemTypes.MACRO_STEP,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveStep(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: DraggableItemTypes.MACRO_STEP,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onDelete = () => {
    props.onDelete(index);
  };

  const onClick = () => {
    props.onClick(index);
  };

  const formatStep = (step) => {
    if (step.type == Step.INTERVAL || step.type == Step.WAIT)
      return t("editor.macros.steps.time_ms", { value: step.value });
    if ([Step.KEYDOWN, Step.KEYUP, Step.TAP].includes(step.type)) {
      const format = db.format(step.value, "full", false);
      return (format.hint ? format.hint + " " : "") + format.main;
    }
    if (
      [Step.EXPLICIT_REPORT, Step.IMPLICIT_REPORT, Step.SEND_REPORT].includes(
        step.type
      )
    ) {
      return t("editor.macros.steps." + step.type);
    }
    return t("editor.macros.steps.unknown");
  };

  const formatLabel = (step) => {
    if (
      [Step.EXPLICIT_REPORT, Step.IMPLICIT_REPORT, Step.SEND_REPORT].includes(
        step.type
      )
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
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Chip
      onClick={onClick}
      dataHandlerId={handlerId}
      id={props.id}
      ref={ref}
      onDelete={onDelete}
      color={color}
      label={createLabel(step)}
      deleteIcon={<DeleteIcon />}
      sx={{
        m: 1,
        py: 2.5,
        px: 0.5,
        opacity: opacity,
        cursor: isDragging ? "move" : "pointer",

        transform: "translate(0, 0)",
      }}
    />
  );
};

export default MacroStep;
