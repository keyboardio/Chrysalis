import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "@renderer/components/Toast";
import jsonStringify from "json-stringify-pretty-compact";
import React from "react";
import { useTranslation } from "react-i18next";

export const ExportToFile = (props) => {
  const { t } = useTranslation();

  const exportToFile = () => {
    const { keymap, colormap } = props;
    const data = {
      keymaps: keymap.custom,
      colormaps: colormap.colorMap,
      palette: colormap.palette,
    };
    const content = jsonStringify(data);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Layout.json";
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
