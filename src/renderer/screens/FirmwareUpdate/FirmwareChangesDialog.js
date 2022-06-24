// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { getStaticPath } from "@renderer/config";
import path from "path";
import { ipcRenderer } from "electron";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";

const FirmwareChangesDialog = (props) => {
  const { classes } = props;

  const { t } = useTranslation();

  const file = path.join(getStaticPath(), "firmware-changelog.md");
  const [data] = ipcRenderer.sendSync("file.read", file);

  return (
    <Dialog open={props.open} fullWidth maxWidth="md">
      <DialogTitle>{t("firmwareUpdate.firmwareChangelog.title")}</DialogTitle>
      <DialogContent dividers>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkEmoji]}>
          {data}
        </ReactMarkdown>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>{t("dialog.close")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirmwareChangesDialog;
