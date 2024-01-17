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

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";

const FirmwareChangesDialog = (props) => {
  const { classes } = props;
  const { t } = useTranslation();

  return (
    <Dialog open={props.open} fullWidth maxWidth="md" onClose={props.onClose}>
      <DialogTitle sx={{ display: "flex" }}>
        {t("firmwareUpdate.firmwareChangelog.title")}
        <Box sx={{ flexGrow: 1 }} />
        <Button startIcon={<OpenInNewIcon />} href="https://github.com/keyboardio/Chrysalis-Firmware-Bundle">
          {t("firmwareUpdate.firmwareSources")}
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkEmoji]}>{props.changelog}</ReactMarkdown>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>{t("dialog.close")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirmwareChangesDialog;
