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
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import BlankKeys from "./Sidebar/BlankKeys";
import BrightnessKeys from "./Sidebar/BrightnessKeys";
import Colormap from "./Sidebar/Colormap";
import CustomKey from "./Sidebar/CustomKey";
import DynamicMacroKeys from "./Sidebar/DynamicMacroKeys";
import LayerKeys from "./Sidebar/LayerKeys";
import LeaderKeys from "./Sidebar/LeaderKeys";
import LEDKeys from "./Sidebar/LEDKeys";
import MacroKeys from "./Sidebar/MacroKeys";
import MediaKeys from "./Sidebar/MediaKeys";
import KeyPicker from "./Sidebar/Modifiers";
import MouseKeys from "./Sidebar/MouseKeys";
import OneShotKeys from "./Sidebar/OneShotKeys";
import Overview from "./Sidebar/Overview";
import SecondaryFunction from "./Sidebar/SecondaryFunction";
import SpaceCadetKeys from "./Sidebar/SpaceCadetKeys";
import StenoKeys from "./Sidebar/StenoKeys";
import TapDanceKeys from "./Sidebar/TapDanceKeys";
import VolumeKeys from "./Sidebar/VolumeKeys";

const sidebarWidth = 360;

const Sidebar = (props) => {
  const { keymap, selectedKey, selectedLed, layer, colormap, macroEditorOpen } =
    props;

  const widgets = [
    KeyPicker,
    SecondaryFunction,
    Colormap,
    LayerKeys,
    BrightnessKeys,
    VolumeKeys,
    MediaKeys,
    MouseKeys,
    LEDKeys,
    DynamicMacroKeys,
    MacroKeys,
    TapDanceKeys,
    OneShotKeys,
    SpaceCadetKeys,
    LeaderKeys,
    StenoKeys,
    BlankKeys,
    CustomKey,
  ];
  const categories = widgets.map((Widget, index) => {
    return (
      <Widget
        key={`sidebar-category-${index}`}
        macroEditorOpen={macroEditorOpen}
        keymap={keymap}
        colormap={colormap}
        selectedKey={selectedKey}
        selectedLed={selectedLed}
        layer={layer}
        onKeyChange={props.onKeyChange}
        onLedChange={props.onLedChange}
        onPaletteChange={props.onPaletteChange}
        macros={props.macros}
        setOpenMacroEditor={props.setOpenMacroEditor}
        currentKey={props.currentKey}
        sx={{ p: 2 }}
      />
    );
  });

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.appBar - 100,
        width: sidebarWidth,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          p: 0,
          zIndex: (theme) => theme.zIndex.appBar - 100,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ px: 1, mb: 2 }}>
        <Overview
          macroEditorOpen={macroEditorOpen}
          keymap={keymap}
          colormap={colormap}
          selectedKey={selectedKey}
          selectedLed={selectedLed}
          layer={layer}
          setLayer={props.setLayer}
          onKeymapChange={props.onKeymapChange}
          onPaletteChange={props.onPaletteChange}
          onColormapChange={props.onColormapChange}
        />
        {categories}
      </Box>
    </Drawer>
  );
};

export { Sidebar as default, sidebarWidth };
