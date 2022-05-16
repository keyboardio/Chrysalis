// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2021  Keyboardio, Inc.
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

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Overview from "./Sidebar/Overview";
import Colormap from "./Sidebar/Colormap";
import KeyPicker from "./Sidebar/KeyPicker";
import SecondaryFunction from "./Sidebar/SecondaryFunction";
import LayerKeys from "./Sidebar/LayerKeys";
import ConsumerKeys from "./Sidebar/ConsumerKeys";
import LeaderKeys from "./Sidebar/LeaderKeys";
import LEDKeys from "./Sidebar/LEDKeys";
import MacroKeys from "./Sidebar/MacroKeys";
import MouseKeys from "./Sidebar/MouseKeys";
import OneShotKeys from "./Sidebar/OneShotKeys";
import SpaceCadetKeys from "./Sidebar/SpaceCadetKeys";
import StenoKeys from "./Sidebar/StenoKeys";
import TapDanceKeys from "./Sidebar/TapDanceKeys";
import BlankKeys from "./Sidebar/BlankKeys";
import CustomKey from "./Sidebar/CustomKey";

const sidebarWidth = 360;

const Sidebar = (props) => {
  const { keymap, selectedKey, selectedLed, layer, layout, colormap } = props;

  const widgets = [
    KeyPicker,
    SecondaryFunction,
    Colormap,
    LayerKeys,
    ConsumerKeys,
    MouseKeys,
    LEDKeys,
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
        keymap={keymap}
        colormap={colormap}
        selectedKey={selectedKey}
        selectedLed={selectedLed}
        layer={layer}
        layout={layout}
        setLayout={props.setLayout}
        onKeyChange={props.onKeyChange}
        onLedChange={props.onLedChange}
        onPaletteChange={props.onPaletteChange}
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
          p: 1,
          zIndex: (theme) => theme.zIndex.appBar - 100,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {i18n.t("components.layer", { index: layer })}
        </Typography>
        <Overview
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
