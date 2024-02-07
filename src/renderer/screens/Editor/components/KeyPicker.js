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
import TextField from "@mui/material/TextField";
import { useWindowSize } from "@renderer/hooks/useWindowSize";
import React, { useState, useEffect } from "react";
import Keyboard104 from "../Keyboard104";
import { MouseWarpKeys } from "../Sidebar/MouseWarpKeys";
import DynamicMacroKeys from "../Sidebar/DynamicMacroKeys";
import usePluginAvailable from "@renderer/hooks/usePluginVisibility";
import KeymapDB from "@api/focus/keymap/db";
import KeyButton from "../components/KeyButton";
import VerticalSectionDivider from "./VerticalSectionDivider";
import Colormap from "../Sidebar/Colormap";
import LayerKeys from "../Sidebar/LayerKeys";
import SecondaryFunction from "../Sidebar/SecondaryFunction";
import Modifiers from "../Sidebar/Modifiers";
import SpecialModifiers from "../Sidebar/SpecialModifiers";
import FKPCategorySelector from "../components/FKPCategorySelector";
import { useTranslation } from "react-i18next";
import { constants } from "@api/focus/keymap/db/constants";
const fkp_channel = new BroadcastChannel("floating-key-picker");

export const KeyPicker = (props) => {
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
  const [tabValue, setTabValue] = React.useState("keyboard");
  const { t } = useTranslation();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const db = new KeymapDB();

  const mouseKeysAvailable = usePluginAvailable("MouseKeys");
  const dynamicMacrosAvailable = usePluginAvailable("DynamicMacros");
  const oneShotMetaDisabled = !usePluginAvailable("OneShotMetaKeys");
  const ledKeysDisabled = !props.colormap || props.colormap.palette.length == 0;
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
    <Stack direction="row">
      <TabContext value={tabValue}>
        <Box boxShadow={3} sx={{ bgcolor: "background.paper", width: "100%", px: 1 }}>
          {" "}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="" variant="scrollable" scrollButtons="auto">
              <Tab value="keyboard" label="Keyboard" />
              <Tab value="modifiers" label="Modifiers" />
              <Tab value="mouse" label="Mouse" disabled={!mouseKeysAvailable} />
              <Tab value="language" label="Language" />
              <Tab value="control" label="Control" />
              <Tab value="macros" label="Macros" disabled={!dynamicMacrosAvailable} />
              <Tab value="leds" label="LEDs" disabled={ledKeysDisabled} />
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
              <Grid item xs>
                <SpecialModifiers {...sharedProps} />
                <VerticalSectionDivider />
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs>
                <FKPCategorySelector category="oneshot" plugin="OneShot" {...sharedProps}>
                  <KeyButton
                    keyObj={db.lookup(db.constants.codes.ONESHOT_CANCEL)}
                    onKeyChange={props.onKeyChange}
                    title={t("editor.sidebar.oneshot.cancelStickyKey.tooltip")}
                    keycapSize="1u"
                  />
                  <KeyButton
                    keyObj={db.lookup(db.constants.codes.ONESHOT_META_STICKY)}
                    onKeyChange={props.onKeyChange}
                    title={t("editor.sidebar.oneshotMetaKeys.metaStickyKey.tooltip")}
                    keycapSize="1u"
                    disabled={oneShotMetaDisabled}
                  />
                  <KeyButton
                    keyObj={db.lookup(db.constants.codes.ONESHOT_ACTIVE_STICKY)}
                    onKeyChange={props.onKeyChange}
                    title={t("editor.sidebar.oneshotMetaKeys.activeStickyKey.tooltip")}
                    keycapSize="1u"
                    disabled={oneShotMetaDisabled}
                  />
                </FKPCategorySelector>
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs>
                <SecondaryFunction {...sharedProps} />
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs>
                <FKPCategorySelector category="spacecadet" plugin="SpaceCadet" {...sharedProps} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="mouse">
            <Grid container spacing={0}>
              <Grid item xs>
                <FKPCategorySelector
                  category="mousekeys.movement"
                  keyCodes={[
                    constants.codes.MOUSE_MOVE_UP,
                    constants.codes.MOUSE_MOVE_LEFT,
                    constants.codes.MOUSE_MOVE_DOWN,
                    constants.codes.MOUSE_MOVE_RIGHT,
                  ]}
                  {...sharedProps}
                />
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs>
                <FKPCategorySelector
                  category="mousekeys.buttons"
                  keyCodes={[
                    constants.codes.MOUSE_BUTTON_LEFT,
                    constants.codes.MOUSE_BUTTON_MIDDLE,
                    constants.codes.MOUSE_BUTTON_RIGHT,
                    constants.codes.MOUSE_BUTTON_BACK,
                    constants.codes.MOUSE_BUTTON_FORWARD,
                  ]}
                  {...sharedProps}
                />
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs>
                <FKPCategorySelector
                  category="mousekeys.wheel"
                  keyCodes={[
                    constants.codes.MOUSE_WHEEL_UP,
                    constants.codes.MOUSE_WHEEL_DOWN,
                    constants.codes.MOUSE_WHEEL_LEFT,
                    constants.codes.MOUSE_WHEEL_RIGHT,
                  ]}
                  {...sharedProps}
                />
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs>
                <MouseWarpKeys {...sharedProps} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="language">
            <Grid container spacing={0}>
              <Grid item xs>
                <FKPCategorySelector category="lang_intl" {...sharedProps} />
              </Grid>
              <VerticalSectionDivider />
              <Grid item xs>
                <FKPCategorySelector
                  category="steno"
                  plugin="GeminiPR"
                  disabledInMacroEditor={true}
                  minButtonWidth={40}
                  {...sharedProps}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="control">
            <Grid container spacing={0}>
              <Grid item xs>
                <FKPCategorySelector
                  category="media"
                  {...sharedProps}
                  keyCodes={[
                    constants.codes.CONSUMER_MEDIA_PREV_TRACK,
                    constants.codes.CONSUMER_MEDIA_NEXT_TRACK,
                    constants.codes.CONSUMER_MEDIA_STOP,
                    constants.codes.CONSUMER_MEDIA_PLAY_PAUSE,
                  ]}
                />
              </Grid>
              <VerticalSectionDivider />
              <Grid item xs>
                <FKPCategorySelector
                  category="volume"
                  {...sharedProps}
                  keyCodes={[
                    constants.codes.CONSUMER_MEDIA_MUTE,
                    constants.codes.CONSUMER_MEDIA_VOLUME_UP,
                    constants.codes.CONSUMER_MEDIA_VOLUME_DOWN,
                  ]}
                />
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs>
                <FKPCategorySelector category="platform_apple" {...sharedProps} />
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs>
                <FKPCategorySelector
                  category="consumer.brightness"
                  keyCodes={[constants.codes.CONSUMER_BRIGHTNESS_UP, constants.codes.CONSUMER_BRIGHTNESS_DOWN]}
                  {...sharedProps}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="macros">
            <Grid container spacing={0}>
              <Grid item xs>
                <DynamicMacroKeys {...sharedProps} />
              </Grid>
              <VerticalSectionDivider />
              <Grid item xs>
                <FKPCategorySelector plugin="Macros" category="macros" {...sharedProps} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="advanced">
            <Grid container spacing={0}>
              <Grid item xs>
                <FKPCategorySelector category="blanks" {...sharedProps} />
              </Grid>
              <VerticalSectionDivider />
              <Grid item xs>
                <FKPCategorySelector category="custom" {...sharedProps}>
                  <div>
                    <TextField
                      label={t("editor.sidebar.custom.label")}
                      variant="outlined"
                      min={0}
                      max={65535}
                      value={props.currentKey.code}
                      onChange={(event) => {
                        let value = parseInt(event.target.value);
                        if (value < 0) {
                          value = 65535;
                        }
                        if (value > 65535) {
                          value = 0;
                        }
                        props.onKeyChange(value);
                      }}
                    />
                  </div>
                </FKPCategorySelector>
              </Grid>

              <VerticalSectionDivider />

              <Grid item xs>
                <FKPCategorySelector
                  category="tapdance"
                  plugin="TapDance"
                  disabledInMacroEditor={true}
                  {...sharedProps}
                />
              </Grid>
              <VerticalSectionDivider />
              <Grid item xs>
                <FKPCategorySelector category="leader" plugin="Leader" {...sharedProps} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="leds">
            <Grid container spacing={2}>
              <Grid item xs>
                <FKPCategorySelector category="ledkeys" disabled={ledKeysDisabled} {...sharedProps} />
              </Grid>
              <VerticalSectionDivider />

              <Grid item xs={9}>
                <Colormap {...sharedProps} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="layers">
            <LayerKeys {...sharedProps} />
          </TabPanel>
        </Box>
      </TabContext>
    </Stack>
  );
};
