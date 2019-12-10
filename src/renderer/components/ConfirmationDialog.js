// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import i18n from "../i18n";
import { Typography } from "@material-ui/core";

const ConfirmationDialog = props => {
  return (
    <Dialog
      disableBackdropClick
      open={props.open}
      onClose={props.onCancel}
      fullWidth
    >
      <DialogTitle>{props.title}</DialogTitle>
      <Typography style={{ padding: "0 24px 20px" }}>{props.text}</Typography>
      <DialogActions>
        <Button onClick={props.onCancel}>{i18n.dialog.cancel}</Button>
        <Button onClick={props.onConfirm}>{i18n.dialog.ok}</Button>
      </DialogActions>
    </Dialog>
  );
};

export { ConfirmationDialog as default };
