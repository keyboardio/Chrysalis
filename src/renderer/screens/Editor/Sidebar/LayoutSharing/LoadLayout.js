import KeymapDB from "@api/focus/keymap/db";
import { logger } from "@api/log";
import { t } from "i18next";
import { toast } from "@renderer/components/Toast";

const db = new KeymapDB();

export const loadLayout = async (fileName) => {
  let fileData;

  try {
    const response = await fetch(`/public/${fileName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    fileData = await response.text();
  } catch (e) {
    logger().error("Unable to read layout", {
      filename: fileName,
      error: e.message,
    });
    toast.error(t("editor.sharing.errors.unableToLoad"));
    return null;
  }

  let layoutData;
  try {
    layoutData = JSON.parse(fileData);
  } catch (e) {
    logger().error("Failed to parse layout JSON", {
      filename: fileName,
      error: e.message,
    });
    toast.error(t("editor.sharing.errors.parseFail"));
    return null;
  }

  const src_keymaps = layoutData.keymaps || layoutData.keymap.custom;

  let keymaps;
  try {
    keymaps = src_keymaps.map((layer) => {
      return layer.map((key) => {
        return db.lookup(key.keyCode || key.code);
      });
    });
  } catch (_) {
    logger().error("Layout file did not contain valid layout data", {
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
