import React from "react";
import i18n from "i18next";
import { Electron } from "electron";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { loadLayout } from "./loadLayout";

export const FileImport = (props) => {
  const importFromFile = () => {
    const files = Electron.remote.dialog.showOpenDialog({
      title: i18n.t("editor.sharing.selectLoadFile"),
      filters: [
        {
          name: i18n.t("editor.sharing.dialog.layoutFiles"),
          extensions: ["json", "layout"],
        },
        {
          name: i18n.t("editor.sharing.dialog.allFiles"),
          extensions: ["*"],
        },
      ],
    });
    files.then((result) => {
      if (result.filePaths.length == 0) return;
      const layoutData = loadLayout(result.filePaths[0]);
      if (layoutData != null) props.setLayout("custom", layoutData);
    });
  };
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Button variant="outlined" onClick={importFromFile}>
        {i18n.t("editor.sharing.loadFromFile")}
      </Button>
    </Box>
  );
};
