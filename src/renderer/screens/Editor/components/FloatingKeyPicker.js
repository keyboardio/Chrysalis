// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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
import Grid from "@mui/material/Grid";
import TabContext from "@mui/lab/TabContext";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import useTheme from "@mui/material/styles/useTheme";
import { useWindowSize } from "@renderer/hooks/useWindowSize";
import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Keyboard104 from "../Keyboard104";
import MediaKeys from "../Sidebar/MediaKeys";
import VolumeKeys from "../Sidebar/VolumeKeys";
import { MouseWarpKeys } from "../Sidebar/MouseWarpKeys";
import { MouseWheelKeys } from "../Sidebar/MouseWheelKeys";
import { MouseMovementKeys } from "../Sidebar/MouseMovementKeys";
import { MouseButtonKeys } from "../Sidebar/MouseButtonKeys";
import StenoKeys from "../Sidebar/StenoKeys";
import DynamicMacroKeys from "../Sidebar/DynamicMacroKeys";
import MacroKeys from "../Sidebar/MacroKeys";
import CustomKey from "../Sidebar/CustomKey";
import BlankKeys from "../Sidebar/BlankKeys";
import SpaceCadetKeys from "../Sidebar/SpaceCadetKeys";
import TapDanceKeys from "../Sidebar/TapDanceKeys";
import OneShotKeys from "../Sidebar/OneShotKeys";
import PlatformAppleKeys from "../Sidebar/PlatformAppleKeys";
import BrightnessKeys from "../Sidebar/BrightnessKeys";
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";

import VerticalSectionDivider from "./VerticalSectionDivider";
import LEDKeys from "../Sidebar/LEDKeys";
import Colormap from "../Sidebar/Colormap";
import LanguageKeys from "../Sidebar/LanguageKeys";
import LeaderKeys from "../Sidebar/LeaderKeys";
import LayerKeys from "../Sidebar/LayerKeys";
import SecondaryFunction from "../Sidebar/SecondaryFunction";
import Modifiers from "../Sidebar/Modifiers";

const fkp_channel = new BroadcastChannel("floating-key-picker");

export const FloatingKeyPicker = (props) => {
  const { onKeyChange, keymap } = props;
  const key = props.currentKey;

  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(1300);
  const [height, setHeight] = useState(400);
  const [x, setX] = useState(window.innerWidth / 2 - width / 2);
  const [y, setY] = useState(window.innerHeight - (height + 28));
  const [lastWindowSize, setLastWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState("keyboard");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const mouseKeysVisible = usePluginVisibility("MouseKeys");
  const stenoKeysVisible = usePluginVisibility("GeminiPR");
  const dynamicMacrosVisible = usePluginVisibility("DynamicMacros");
  const ledControlVisible = true; // XXX TODO this is wrong
  const windowSize = useWindowSize();

  if (windowSize.height && windowSize.height != lastWindowSize.height) {
    const new_y = y + (windowSize.height - lastWindowSize.height);
    if (new_y > 0 && new_y < window.innerHeight - 308) {
      setY(new_y);
    }
    setLastWindowSize(windowSize);
  }

  useEffect(() => {
    fkp_channel.onmessage = (event) => {
      if (event.data == "show") {
        setVisible(true);
      } else if (event.data == "hide") {
        setVisible(false);
      }
    };
  });

  if (!props.currentKey) return null;
  if (!visible) return null;
  const sharedProps = {
    onKeyChange: props.onKeyChange,
    currentKey: props.currentKey,
    macros: props.macros,
    macroEditorOpen: props.macroEditorOpen,
    setOpenMacroEditor: props.setOpenMacroEditor,
    keymap: props.keymap,
    colormap: props.colormap,
    selectedKey: props.selectedKey,
    selectedLed: props.selectedLed,
    layer: props.layer,
    layerNames: props.layerNames,
    onLedChange: props.onLedChange,
    onPaletteChange: props.onPaletteChange,
  };

  return (
    <Rnd
      size={{
        width: width,
        height: height,
      }}
      position={{ x: x, y: y }}
      onDragStop={(e, d) => {
        setX(d.x);
        setY(d.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setWidth(ref.style.width);
        setHeight(ref.style.height);
      }}
      style={{
        overflow: "hidden",
        zIndex: theme.zIndex.appBar - 50,
        backgroundColor: theme.palette.background.paper,
      }}
      minWidth={350}
      lockAspectRatio={true}
      bounds="window"
    >
      <Stack direction="row">
        <TabContext value={tabValue}>
          <Box
            boxShadow={3}
            sx={{
              bgcolor: "background.paper",
              p: 1,
              m: 1,
            }}
          >
            {" "}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="" variant="scrollable" scrollButtons="auto">
                <Tab value="keyboard" label="Keyboard" />
                <Tab value="modifiers" label="Modifiers" />
                {mouseKeysVisible && <Tab value="mouse" label="Mouse" />}
                <Tab value="language" label="Language" />
                <Tab value="control" label="Control" />
                {stenoKeysVisible && <Tab value="steno" label="Steno" />}
                {dynamicMacrosVisible && <Tab value="macros" label="Macros" />}
                {ledControlVisible && <Tab value="leds" label="LEDs" />}
                <Tab value="layers" label="Layers" />
                <Tab value="advanced" label="Advanced" />
              </TabList>
            </Box>
            <TabPanel value="keyboard">
              <Keyboard104 onKeySelect={onKeyChange} currentKeyCode={key.baseCode || key.code} keymap={keymap} />
            </TabPanel>
            <TabPanel value="modifiers">
              <Grid container spacing={0}>
                <Grid item xs>
                  <Modifiers {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />
              </Grid>
            </TabPanel>
            <TabPanel value="mouse">
              <Grid container spacing={0}>
                <Grid item xs>
                  <MouseMovementKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <MouseButtonKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <MouseWheelKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <MouseWarpKeys {...sharedProps} />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="language">
              <LanguageKeys {...sharedProps} />
            </TabPanel>
            <TabPanel value="control">
              <Grid container spacing={0}>
                <Grid item xs>
                  <MediaKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />
                <Grid item xs>
                  <VolumeKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <PlatformAppleKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <BrightnessKeys {...sharedProps} />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="steno">
              <StenoKeys {...sharedProps} />
            </TabPanel>
            <TabPanel value="macros">
              <Stack container spacing={0}>
                <DynamicMacroKeys {...sharedProps} />
                <MacroKeys {...sharedProps} />
              </Stack>
            </TabPanel>
            <TabPanel value="advanced">
              <Grid container spacing={0}>
                <Grid item xs>
                  <BlankKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <CustomKey {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <SpaceCadetKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <OneShotKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <TapDanceKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />
                <Grid item xs>
                  <LeaderKeys {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />
                <Grid item xs>
                  <SecondaryFunction {...sharedProps} />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="leds">
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Colormap {...sharedProps} />
                </Grid>
                <VerticalSectionDivider />

                <Grid item xs>
                  <LEDKeys {...sharedProps} />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="layers">
              <LayerKeys {...sharedProps} />
            </TabPanel>
          </Box>
        </TabContext>
      </Stack>
    </Rnd>
  );
};
