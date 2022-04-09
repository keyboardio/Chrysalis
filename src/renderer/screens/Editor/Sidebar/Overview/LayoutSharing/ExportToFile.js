import React from "react";
import i18n from "i18next";
import { ipcRenderer } from "electron";
import jsonStringify from "json-stringify-pretty-compact";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export class ExportToFile extends React.Component {
  exportToFile = () => {
    const { keymap, colormap } = this.props;
    const data = {
      keymaps: keymap.custom,
      colormaps: colormap.colorMap,
      palette: colormap.palette,
    };

    ipcRenderer.send("file-save", {
      content: jsonStringify(data),
      title: i18n.t("editor.sharing.selectExportFile"),
      defaultPath: "Layout.json",
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
  };

  render() {
    return (
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={this.exportToFile}>
          {i18n.t("editor.sharing.exportToFile")}
        </Button>
      </Box>
    );
  }
}
