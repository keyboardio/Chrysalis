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

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Overview from "./Sidebar/Overview";

const sidebarWidth = 360;

const Sidebar = (props) => {
  const { keymap, selectedKey, selectedLed, layer, colormap, macroEditorOpen } = props;

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.drawer - 50,
        width: sidebarWidth,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          p: 0,
          zIndex: (theme) => theme.zIndex.drawer - 50,
        },
      }}
    >
      <Toolbar />
      <Overview
        macroEditorOpen={macroEditorOpen}
        keymap={keymap}
        colormap={colormap}
        selectedKey={selectedKey}
        selectedLed={selectedLed}
        layer={layer}
        setLayer={props.setLayer}
        copyLayer={props.copyLayer}
        hasCopiedLayer={props.hasCopiedLayer}
        pasteLayer={props.pasteLayer}
        layerNames={props.layerNames}
        setLayerName={props.setLayerName}
        onKeymapChange={props.onKeymapChange}
        onPaletteChange={props.onPaletteChange}
        onColormapChange={props.onColormapChange}
        onColormapAndPaletteChange={props.onColormapAndPaletteChange}
      />
    </Drawer>
  );
};

export { Sidebar as default, sidebarWidth };
