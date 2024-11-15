import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import logger from "@renderer/utils/Logger";

const BootloaderConnectDialog = ({ open, onConnect, bootloaderProtocol, connectToBootloaderPort }) => {
  const { t } = useTranslation();

  const handleConfirm = async () => {
    const success = await connectToBootloaderPort();
    if (success) {
      onConnect(success);
    } else {
      logger.log("We need to try that connect again");
    }
  };

  return (
    <ConfirmationDialog open={open} title={t("firmwareUpdate.bootloaderConnectDialog.title")} onConfirm={handleConfirm}>
      <Typography component="p" sx={{ mb: 2 }}>
        {t("firmwareUpdate.bootloaderConnectDialog.contents")}
      </Typography>
    </ConfirmationDialog>
  );
};

export default BootloaderConnectDialog;