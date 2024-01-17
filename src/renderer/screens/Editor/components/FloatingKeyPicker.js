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

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { useWindowSize } from "@renderer/hooks/useWindowSize";
import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Keyboard104 from "../Keyboard104";
import PropTypes from "prop-types";
import MediaKeys from "../Sidebar/MediaKeys";
import VolumeKeys from "../Sidebar/VolumeKeys";
import { MouseWarpKeys } from "../Sidebar/MouseWarpKeys";
import { MouseWheelKeys } from "../Sidebar/MouseWheelKeys";
import { MouseMovementKeys } from "../Sidebar/MouseMovementKeys";
import { MouseButtonKeys } from "../Sidebar/MouseButtonKeys";
import StenoKeys from "../Sidebar/StenoKeys";
import DynamicMacroKeys from "../Sidebar/DynamicMacroKeys";
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";

import VerticalSectionDivider from "./VerticalSectionDivider";
const fkp_channel = new BroadcastChannel("floating-key-picker");

export const FloatingKeyPicker = (props) => {
  const { sidebarWidth, onKeyChange, keymap } = props;
  const key = props.currentKey;

  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(300);
  const [x, setX] = useState((window.innerWidth - sidebarWidth) / 2 - width / 2);
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

  const mouseKeysVisible = false;
  //usePluginVisibility("MouseKeys");
  const stenoKeysVisible = usePluginVisibility("GeminiPR");
  const dynamicMacrosVisible = usePluginVisibility("DynamicMacros");

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
  };

  return (
    <Rnd
      size={{ width: width, height: height }}
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
      }}
      minWidth={400}
      lockAspectRatio={true}
      bounds="window"
    >
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
            <TabList onChange={handleTabChange} aria-label="">
              <Tab value="keyboard" label="Keyboard" display={true} />
              <Tab value="mouse" label="Mouse" display={mouseKeysVisible} />
              <Tab value="media" label="Media" display={true} />
              <Tab value="steno" label="Steno" display={stenoKeysVisible} />
              <Tab value="macros" label="Macros" display={dynamicMacrosVisible} />
            </TabList>
          </Box>
          <TabPanel value="keyboard" display={true}>
            <Keyboard104 onKeySelect={onKeyChange} currentKeyCode={key.baseCode || key.code} keymap={keymap} />
          </TabPanel>
          <TabPanel value="mouse" display={mouseKeysVisible}>
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
          <TabPanel value="media" display={true}>
            <Grid container spacing={0}>
              <Grid item xs>
                <MediaKeys {...sharedProps} />
              </Grid>
              <VerticalSectionDivider />
              <Grid item xs>
                <VolumeKeys {...sharedProps} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="steno" display={stenoKeysVisible}>
            <StenoKeys {...sharedProps} />
          </TabPanel>
          <TabPanel value="macros" display={dynamicMacrosVisible}>
            <DynamicMacroKeys {...sharedProps} />
          </TabPanel>
        </Box>
      </TabContext>
    </Rnd>
  );
};
