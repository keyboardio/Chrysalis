import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import { connectToSerialport } from "@renderer/utils/connectToSerialport";
import logger from "@renderer/utils/Logger";

const FocusConnectDialog = ({ open, onConnect }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    const focus = await connectToSerialport();
    if (focus) {
      logger.debug("connected to serial port");
      onConnect();
    } else {
      logger.log("We need to try that connect again");
    }
  };

  return (
    <ConfirmationDialog open={open} title={t("firmwareUpdate.reconnectDialog.title")} onConfirm={handleConfirm}>
      <Typography component="p" sx={{ mb: 2 }}>
        {t("firmwareUpdate.reconnectDialog.contents")}
      </Typography>
    </ConfirmationDialog>
  );
};

export default FocusConnectDialog;
