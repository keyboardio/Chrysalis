// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { toast } from "react-toastify";
import React, { useState } from "react";
import i18n from "../../../i18n";
import LoadDefaultKeymap from "./LoadDefaultKeymap";
const { clipboard } = require("electron");
const fs = require("fs");
const jsonStringify = require("json-stringify-pretty-compact");

export const ImportExportDialog = props => {
  const { toCloseImportExportDialog } = props;

  const [dataState, setData] = useState();

  /**
   * This is Hook that lets add React state "isChange" for change tracking in this dialog
   * @param {boolean} [initialState=false] - Sets initial state for "isChange"
   */
  const [isChange, setIsChange] = useState(false);

  const data =
    dataState != undefined
      ? dataState
      : jsonStringify({
          keymap: props.keymap,
          colormap: props.colormap,
          palette: props.palette
        });

  function onConfirm() {
    try {
      isChange
        ? props.onConfirm(JSON.parse(data))
        : toCloseImportExportDialog();
      setData(undefined);
      setIsChange(false);
    } catch (e) {
      toast.error(e.toString());
    }
  }

  function onCancel() {
    setData(undefined);
    setIsChange(false);
    props.onCancel();
  }

  function copyToClipboard(data) {
    clipboard.writeText(data);
    setIsChange(false);
    toast.success(i18n.t("editor.copySuccess"), {
      autoClose: 2000
    });
  }

  function pasteFromClipboard() {
    setData(clipboard.readText());
    setIsChange(true);
    toast.success(i18n.t("editor.pasteSuccess"), {
      autoClose: 2000
    });
  }

  function loadDefault(path) {
    fs.readFile(path, "utf-8", (err, layoutData) => {
      if (err) {
        toast.error(err.toString(), {
          autoClose: 2000
        });
      } else {
        setData(layoutData);
        setIsChange(true);
        toast.success(i18n.t("editor.loadDefaultSuccess"), {
          autoClose: 2000
        });
      }
    });
  }

  return (
    <Dialog
      disableBackdropClick
      open={props.open}
      onClose={onCancel}
      fullScreen
    >
      <DialogTitle>{i18n.t("editor.importExport")}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {i18n.t("editor.importExportDescription")}
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
              {i18n.t("editor.copyToClipboard")}
            </Button>
            <Button color="primary" onClick={pasteFromClipboard}>
              {i18n.t("editor.pasteFromClipboard")}
            </Button>
          </div>
        </div>
        <TextField
          multiline
          fullWidth
          value={data}
          onChange={event => {
            setData(event.target.value);
            setIsChange(true);
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
};
