// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import { GlobalContext } from "@renderer/components/GlobalContext";

import { t } from "i18next";
import React, { useContext } from "react";

import { ExportToFile } from "./LayoutSharing/ExportToFile";
import { FileImport } from "./LayoutSharing/FileImport";
import { LibraryImport } from "./LayoutSharing/LibraryImport";

const LayoutSharing = (props) => {
  const [importConfirmOpen, setImportConfirmOpen] = React.useState(false);
  const [layout, _setLayout] = React.useState({});
  const [layoutName, setLayoutName] = React.useState(null);

  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const setLayout = (layoutName, layout) => {
    _setLayout(layout);
    setLayoutName(layoutName);
  };

  const onImport = () => {
    const { keymap, colormaps } = props;

    setImportConfirmOpen(false);
    props.onKeymapChange(layout.keymaps.concat(keymap.custom.slice(layout.keymaps.length)));
    props.onColormapAndPaletteChange({
      palette: layout.palette || colormap.palette,
      colorMap: layout.colormaps
        ? layout.colormaps.concat(colormap.colorMap.slice(layout.colormaps.length))
        : colormap.colorMap,
    });
    props.onClose();
  };

  const onRestore = (layoutData) => {
    props.onKeymapChange(layoutData.keymaps);
    props.onColormapAndPaletteChange({ palette: layoutData.palette, colorMap: layoutData.colormaps });
  };

  const { open, onClose, theme, keymap, colormap, ...others } = props;
  const sidebarWidth = 300;

  const Keymap = activeDevice.focusDeviceDescriptor().components.keymap;

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ width: sidebarWidth, flexShrink: 0 }}
        PaperProps={{
          sx: {
            width: sidebarWidth,
            marginTop: "65px",
            paddingBottom: "65px",
          },
        }}
      >
        <Box sx={{ overflow: "auto", padding: 3 }}>
          <LibraryImport setLayout={setLayout} layoutName={layoutName} {...others} />
          <FileImport onRestore={onRestore} {...others} />
          <ExportToFile keymap={keymap} colormap={colormap} />

          <Button
            disabled={layoutName == null}
            variant="outlined"
            color="primary"
            onClick={() => {
              setImportConfirmOpen(true);
            }}
          >
            {t("editor.sharing.import")}
          </Button>
          <ConfirmationDialog
            title={t("editor.sharing.importConfirm.title")}
            open={importConfirmOpen}
            onConfirm={onImport}
            onCancel={() => {
              setImportConfirmOpen(false);
            }}
          >
            {t("editor.sharing.importConfirm.contents")}
          </ConfirmationDialog>
        </Box>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        <Keymap
          keymap={layout.keymaps ? layout.keymaps[0] : keymap.custom[0]}
          palette={layout.palette || colormap.palette}
          colormap={layout.colormaps ? layout.colormaps[0] : colormap.colorMap[0]}
          theme={theme}
        />{" "}
      </Box>
    </>
  );
};
export default LayoutSharing;
