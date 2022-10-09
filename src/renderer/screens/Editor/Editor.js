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

import Keymap from "@api/focus/keymap";
import KeymapDB from "@api/focus/keymap/db";
import Macros, { Step as MacroStep } from "@api/focus/macros";
import LayerNames from "@api/focus/layernames";
import { logger } from "@api/log";
import Box from "@mui/material/Box";
import {
  hideContextBar,
  showContextBar,
} from "@renderer/components/ContextBar";
import { GlobalContext } from "@renderer/components/GlobalContext";
import LoadingScreen from "@renderer/components/LoadingScreen";
import { PageTitle } from "@renderer/components/PageTitle";
import SaveChangesButton from "@renderer/components/SaveChangesButton";
import { toast } from "@renderer/components/Toast";
import useEffectOnce from "@renderer/hooks/useEffectOnce";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToolBox } from "./ToolBox";
import { FloatingKeyPicker } from "./components/FloatingKeyPicker";
import { LegacyAlert } from "./components/LegacyAlert";
import { MacroStorageAlert } from "./components/MacroStorageAlert";
import { LayerNamesStorageAlert } from "./components/LayerNamesStorageAlert";
import OnlyCustomScreen from "./components/OnlyCustomScreen";
import MacroEditor from "./Macros/MacroEditor";
import Sidebar, { sidebarWidth } from "./Sidebar";

const db = new KeymapDB();

