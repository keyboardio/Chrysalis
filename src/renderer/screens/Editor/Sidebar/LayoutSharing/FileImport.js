import logger from "@renderer/utils/Logger";
import React from "react";
import { useTranslation } from "react-i18next";
import { loadLayout } from "./LoadLayout";
import { FileInput } from "../../../../components/FileUpload";

export const FileImport = (props) => {
  const { t } = useTranslation();

  const loadFile = async (fileData, fileName) => {
    const layoutData = await loadLayout(fileName, fileData);
    if (layoutData != null) props.onRestore(layoutData);
    logger.log("finally returned ", layoutData);
  };

  return (
    <FileInput onLoad={loadFile}>
      {t("editor.sharing.loadFromFile")}
    </FileInput>
  );
};
