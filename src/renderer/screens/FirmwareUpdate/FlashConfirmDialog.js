import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";

const FlashConfirmDialog = ({ open, onConfirm, onCancel, isFactoryReset, activeDevice }) => {
  const { t } = useTranslation();

  console.log("activeDevice", activeDevice);
  return (
    <ConfirmationDialog
      title={isFactoryReset ? t("firmwareUpdate.factoryConfirmDialog.title") : t("firmwareUpdate.confirmDialog.title")}
      open={open}
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmLabel={t("dialog.continue")}
    >
      <Typography component="p" sx={{ mb: 2 }}>
        {isFactoryReset
          ? t("firmwareUpdate.factoryConfirmDialog.contents")
          : t("firmwareUpdate.confirmDialog.description")}
      </Typography>
      {activeDevice?.focus.in_bootloader || (
        <Alert severity="info">
          <AlertTitle>{t("firmwareUpdate.calloutTitle")}</AlertTitle>
          <Typography component="p" gutterBottom>
            {t("hardware.updateInstructions")}
          </Typography>
        </Alert>
      )}
    </ConfirmationDialog>
  );
};

export default FlashConfirmDialog;
