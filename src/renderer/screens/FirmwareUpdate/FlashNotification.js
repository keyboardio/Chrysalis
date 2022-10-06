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

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import React from "react";
import { useTranslation } from "react-i18next";

import { RebootMessage } from "@api/flash";

export const FlashNotification = (props) => {
  const { t } = useTranslation();

  let contents;

  const instructions = (
    <Alert severity="warning">
      <AlertTitle>{t("firmwareUpdate.calloutTitle")}</AlertTitle>
      <Typography component="p" gutterBottom>
        {t("hardware.updateInstructions")}
      </Typography>
    </Alert>
  );

  if (props.message === RebootMessage.enter.stillApplication) {
    contents = (
      <>
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.flashing.notifications.enter.stillApplication")}
        </Typography>
        {instructions}
      </>
    );
  } else if (props.message === RebootMessage.enter.notFound) {
    contents = (
      <>
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.flashing.notifications.enter.notFound")}
        </Typography>
      </>
    );
  } else if (props.message === RebootMessage.reconnect.stillBootloader) {
    contents = (
      <>
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.flashing.notifications.reconnect.stillBootloader")}
        </Typography>
      </>
    );
  } else if (props.message === RebootMessage.reconnect.notFound) {
    contents = (
      <>
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.flashing.notifications.reconnect.notFound")}
        </Typography>
      </>
    );
  } else {
    contents = (
      <>
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.flashing.notifications.unknownMessage", {
            message: props.message,
          })}
        </Typography>
      </>
    );
  }

  return (
    <Dialog disableEscapeKeyDown open={props.open} fullWidth>
      <DialogTitle>
        {t("firmwareUpdate.flashing.notifications.title")}
      </DialogTitle>
      <DialogContent>{contents}</DialogContent>
    </Dialog>
  );
};
