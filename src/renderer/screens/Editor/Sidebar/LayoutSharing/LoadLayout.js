import KeymapDB from "@api/focus/keymap/db";
import { toast } from "@renderer/components/Toast";
import logger from "@renderer/utils/Logger";
import { t } from "i18next";

const db = new KeymapDB();

export const loadLayout = async (fileName, fileData) => {
  if (!fileData) {
    try {
      const response = await fetch(`/public/${fileName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fileData = await response.text();
    } catch (e) {
      logger.error("Unable to read layout", {
        filename: fileName,
        error: e.message,
      });
      toast.error(t("editor.sharing.errors.unableToLoad"));
      return null;
    }
  }
  logger.log("loaded file data ", fileData);
  let layoutData;
  try {
    layoutData = JSON.parse(fileData);
  } catch (e) {
    logger.error("Failed to parse layout JSON", {
      filename: fileName,
      error: e.message,
    });
    toast.error(t("editor.sharing.errors.parseFail"));
    return null;
  }
  logger.log("parsed that into ", layoutData);
  const src_keymaps = layoutData.keymaps || layoutData.keymap.custom;

  let keymaps;
  try {
    keymaps = src_keymaps.map((layer) => {
      return layer.map((key) => {
        return db.lookup(key.keyCode || key.code);
      });
    });
  } catch (_) {
    logger.error("Layout file did not contain valid layout data", {
      filename: fileName,
    });
    toast.error(t("editor.sharing.errors.invalidLayoutData"));
    return null;
  }

  return {
    keymaps: keymaps,
    colormaps: layoutData.colormaps || layoutData.colormap?.colorMap,
    palette: layoutData.palette || layoutData.colormap?.palette,
  };
};
