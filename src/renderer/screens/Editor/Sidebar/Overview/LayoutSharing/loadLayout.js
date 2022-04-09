import i18n from "i18next";
import fs from "fs";
import { toast } from "react-toastify";
import Log from "../../../../../../api/log";
import { db } from "../LayoutSharing";

export const loadLayout = (fileName) => {
  const logger = new Log();

  let fileData;
  try {
    fileData = fs.readFileSync(fileName);
  } catch (e) {
    logger.error("Unable to read layout", {
      filename: fileName,
      error: e.message,
    });
    toast.error(i18n.t("editor.sharing.errors.unableToLoad"));
    return null;
  }

  let layoutData;
  try {
    layoutData = JSON.parse(fileData);
  } catch (e) {
    logger.error("Failed to parse layout JSON", {
      filename: fileName,
      error: e.message,
    });
    toast.error(i18n.t("editor.sharing.errors.parseFail"));
    return null;
  }

  let keymaps;
  try {
    keymaps = layoutData.keymaps.map((layer) => {
      return layer.map((key) => {
        return db.lookup(key.keyCode || key.code);
      });
    });
  } catch (_) {
    logger.error("Layout file did not contain valid layout data", {
      filename: fileName,
    });
    toast.error(i18n.t("editor.sharing.errors.invalidLayoutData"));
    return null;
  }

  return {
    keymaps: keymaps,
    colormaps: layoutData.colormaps,
    palette: layoutData.palette,
  };
};
