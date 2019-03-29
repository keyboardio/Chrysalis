// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
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

import React, { useState } from "react";
const { clipboard } = require("electron");
const fs = require("fs");

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { withSnackbar } from "notistack";

import i18n from "../../../i18n";
import LoadDefaultKeymap from "./LoadDefaultKeymap";

export const ImportExportDialog = withSnackbar(props => {
  const [dataState, setData] = useState();

  const data =
    dataState != undefined
      ? dataState
      : JSON.stringify(
          {
            keymap: props.keymap,
            colormap: props.colormap,
            palette: props.palette
          },
          null,
          2
        );

  function onConfirm() {
    try {
      props.onConfirm(JSON.parse(data));
      setData(undefined);
    } catch (e) {
      props.enqueueSnackbar(e.toString(), { variant: "error" });
    }
  }

  function onCancel() {
    setData(undefined);
    props.onCancel();
  }

  function copyToClipboard(data) {
    clipboard.writeText(data);
    props.enqueueSnackbar(i18n.editor.copySuccess, {
      variant: "success",
      autoHideDuration: 2000
    });
  }

  function pasteFromClipboard() {
    setData(clipboard.readText());
    props.enqueueSnackbar(i18n.editor.pasteSuccess, {
      variant: "success",
      autoHideDuration: 2000
    });
  }

  function loadDefault(path) {
    fs.readFile(path, "utf-8", (err, layoutData) => {
      if (err) {
        props.enqueueSnackbar(i18n.editor.pasteSuccess, {
          variant: "error",
          autoHideDuration: 2000
        });
      }
      setData(layoutData);
    });
  }

  return (
    <Dialog
      disableBackdropClick
      open={props.open}
      onClose={onCancel}
      fullScreen
    >
      <DialogTitle>{i18n.editor.importExport}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {i18n.editor.importExportDescription}
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <LoadDefaultKeymap loadDefault={loadDefault} />
          <div>
            <Button color="primary" onClick={() => copyToClipboard(data)}>
              {i18n.editor.copyToClipboard}
            </Button>
            <Button color="primary" onClick={pasteFromClipboard}>
              {i18n.editor.pasteFromClipboard}
            </Button>
          </div>
        </div>
        <TextField
          disabled={props.isReadOnly}
          multiline
          fullWidth
          value={data}
          onChange={event => {
            setData(event.target.value);
          }}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={onConfirm}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
});
