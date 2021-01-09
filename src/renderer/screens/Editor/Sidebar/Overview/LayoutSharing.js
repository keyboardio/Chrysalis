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
import Electron from "electron";
import path from "path";
import fs from "fs";
import { toast } from "react-toastify";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import ConfirmationDialog from "../../../../components/ConfirmationDialog";

import Focus from "../../../../../api/focus";
import Log from "../../../../../api/log";
import { KeymapDB } from "../../../../../api/keymap";
import { getStaticPath } from "../../../../config";

const db = new KeymapDB();

const sidebarWidth = 300;

const styles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
    marginTop: -theme.spacing(1)
  },
  libraryImport: {
    minWidth: "15em",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  libraryImportRoot: {
    marginBottom: theme.spacing(2)
  },
  fileImportRoot: {
    marginBottom: theme.spacing(2)
  },
  fileExportRoot: {
    marginBottom: theme.spacing(2)
  },
  drawer: {
    width: sidebarWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: sidebarWidth,
    marginTop: 65
  },
  drawerContainer: {
    overflow: "auto",
    padding: theme.spacing(3)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: sidebarWidth,
    width: `calc(100% - ${sidebarWidth}px)`
  }
});

const loadLayout = fileName => {
  const logger = new Log();

  let fileData;
  try {
    fileData = fs.readFileSync(fileName);
  } catch (e) {
    logger.error("Unable to read layout", {
      filename: fileName,
      error: e.message
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
      error: e.message
    });
    toast.error(i18n.t("editor.sharing.errors.parseFail"));
    return null;
  }

  let keymaps;
  try {
    keymaps = layoutData.keymaps.map(layer => {
      return layer.map(key => {
        return db.lookup(key.keyCode || key.code);
      });
    });
  } catch (_) {
    logger.error("Layout file did not contain valid layout data", {
      filename: fileName
    });
    toast.error(i18n.t("editor.sharing.errors.invalidLayoutData"));
    return null;
  }

  return {
    keymaps: keymaps,
    colormaps: layoutData.colormaps,
    palette: layoutData.palette
  };
};

class LibraryImportBase extends React.Component {
  selectLibraryItem = item => () => {
    this.loadFromLibrary(item);
  };

  loadFromLibrary = layoutName => {
    const focus = new Focus();
    const { vendor, product } = focus.device.info;
    const cVendor = vendor.replace("/", "");
    const cProduct = product.replace("/", "");
    const layoutPath = layout =>
      path.join(getStaticPath(), cVendor, cProduct, `layouts/${layout}.json`);

    const layoutData = loadLayout(layoutPath(layoutName));

    if (layoutData != null) this.props.setLayout(layoutName, layoutData);
  };

  render() {
    const { classes, library, layoutName } = this.props;

    if (library.length == 0) return null;

    const layouts = library.map(name => {
      const label = name.charAt(0).toUpperCase() + name.slice(1);

      return (
        <MenuItem
          selected={layoutName == name}
          value={name}
          key={`library-item-${name}`}
          onClick={this.selectLibraryItem(name)}
        >
          {label}
        </MenuItem>
      );
    });

    return (
      <div className={classes.libraryImportRoot}>
        <Typography variant="h5">
          {i18n.t("editor.sharing.loadFromLibrary")}
        </Typography>
        <MenuList>{layouts}</MenuList>

        <Divider />
      </div>
    );
  }
}
const LibraryImport = withStyles(styles, { withTheme: true })(
  LibraryImportBase
);

class FileImportBase extends React.Component {
  importFromFile = () => {
    const files = Electron.remote.dialog.showOpenDialog({
      title: i18n.t("editor.sharing.selectLoadFile"),
      filters: [
        {
          name: i18n.t("editor.sharing.dialog.layoutFiles"),
          extensions: ["json", "layout"]
        },
        {
          name: i18n.t("editor.sharing.dialog.allFiles"),
          extensions: ["*"]
        }
      ]
    });
    files.then(result => {
      if (result.filePaths.length == 0) return;

      const layoutData = loadLayout(result.filePaths[0]);
      if (layoutData != null) this.props.setLayout("custom", layoutData);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.fileImportRoot}>
        <Button variant="outlined" onClick={this.importFromFile}>
          {i18n.t("editor.sharing.loadFromFile")}
        </Button>
      </div>
    );
  }
}
const FileImport = withStyles(styles, { withTheme: true })(FileImportBase);

class ExportToFileBase extends React.Component {
  exportToFile = () => {
    const files = Electron.remote.dialog.showSaveDialog({
      title: i18n.t("editor.sharing.selectExportFile"),
      filters: [
        {
          name: i18n.t("editor.sharing.dialog.layoutFiles"),
          extensions: ["json", "layout"]
        },
        {
          name: i18n.t("editor.sharing.dialog.allFiles"),
          extensions: ["*"]
        }
      ]
    });
    files.then(result => {
      const fileName = result.filePath;

      if (!fileName) return;

      const { keymap, colormap } = this.props;

      const data = {
        keymaps: keymap.custom,
        colormaps: colormap.colorMap,
        palette: colormap.palette
      };

      try {
        fs.writeFileSync(fileName, JSON.stringify(data));
      } catch (e) {
        const logger = new Log();

        logger.error("Unable to save layout", {
          fileName: fileName,
          e: e.message
        });
        toast.error(i18n.t("editor.sharing.errors.saveFail"));
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.fileExportRoot}>
        <Button variant="outlined" onClick={this.exportToFile}>
          {i18n.t("editor.sharing.exportToFile")}
        </Button>
      </div>
    );
  }
}
const ExportToFile = withStyles(styles, { withTheme: true })(ExportToFileBase);

class LayoutSharingBase extends React.Component {
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
          encoding: "utf-8"
        })
        .map(name => path.basename(name, ".json"))
        .sort();

      this.state = {
        importConfirmOpen: false,
        layout: {},
        layoutName: null,
        library: layouts
      };
    } catch (_) {
      this.state = {
        importConfirmOpen: false,
        layout: {},
        layoutName: null,
        library: []
      };
    }
  }

  setLayout = (layoutName, layout) => {
    this.setState({
      layoutName: layoutName,
      layout: layout
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
    const {
      classes,
      open,
      onClose,
      theme,
      keymap,
      colormap,
      ...others
    } = this.props;
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

    return (
      <Dialog open={open} onClose={onClose} fullScreen>
        <DialogTitle disableTypography>
          <Typography variant="h6">{i18n.t("editor.sharing.title")}</Typography>
          <IconButton onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerContainer}>
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
            </div>
          </Drawer>

          <div className={classes.content}>{keymapWidget}</div>
        </DialogContent>
      </Dialog>
    );
  }
}
const LayoutSharing = withStyles(styles, { withTheme: true })(
  LayoutSharingBase
);

export { LayoutSharing as default };
