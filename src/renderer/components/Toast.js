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

import { logger } from "@api/log";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";

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
    if (!msg.progress) {
      logger().debug("Toast message received", {
        msg: {
          variant: msg.variant,
          message: msg.message.toString(),
        },
        label: "toast",
      });
    }
    const channel = new BroadcastChannel("notifications");
    await channel.postMessage(msg);
    channel.close();
  },
};

export default function Toast() {
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
        setMessage(msg.message.toString());
        setProgress(null);
        setOpen(true);
      } else if (event.data.progress) {
        setProgress(event.data.progress);
      }
    };
  });

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
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
    </Snackbar>
  );
}
