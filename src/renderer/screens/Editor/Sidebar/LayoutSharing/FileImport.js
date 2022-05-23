import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ipcRenderer } from "electron";
import React from "react";
import { useTranslation } from "react-i18next";
import { loadLayout } from "./LoadLayout";

export const FileImport = (props) => {
  const { t } = useTranslation();
  const importFromFile = () => {
    const [fileName, fileData] = ipcRenderer.sendSync("file-open", {
      title: t("editor.sharing.selectLoadFile"),
      filters: [
        {
          name: t("editor.sharing.dialog.layoutFiles"),
          extensions: ["json", "layout"],
        },
        {
          name: t("editor.sharing.dialog.allFiles"),
          extensions: ["*"],
        },
      ],
    });
    // If we have no filename, then the dialog was canceled.
    if (!fileName) return;
    const layoutData = loadLayout(fileName, fileData);
    if (layoutData != null) props.setLayout("custom", layoutData);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button variant="outlined" onClick={importFromFile}>
        {t("editor.sharing.loadFromFile")}
      </Button>
    </Box>
  );
};
