import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "@renderer/components/Toast";
import jsonStringify from "json-stringify-pretty-compact";
import React from "react";
import { useTranslation } from "react-i18next";
import Focus from "@api/focus";
export const ExportToFile = (props) => {
  const { t } = useTranslation();

  const focus = new Focus();

  const exportToFile = async () => {
    const { keymap, colormap } = props;
    const backupData = await focus.readKeyboardConfiguration();
    // delete the eeprom contents
    delete backupData["eeprom.contents"];
    const data = {
      keymaps: keymap.custom,
      colormaps: colormap.colorMap,
      palette: colormap.palette,
      deviceConfiguration: backupData,
    };
    const content = jsonStringify(data);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const device_name = focus.focusDeviceDescriptor.info.displayName.replace(/ /g, "-");

    link.download = `Chrysalis_${device_name}_layout_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button variant="outlined" onClick={exportToFile}>
        {t("editor.sharing.exportToFile")}
      </Button>
    </Box>
  );
};