const Editor = (props) => {
  const globalContext = React.useContext(GlobalContext);
  const [activeDevice, _] = globalContext.state.activeDevice;

  const [colormap, setColormap] = useState({
    palette: [],
    colorMap: [],
  });

  const [keymap, setKeymap] = useState({
    custom: [],
    default: [],
    onlyCustom: false,
  });

  const [copiedLayer, setCopiedLayer] = useState({
    keymap: [],
    colorMap: [],
  });

  const [layerNames, setLayerNames] = useState({
    storageSize: 0,
    names: [],
  });

  const [macros, setMacros] = useState(null);
  const [currentLedIndex, setCurrentLedIndex] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState(15);
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [hasLegacy, setHasLegacy] = useState(false);
  const [openMacroEditor, setOpenMacroEditor] = useState(false);
  const [currentMacroId, setCurrentMacroId] = useState(0);
  const [currentMacroStep, setCurrentMacroStep] = useState(null);
  const [selectorKey, setSelectorKey] = useState(null);
  const [tool, setTool] = useState("select");

  const { t } = useTranslation();

  const maybeOpenMacroEditor = (state) => {
    if (macros.storageSize == 0) return;
    setOpenMacroEditor(state);
  };

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

  const setLayerName = async (index, name) => {
    const newNames = [].concat(layerNames.names);
    newNames[index] = name;

    setLayerNames({
      storageSize: layerNames.storageSize,
      names: newNames,
    });
    setModified(true);
    showContextBar();
  };

  const initialize = async () => {
    await scanKeyboard();

    setLoading(false);
  };

  const onLayerChange = async (layer) => {
    await setCurrentLayer(layer);

    const key = keymap.custom[layer][currentKeyIndex];
    await setSelectorKey(key);
  };

  const onKeySelect = async (event) => {
    const target = event.currentTarget;
    const keyIndex = parseInt(target.getAttribute("data-key-index"));
    const ledIndex = parseInt(target.getAttribute("data-led-index"));
    await setCurrentKeyIndex(keyIndex);
    await setCurrentLedIndex(ledIndex);

    if (tool == "select") {
      const key = keymap.custom[currentLayer][keyIndex];
      await setSelectorKey(key);
      if (db.isInCategory(key, "dynmacros")) {
        const macroId = key.code - key.rangeStart;

        await setCurrentMacroId(macroId);
      }
    } else if (tool == "eraser") {
      if (hasColormap()) {
        const newColormap = { ...colormap };
        newColormap.colorMap[currentLayer][ledIndex] = 15;
        setColormap(newColormap);
      }

      if (hasKeymap()) {
        const newKeymap = { ...keymap };
        const newKey = db.lookup(65535);
        newKeymap.custom[currentLayer][keyIndex] = newKey;
        setSelectorKey(newKey);
        setKeymap(newKeymap);
      }

      setModified(true);
      showContextBar();
    } else if (tool == "color-paint") {
      const newColormap = { ...colormap };
      newColormap.colorMap[currentLayer][ledIndex] = currentPaletteIndex;
      setModified(true);
      setColormap(newColormap);

      showContextBar();
    }
  };

  const onMacroEditorClose = async () => {
    const key = keymap.custom[currentLayer][currentKeyIndex];

    await setSelectorKey(key);
    await setOpenMacroEditor(false);
  };

  const onKeyChangeForKeymap = (keyCode) => {
    const newKeymap = { ...keymap };
    const newKey = db.lookup(keyCode);
    newKeymap.custom[currentLayer][currentKeyIndex] = newKey;

    if (hasLegacy) {
      const k = new Keymap();
      setHasLegacy(k.hasLegacyCodes(newKeymap.custom));
    }
    if (newKey.legacy) {
      setHasLegacy(true);
    }

    setSelectorKey(newKey);
    setKeymap(newKeymap);

    if (db.isInCategory(newKey, "dynmacros")) {
      const macroId = newKey.code - newKey.rangeStart;

      setCurrentMacroId(macroId);
      maybeOpenMacroEditor(true);
    }
  };

  const onKeyChangeForMacros = async (keyCode) => {
    const currStepType = macros.macros[currentMacroId][currentMacroStep].type;
    if (
      ![MacroStep.TAP, MacroStep.KEYDOWN, MacroStep.KEYUP].includes(
        currStepType
      )
    ) {
      return;
    }

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
    setCurrentPaletteIndex(index);
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
        if (i.code != db.constants.codes.EMPTY) {
          empty = false;
          break;
        }
      }
    }

    if (empty && !deviceKeymap.onlyCustom && deviceKeymap.custom.length > 0) {
      logger().info("Custom keymap is empty, copying defaults");
      for (let i = 0; i < deviceKeymap.default.length; i++) {
        deviceKeymap.custom[i] = deviceKeymap.default[i].slice();
      }
      deviceKeymap.onlyCustom = true;
      await activeDevice.keymap(deviceKeymap);
    }
    return deviceKeymap;
  };

  const scanKeyboard = async () => {
    try {
      let deviceKeymap = await activeDevice.keymap();
      deviceKeymap = await updateEmptyKeymap(deviceKeymap);
      const deviceColormap = await activeDevice.colormap();
      const k = new Keymap();
      setHasLegacy(k.hasLegacyCodes(deviceKeymap.custom));
      setKeymap(deviceKeymap);
      setColormap(deviceColormap);

      const deviceMacros = await activeDevice.macros();
      setMacros(deviceMacros);

      const defLayer = await activeDevice.defaultLayer();
      if (defLayer <= deviceKeymap.custom.length) setCurrentLayer(defLayer);

      const deviceLayerNames = await activeDevice.layernames();
      if (deviceLayerNames) {
        // We set up default names for the layers here, so that they're easily
        // editable, without having to keep track of whether it is a default
        // name we're editing, or a custom one.
        const names = Array(deviceKeymap.custom.length)
          .fill()
          .map((_, i) => deviceLayerNames.names[i] || `#${i}`);
        setLayerNames({
          storageSize: deviceLayerNames.storageSize,
          names: names,
        });
      }
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

  const hasCopiedLayer = () => {
    return copiedLayer.keymap.length > 0 && copiedLayer.colorMap.length > 0;
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

  const onApplyError = async (error) => {
    logger().error("Error applying layout editor changes", { error: error });
    toast.error(error);

    hideContextBar();
    props.onDisconnect();
  };

  const onApply = async () => {
    await activeDevice.keymap(keymap);
    await activeDevice.colormap(colormap);
    await activeDevice.macros(macros);
    await activeDevice.layernames(layerNames);

    setModified(false);
    logger().info("Changes saved.");
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

    logger().info("Legacy keycodes migrated to new ones.");

    showContextBar();
  };

  const copyLayer = (index) => {
    setCopiedLayer({
      keymap: keymap.custom[index].slice(0),
      colorMap: colormap.colorMap[index].slice(0),
    });
  };

  const pasteLayer = () => {
    if (!hasCopiedLayer()) return;

    const newKeymap = { ...keymap };
    newKeymap.custom[currentLayer] = copiedLayer.keymap;

    const newColormap = { ...colormap };
    newColormap.colorMap[currentLayer] = copiedLayer.colorMap;

    setKeymap(newKeymap);
    setColormap(newColormap);

    setCopiedLayer({
      keymap: [],
      colorMap: [],
    });

    setModified(true);
  };

  if (loading) {
    return <LoadingScreen />;
  } else if (!keymap.onlyCustom) {
    return <OnlyCustomScreen />;
  }

  const KeymapSVG = activeDevice.focusDeviceDescriptor().components.keymap;

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

  const currentKey =
    selectorKey || keymap.custom[currentLayer][currentKeyIndex];

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
        currentKey={currentKey}
        setSelectorKey={setSelectorKey}
      />
    );
  } else {
    mainWidget = (
      <KeymapSVG
        className="layer"
        layerNames={layerNames}
        index={currentLayer}
        keymap={keymap?.custom[currentLayer]}
        onKeySelect={onKeySelect}
        selectedKey={currentKeyIndex}
        palette={colormap.palette}
        colormap={colormap.colorMap[currentLayer]}
      />
    );
  }

  const M = new Macros();
  const L = new LayerNames();
  const saveChangesDisabled =
    !modified ||
    M.getStoredSize(macros) > macros.storageSize ||
    (layerNames.storageSize > 0 &&
      L.getStoredSize(layerNames) > layerNames.storageSize);

  return (
    <React.Fragment>
      <PageTitle title={title} />

      {hasLegacy && <LegacyAlert migrateLegacy={migrateLegacy} />}
      {macros && <MacroStorageAlert macros={macros} />}
      <Box
        component="main"
        sx={{
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        {layerNames.storageSize > 0 && (
          <LayerNamesStorageAlert layerNames={layerNames} />
        )}
        <ToolBox setTool={setTool} tool={tool} hasColormap={hasColormap()} />
        {mainWidget}
      </Box>
      <Sidebar
        macroEditorOpen={openMacroEditor}
        macros={macros}
        keymap={keymap}
        colormap={colormap}
        selectedKey={currentKeyIndex}
        selectedLed={currentLedIndex}
        layer={currentLayer}
        setLayer={onLayerChange}
        copyLayer={copyLayer}
        hasCopiedLayer={hasCopiedLayer}
        pasteLayer={pasteLayer}
        layerNames={layerNames}
        setLayerName={setLayerName}
        onKeyChange={onKeyChange}
        onKeymapChange={onKeymapChange}
        onColormapChange={onColormapChange}
        onPaletteChange={onPaletteChange}
        onLedChange={onLedChange}
        setOpenMacroEditor={maybeOpenMacroEditor}
        currentKey={currentKey}
      />
      {tool == "select" && (
        <FloatingKeyPicker
          sidebarWidth={sidebarWidth}
          onKeyChange={onKeyChange}
          keymap={keymap}
          currentKey={currentKey}
        />
      )}
      <SaveChangesButton
        onClick={onApply}
        onError={onApplyError}
        disabled={saveChangesDisabled}
      >
        {t("components.save.saveChanges")}
      </SaveChangesButton>
    </React.Fragment>
  );
};

export default Editor;
