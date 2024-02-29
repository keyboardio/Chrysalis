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

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import { GlobalContext } from "@renderer/components/GlobalContext";
import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import { ExportToFile } from "./LayoutSharing/ExportToFile";
import { FileImport } from "./LayoutSharing/FileImport";
import { LibraryImport } from "./LayoutSharing/LibraryImport";

const LayoutSharing = (props) => {
  const [importConfirmOpen, setImportConfirmOpen] = React.useState(false);
  const [layout, _setLayout] = React.useState({});
  const [layoutName, setLayoutName] = React.useState(null);

  const [activeDevice] = useContext(GlobalContext).state.activeDevice;
  const [maxKeyboardHeight, setMaxKeyboardHeight] = useState("auto");

  useEffect(() => {
    function updateMaxKeyboardHeight() {
      const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const maxHeightValue = window.innerHeight - 3 * remInPixels;
      setMaxKeyboardHeight(`${maxHeightValue}px`);
    }

    // Set the initial maxHeight
    updateMaxKeyboardHeight();

    // Add event listener for window resize
    window.addEventListener("resize", updateMaxKeyboardHeight);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", updateMaxKeyboardHeight);
  }, []);

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
      <Drawer variant="permanent" anchor="bottom" sx={{ flexShrink: 0 }}>
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
          marginRight: "14rem",
        }}
      >
        <Keymap
          className="layer"
          maxHeight={props.maxKeyboardHeight}
          layerNames={props.layerNames}
          index={props.layer}
          keymap={keymap?.custom[props.layer]}
          palette={colormap.palette}
          colormap={colormap.colorMap[props.layer]}
        />
      </Box>
    </>
  );
};
export default LayoutSharing;
