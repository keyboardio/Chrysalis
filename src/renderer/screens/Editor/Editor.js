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
import { toast } from "@renderer/components/Toast";
import useEffectOnce from "@renderer/hooks/useEffectOnce";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FloatingKeyPicker } from "./components/FloatingKeyPicker";
import { LegacyAlert } from "./components/LegacyAlert";
import MacroEditor from "./Macros/MacroEditor";
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

  const [macros, setMacros] = useState(null);

  const [layout, _setLayout] = useState("English (US)");
  const [currentLedIndex, setCurrentLedIndex] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [hasLegacy, setHasLegacy] = useState(false);
  const [openMacroEditor, setOpenMacroEditor] = useState(false);
  const [currentMacroId, setCurrentMacroId] = useState(null);
  const [currentMacroStep, setCurrentMacroStep] = useState(null);
  const [selectorKey, setSelectorKey] = useState(null);

  const { t } = useTranslation();

  const onMacroChange = async (id, macro) => {
    const newMacros = {
      storageSize: macros.storageSize,
      macros: macros.macros.map((m, index) => {
        if (index == id) return macro;
        return m;
      }),
    };
    await setMacros(newMacros);

    setModified(true);
    showContextBar();
  };

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

    const newKeymap = { ...keymap };
    newKeymap.custom = newKeymap.custom.map((layer) => {
      return layer.map((key) => {
        return db.lookup(key.code);
      });
    });
    _setLayout(layout);
    setKeymap(newKeymap);

    settings.set("keyboard.layout", layout);
  };

  const onKeySelect = async (event) => {
    const target = event.currentTarget;
    const keyIndex = parseInt(target.getAttribute("data-key-index"));
    const ledIndex = parseInt(target.getAttribute("data-led-index"));
    await setCurrentKeyIndex(keyIndex);
    await setCurrentLedIndex(ledIndex);

    const key = keymap.custom[currentLayer][keyIndex];
    await setSelectorKey(key);
    if (db.isInCategory(key, "macros")) {
      const macroId = key.code - key.rangeStart;

      await setCurrentMacroId(macroId);
      await setOpenMacroEditor(true);
    }
  };

  const onMacroEditorClose = () => {
    setOpenMacroEditor(false);
  };

  const onKeyChangeForKeymap = (keyCode) => {
    const newKeymap = { ...keymap };
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
    setKeymap(newKeymap);
  };

  const onKeyChangeForMacros = async (keyCode) => {
    const newKey = db.lookup(keyCode);
    const macro = macros.macros[currentMacroId].map((step, index) => {
      if (index == currentMacroStep) {
        const newStep = Object.assign({}, step);
        newStep.value = newKey;
        return newStep;
      }
      return Object.assign({}, step);
    });
    const newMacros = {
      storageSize: macros.storageSize,
      macros: macros.macros.map((m, index) => {
        if (index == currentMacroId) return macro;
        return m;
      }),
    };
    await setMacros(newMacros);
    await setSelectorKey(newKey);
  };

  const onKeyChange = async (keyCode) => {
    if (openMacroEditor) {
      await onKeyChangeForMacros(keyCode);
    } else {
      await onKeyChangeForKeymap(keyCode);
    }

    setModified(true);
    showContextBar();
  };

  const onLedChange = (index) => {
    const newColormap = { ...colormap };
    newColormap.colorMap[currentLayer][currentLedIndex] = index;
    setModified(true);
    setColormap(newColormap);

    showContextBar();
  };

  const onPaletteChange = (newPalette) => {
    const newColormap = { ...colormap };
    newColormap.palette = newPalette;
    setModified(true);
    setColormap(newColormap);

    showContextBar();
  };

  const onKeymapChange = (newKeymap) => {
    const k = new Keymap();
    const updatedKeymap = { ...keymap };
    updatedKeymap.custom = newKeymap;
    setHasLegacy(k.hasLegacyCodes(keymap.custom));
    setModified(true);
    setKeymap(updatedKeymap);

    showContextBar();
  };

  const onColormapChange = (newColormap) => {
    const newcolormap = { ...colormap };
    newcolormap.colorMap = newColormap;
    setModified(true);
    setColormap(newcolormap);

    showContextBar();
  };

  const updateEmptyKeymap = async (deviceKeymap) => {
    let empty = true;
    for (const layer of deviceKeymap.custom) {
      for (const i of layer) {
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
      const deviceColormap = await focus.command("colormap");
      const k = new Keymap();
      setHasLegacy(k.hasLegacyCodes(deviceKeymap.custom));
      setKeymap(deviceKeymap);
      setColormap(deviceColormap);

      const deviceMacros = await focus.command("macros");
      setMacros(deviceMacros);
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

  useEffectOnce(() => {
    initialize();
  });

  const onApply = async () => {
    await focus.command("keymap", keymap);
    await focus.command("colormap", colormap);

    // TODO(algernon): Reenable this once we're done
    //await focus.command("macros", macros);
    console.log("macros:", macros);
    setModified(false);

    logger.log("Changes saved.");
    hideContextBar();
  };

  const migrateLegacy = async () => {
    const k = new Keymap();
    const newKeymap = k.migrateLegacyCodes(keymap.custom);
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
  if (openMacroEditor) {
    title = t("app.menu.macroEditor");
  } else if (hasColormap() && hasKeymap()) {
    title = t("app.menu.editor");
  } else if (hasKeymap()) {
    title = t("app.menu.layoutEditor");
  } else {
    title = t("app.menu.colormapEditor");
  }

  let mainWidget;
  if (openMacroEditor) {
    mainWidget = (
      <MacroEditor
        onClose={onMacroEditorClose}
        onMacroChange={onMacroChange}
        macroId={currentMacroId}
        macro={macros.macros[currentMacroId]}
        macroStep={currentMacroStep}
        setMacroStep={setCurrentMacroStep}
        setSelectorKey={setSelectorKey}
      />
    );
  } else {
    mainWidget = (
      <KeymapSVG
        className="layer"
        index={currentLayer}
        keymap={keymap?.custom[currentLayer]}
        onKeySelect={onKeySelect}
        selectedKey={currentKeyIndex}
        palette={colormap.palette}
        colormap={colormap.colorMap[currentLayer]}
      />
    );
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
        {mainWidget}
      </Box>
      <Sidebar
        macros={macros}
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
        currentKey={selectorKey}
      />
      <SaveChangesButton floating onClick={onApply} disabled={!modified}>
        {t("components.save.saveChanges")}
      </SaveChangesButton>
    </React.Fragment>
  );
};

export default Editor;
