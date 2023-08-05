import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { loadLayout } from "./LoadLayout";

export const FileImport = (props) => {
  const { t } = useTranslation();

  const fileInputRef = React.createRef();

  const importFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const fileData = e.target.result;
      const layoutData = loadLayout(file.name, fileData);
      if (layoutData != null) props.setLayout("custom", layoutData);
    };
    reader.readAsText(file);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={importFromFile}
      />
      <Button variant="outlined" onClick={openFileDialog}>
        {t("editor.sharing.loadFromFile")}
      </Button>
    </Box>
  );
};
