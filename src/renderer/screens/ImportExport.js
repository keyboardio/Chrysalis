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
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import { hideContextBar, showContextBar } from "@renderer/components/ContextBar";
import { GlobalContext } from "@renderer/components/GlobalContext";
import LoadingScreen from "@renderer/components/LoadingScreen";
import { PageTitle } from "@renderer/components/PageTitle";
import SaveChangesButton from "@renderer/components/SaveChangesButton";
import { toast } from "@renderer/components/Toast";
import useEffectOnce from "@renderer/hooks/useEffectOnce";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FloatingKeyPicker } from "./Editor/components/FloatingKeyPicker";
import { MacroStorageAlert } from "./Editor/components/MacroStorageAlert";
import { LayerNamesStorageAlert } from "./Editor/components/LayerNamesStorageAlert";
import OnlyCustomScreen from "./Editor/components/OnlyCustomScreen";
import MacroEditor from "./Editor/Macros/MacroEditor";
import Overview from "./Editor/Sidebar/Overview";

import LayoutSharing from "./Editor/Sidebar/LayoutSharing";
import { LayerCopyPaste } from "./Editor/Sidebar/LayerCopyPaste";

const db = new KeymapDB();

const Editor = (props) => {
  const globalContext = React.useContext(GlobalContext);
  const [activeDevice, _] = globalContext.state.activeDevice;

  const [colormap, setColormap] = useState({ palette: [], colorMap: [] });

  const [keymap, setKeymap] = useState({ custom: [], default: [], onlyCustom: false });

  const [copiedLayer, setCopiedLayer] = useState({ keymap: [], colorMap: [] });

  const [layerNames, setLayerNames] = useState({ storageSize: 0, names: [] });

  const [macros, setMacros] = useState(null);
  const [currentLedIndex, setCurrentLedIndex] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [openMacroEditor, setOpenMacroEditor] = useState(false);
  const [currentMacroId, setCurrentMacroId] = useState(0);
  const [currentMacroStep, setCurrentMacroStep] = useState(null);
  const [selectorKey, setSelectorKey] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

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
    setMacros(newMacros);

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
    setCurrentLayer(layer);

    const key = keymap.custom[layer][currentKeyIndex];
    setSelectorKey(key);
  };

  const onKeySelect = async (event) => {
    const target = event.currentTarget;
    const keyIndex = parseInt(target.getAttribute("data-key-index"));
    const ledIndex = parseInt(target.getAttribute("data-led-index"));
    setCurrentKeyIndex(keyIndex);
    setCurrentLedIndex(ledIndex);

    const key = keymap.custom[currentLayer][keyIndex];
    setSelectorKey(key);
    if (db.isInCategory(key, "dynmacros")) {
      const macroId = key.code - key.rangeStart;

      setCurrentMacroId(macroId);
    }
  };

  const onMacroEditorClose = async () => {
    const key = keymap.custom[currentLayer][currentKeyIndex];

    setSelectorKey(key);
    setOpenMacroEditor(false);
  };

  const onKeyChangeForKeymap = (keyCode) => {
    const newKeymap = { ...keymap };
    //      const oldKey =  newKeymap.custom[currentLayer][currentKeyIndex];
    const newKey = db.lookup(keyCode);
    newKeymap.custom[currentLayer][currentKeyIndex] = newKey;

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
    if (![MacroStep.TAP, MacroStep.KEYDOWN, MacroStep.KEYUP].includes(currStepType)) {
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
    setMacros(newMacros);
    setSelectorKey(newKey);
  };

  const onKeyChange = async (keyCode) => {
    if (openMacroEditor) {
      await onKeyChangeForMacros(keyCode);
    } else {
      onKeyChangeForKeymap(keyCode);
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
    setModified(true);
    setKeymap(updatedKeymap);

    showContextBar();
  };

  const onColormapAndPaletteChange = (newData) => {
    setModified(true);
    setColormap(newData);
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
      console.info("Custom keymap is empty, copying defaults");
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
    return copiedLayer.keymap.length > 0;
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
    console.error("Error applying layout editor changes", { error: error });
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
    console.info("Changes saved.");
    hideContextBar();
  };

  const copyLayer = (index) => {
    setCopiedLayer({
      keymap: keymap.custom[index].slice(0),
      colorMap: colormap?.colorMap[index]?.slice(0) || [],
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
    showContextBar();
  };

  if (loading) {
    return <LoadingScreen />;
  } else if (!keymap.onlyCustom) {
    return <OnlyCustomScreen />;
  }

  const KeymapSVG = activeDevice.focusDeviceDescriptor().components.keymap;

  const title = t("app.menu.importExport");

  const M = new Macros();
  const L = new LayerNames();

  return (
    <React.Fragment>
      <PageTitle title={title} />

      <h1>Coming soon!</h1>
      <h2>
        Import/Export functionality is not yet availabe in the browser-based version of Chrysalis. Nothing on this page
        will work.
      </h2>
      <Box component="main" sx={{ marginLeft: 20, marginRight: 50 }}>
        <LayoutSharing
          open={true}
          keymap={keymap}
          colormap={colormap}
          layer={currentLayer}
          onKeymapChange={onKeymapChange}
          onPaletteChange={onPaletteChange}
          onColormapChange={onColormapChange}
          onColormapAndPaletteChange={onColormapAndPaletteChange}
        />{" "}
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: 60, // Adjust for title bar or safe area
          right: 5,
          width: 250,
          height: "auto",
          zIndex: 1300, // Adjust the zIndex if necessary to bring the component above other elements
        }}
      >
        <>
          <Overview
            keymap={keymap}
            colormap={colormap}
            selectedKey={currentKeyIndex}
            selectedLed={currentLedIndex}
            layer={currentLayer}
            setLayer={onLayerChange}
            layerNames={layerNames}
            setLayerName={setLayerName}
          />
          <LayerCopyPaste
            layer={currentLayer}
            copyLayer={copyLayer}
            pasteLayer={pasteLayer}
            hasCopiedLayer={hasCopiedLayer}
          />
        </>
      </Box>
    </React.Fragment>
  );
};

export default Editor;
