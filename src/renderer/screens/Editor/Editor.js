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

import Focus from "@api/focus";
import { default as Keymap, KeymapDB } from "@api/keymap";
import Log from "@api/log";
import Box from "@mui/material/Box";
import {
  hideContextBar,
  showContextBar,
} from "@renderer/components/ContextBar";
import LoadingScreen from "@renderer/components/LoadingScreen";
import { PageTitle } from "@renderer/components/PageTitle";
import SaveChangesButton from "@renderer/components/SaveChangesButton";
import i18n from "@renderer/i18n";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FloatingKeyPicker } from "./components/FloatingKeyPicker";
import { LegacyAlert } from "./components/LegacyAlert";
import OnlyCustomScreen from "./components/OnlyCustomScreen";
import Sidebar, { sidebarWidth } from "./Sidebar";

const Store = require("electron-store");
const settings = new Store();

const db = new KeymapDB();
const focus = new Focus();
const logger = new Log();

const Editor = (props) => {
  const [colormap, setColormap] = useState({
    palette: [],
    colorMap: [],
  });

  const [keymap, setKeymap] = useState({
    custom: [],
    default: [],
    onlyCustom: false,
  });

  const [layout, _setLayout] = useState("English (US)");
  const [currentLedIndex, setCurrentLedIndex] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [hasLegacy, setHasLegacy] = useState(false);

  const initializeHostKeyboardLayout = async () => {
    const layoutSetting = await settings.get("keyboard.layout", "English (US)");
    db.setLayout(layoutSetting);
    _setLayout(layoutSetting);
  };

  const initialize = async () => {
    await scanKeyboard();
    await initializeHostKeyboardLayout();

    setLoading(false);
  };

  const setLayout = async (layout) => {
    db.setLayout(layout);

    let newKeymap = { ...keymap };
    newKeymap.custom = newKeymap.custom.map((layer) => {
      return layer.map((key) => {
        return db.lookup(key.code);
      });
    });
    _setLayout(layout);
    setKeymap(newKeymap);

    settings.set("keyboard.layout", layout);
  };

  const onKeySelect = (event) => {
    const target = event.currentTarget;
    const keyIndex = parseInt(target.getAttribute("data-key-index"));
    const ledIndex = parseInt(target.getAttribute("data-led-index"));
    setCurrentKeyIndex(keyIndex);
    setCurrentLedIndex(ledIndex);
  };

  const onKeyChange = (keyCode) => {
    let newKeymap = { ...keymap };
    //      const oldKey =  newKeymap.custom[currentLayer][currentKeyIndex];
    const newKey = db.lookup(keyCode);
    newKeymap.custom[currentLayer][currentKeyIndex] = newKey;

    if (hasLegacy) {
      const k = new Keymap();
      setHasLegacy(k.hasLegacyCodes(newKeymap.custom));
    }
    if (newKey.legacy) {
      setHasLegacy(true);
    }
    setModified(true);
    setKeymap(newKeymap);
    showContextBar();
  };

  const onLedChange = (index) => {
    let newColormap = { ...colormap };
    newColormap.colorMap[currentLayer][currentLedIndex] = index;
    setModified(true);
    setColormap(newColormap);

    showContextBar();
  };

  const onPaletteChange = (newPalette) => {
    let newColormap = { ...colormap };
    newColormap.palette = newPalette;
    setModified(true);
    setColormap(newColormap);

    showContextBar();
  };

  const onKeymapChange = (newKeymap) => {
    const k = new Keymap();
    let updatedKeymap = { ...keymap };
    updatedKeymap.custom = newKeymap;
    setHasLegacy(k.hasLegacyCodes(keymap.custom));
    setModified(true);
    setKeymap(updatedKeymap);

    showContextBar();
  };

  const onColormapChange = (newColormap) => {
    let newcolormap = { ...colormap };
    newcolormap.colorMap = newColormap;
    setModified(true);
    setColormap(newcolormap);

    showContextBar();
  };

  const updateEmptyKeymap = async (deviceKeymap) => {
    let empty = true;
    for (let layer of deviceKeymap.custom) {
      for (let i of layer) {
        if (i.code != 65535) {
          empty = false;
          break;
        }
      }
    }

    if (empty && !deviceKeymap.onlyCustom && deviceKeymap.custom.length > 0) {
      logger.log("Custom keymap is empty, copying defaults");
      for (let i = 0; i < deviceKeymap.default.length; i++) {
        deviceKeymap.custom[i] = deviceKeymap.default[i].slice();
      }
      deviceKeymap.onlyCustom = true;
      await focus.command("keymap", deviceKeymap);
    }
    return deviceKeymap;
  };

  const scanKeyboard = async () => {
    try {
      let deviceKeymap = await focus.command("keymap");

      deviceKeymap = await updateEmptyKeymap(deviceKeymap);

      let deviceColormap = await focus.command("colormap");
      const k = new Keymap();
      setHasLegacy(k.hasLegacyCodes(deviceKeymap.custom));
      setKeymap(deviceKeymap);
      setColormap(deviceColormap);
    } catch (e) {
      toast.error(e);
      props.onDisconnect();
    }
  };

  const hasKeymap = () => {
    return keymap.custom.length > 0;
  };

  const hasColormap = () => {
    return colormap.colorMap.length > 0;
  };

  useEffect(() => {
    const context_bar_channel = new BroadcastChannel("context_bar");

    context_bar_channel.onmessage = (event) => {
      if (event.data === "changes-discarded") {
        setLoading(true);
        initialize();
        setCurrentLayer(0);
        setModified(false);
      }
    };
    return () => {
      context_bar_channel.close();
    };
  });

  useEffect(() => {
    initialize();

    // code to run after render goes here
  }, []); // <-- empty array means 'run once'
  // TODO - react exhaustive-deps doesn't like this, but I'm not quite sure how to refactor it

  const onApply = async () => {
    await focus.command("keymap", keymap);
    await focus.command("colormap", colormap);
    setModified(false);

    logger.log("Changes saved.");
    hideContextBar();
  };

  const migrateLegacy = async () => {
    const k = new Keymap();
    let newKeymap = k.migrateLegacyCodes(keymap.custom);
    setHasLegacy(false);
    setModified(true);
    setKeymap({
      default: keymap.default,
      onlyCustom: keymap.onlyCustom,
      custom: newKeymap,
    });

    logger.log("Legacy keycodes migrated to new ones.");

    showContextBar();
  };

  if (loading) {
    return <LoadingScreen />;
  } else if (!keymap.onlyCustom) {
    return <OnlyCustomScreen />;
  }

  const KeymapSVG = focus.focusDeviceDescriptor.components.keymap;

  let title;
  if (hasColormap() && hasKeymap()) {
    title = i18n.t("app.menu.editor");
  } else if (hasKeymap()) {
    title = i18n.t("app.menu.layoutEditor");
  } else {
    title = i18n.t("app.menu.colormapEditor");
  }

  return (
    <React.Fragment>
      <PageTitle title={title} />

      {hasLegacy && <LegacyAlert migrateLegacy={migrateLegacy} />}
      <Box
        component="main"
        sx={{
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        <KeymapSVG
          className="layer"
          index={currentLayer}
          keymap={keymap?.custom[currentLayer]}
          onKeySelect={onKeySelect}
          selectedKey={currentKeyIndex}
          palette={colormap.palette}
          colormap={colormap.colorMap[currentLayer]}
        />
      </Box>
      <Sidebar
        keymap={keymap}
        colormap={colormap}
        selectedKey={currentKeyIndex}
        selectedLed={currentLedIndex}
        layer={currentLayer}
        layout={layout}
        setLayer={setCurrentLayer}
        setLayout={setLayout}
        onKeyChange={onKeyChange}
        onKeymapChange={onKeymapChange}
        onColormapChange={onColormapChange}
        onPaletteChange={onPaletteChange}
        onLedChange={onLedChange}
      />
      <FloatingKeyPicker
        sidebarWidth={sidebarWidth}
        onKeyChange={onKeyChange}
        keymap={keymap}
        currentKeyIndex={currentKeyIndex}
        currentLayer={currentLayer}
      />
      <SaveChangesButton floating onClick={onApply} disabled={!modified}>
        {i18n.t("components.save.saveChanges")}
      </SaveChangesButton>
    </React.Fragment>
  );
};

export default Editor;
