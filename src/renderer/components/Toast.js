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

import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import { useTranslation } from "react-i18next";

import { navigate } from "@renderer/routerHistory";

const toast_channel = new BroadcastChannel("notifications");

export const toast = {
  warning: (message, options) => {
    toast.toast(
      Object.assign({ variant: "warning", message: message }, options)
    );
  },
  info: (message, options) => {
    toast.toast(Object.assign({ variant: "info", message: message }, options));
  },
  error: (message, options) => {
    toast.toast(Object.assign({ variant: "error", message: message }, options));
  },
  success: (message, options) => {
    toast.toast(
      Object.assign({ variant: "success", message: message }, options)
    );
  },
  progress: (progress) => {
    toast.toast({ progress: progress });
  },
  toast: async (msg) => {
    const channel = new BroadcastChannel("notifications");
    await channel.postMessage(msg);
    channel.close();
  },
};

export default function Toast() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("warning");
  const [autoHideDuration, setAutoHideDuration] = useState(null);
  const [message, setMessage] = useState(null);
  const [progress, setProgress] = useState(null);

  const onClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpen(false);
  };

  useEffect(() => {
    toast_channel.onmessage = (event) => {
      if (event.data.message) {
        const msg = Object.assign(
          {
            variant: "warning",
            autoHideDuration: null,
            message: null,
          },
          event.data
        );
        setVariant(msg.variant);
        setAutoHideDuration(msg.autoHideDuration);
        setMessage(msg.message);
        setProgress(null);
        setOpen(true);
      } else if (event.data.progress) {
        setProgress(event.data.progress);
      }
    };
  });

  let alert;
  if (variant === "error") {
    alert = (
      <Alert
        elevation={6}
        variant="filled"
        onClose={!progress && onClose}
        severity={variant}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{message}</AlertTitle>
        <Button
          variant="contained"
          size="small"
          disableElevation
          color="warning"
          onClick={async () => {
            setOpen(false);
            await navigate("/system-info");
          }}
        >
          {t("errors.reportAProblem")}
        </Button>
        {progress && <LinearProgress variant="determinate" value={progress} />}
      </Alert>
    );
  } else {
    alert = (
      <Alert
        elevation={6}
        variant="filled"
        onClose={!progress && onClose}
        severity={variant}
        sx={{ width: "100%" }}
      >
        {message}
        {progress && <LinearProgress variant="determinate" value={progress} />}
      </Alert>
    );
  }

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      {alert}
    </Snackbar>
  );
}
