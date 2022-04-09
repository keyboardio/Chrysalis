// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import i18n from "i18next";
import path from "path";
import fs from "fs";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ConfirmationDialog from "../../../../components/ConfirmationDialog";

import Focus from "../../../../../api/focus";
import Log from "../../../../../api/log";
import { KeymapDB } from "../../../../../api/keymap";
import { getStaticPath } from "../../../../config";
import { FileImport } from "./LayoutSharing/FileImport";
import { ExportToFile } from "./LayoutSharing/ExportToFile";
import { LibraryImport } from "./LayoutSharing/LibraryImport";

const db = new KeymapDB();

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

class LayoutSharing extends React.Component {
  constructor(props) {
    super(props);

    const focus = new Focus();

    const { vendor, product } = focus.device.info;
    const cVendor = vendor.replace("/", "");
    const cProduct = product.replace("/", "");
    const layoutDirPath = path.join(
      getStaticPath(),
      cVendor,
      cProduct,
      "layouts"
    );

    try {
      const layouts = fs
        .readdirSync(layoutDirPath, {
          encoding: "utf-8",
        })
        .map((name) => path.basename(name, ".json"))
        .sort();

      this.state = {
        importConfirmOpen: false,
        layout: {},
        layoutName: null,
        library: layouts,
      };
    } catch (_) {
      this.state = {
        importConfirmOpen: false,
        layout: {},
        layoutName: null,
        library: [],
      };
    }
  }

  setLayout = (layoutName, layout) => {
    this.setState({
      layoutName: layoutName,
      layout: layout,
    });
  };

  openImportConfirm = () => {
    this.setState({ importConfirmOpen: true });
  };
  closeImportConfirm = () => {
    this.setState({ importConfirmOpen: false });
  };

  onImport = () => {
    const { keymap, colormap } = this.props;
    const { layout } = this.state;

    const newKeymap = layout.keymaps.concat(
      keymap.custom.slice(layout.keymaps.length)
    );
    const newColormap = layout.colormaps
      ? layout.colormaps.concat(
          colormap.colorMap.slice(layout.colormaps.length)
        )
      : colormap.colorMap;
    const newPalette = layout.palette || colormap.palette;

    this.props.onKeymapChange(newKeymap);
    this.props.onColormapChange(newColormap);
    this.props.onPaletteChange(newPalette);
    this.props.onClose();
  };

  render() {
    const { open, onClose, theme, keymap, colormap, ...others } = this.props;
    const { layout, layoutName, library } = this.state;

    const focus = new Focus();
    const Keymap = focus.device.components.keymap;
    const previewLayout = layout.keymaps ? layout.keymaps[0] : keymap.custom[0];
    const palette = layout.palette || colormap.palette;
    const previewColormap = layout.colormaps
      ? layout.colormaps[0]
      : colormap.colorMap[0];
    const keymapWidget = (
      <Keymap
        className="layer"
        keymap={previewLayout}
        palette={palette}
        colormap={previewColormap}
        theme={theme}
      />
    );

    const sidebarWidth = 300;

    return (
      <Dialog open={open} onClose={onClose} fullScreen>
        <DialogTitle>
          <Typography>{i18n.t("editor.sharing.title")}</Typography>
          <IconButton
            onClick={onClose}
            size="large"
            sx={{
              position: "absolute",
              right: 1,
              top: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              width: sidebarWidth,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                overflow: "auto",
                padding: 3,
              }}
            >
              <LibraryImport
                setLayout={this.setLayout}
                library={library}
                layoutName={layoutName}
                {...others}
              />
              <FileImport setLayout={this.setLayout} {...others} />
              <ExportToFile keymap={keymap} colormap={colormap} />

              <Button
                disabled={layoutName == null}
                variant="outlined"
                color="primary"
                onClick={this.openImportConfirm}
              >
                {i18n.t("editor.sharing.import")}
              </Button>
              <ConfirmationDialog
                title={i18n.t("editor.sharing.importConfirm.title")}
                open={this.state.importConfirmOpen}
                onConfirm={this.onImport}
                onCancel={this.closeImportConfirm}
              >
                {i18n.t("editor.sharing.importConfirm.contents")}
              </ConfirmationDialog>
            </Box>
          </Drawer>
          <Box
            sx={{
              flexGrow: 1,
              padding: 3,
              marginLeft: sidebarWidth,
              width: `calc(100% - ${sidebarWidth}px)`,
            }}
          >
            {keymapWidget}
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
}

export { LayoutSharing as default };
