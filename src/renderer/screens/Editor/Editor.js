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
import Keymap from "@api/focus/keymap";
import KeymapDB from "@api/focus/keymap/db";
import Macros, { Step as MacroStep } from "@api/focus/macros";
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
import { MacroStorageAlert } from "./components/MacroStorageAlert";
import OnlyCustomScreen from "./components/OnlyCustomScreen";
import MacroEditor from "./Macros/MacroEditor";
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
  const [currentLedIndex, setCurrentLedIndex] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [modified, setModified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [hasLegacy, setHasLegacy] = useState(false);
  const [openMacroEditor, setOpenMacroEditor] = useState(false);
  const [currentMacroId, setCurrentMacroId] = useState(0);
  const [currentMacroStep, setCurrentMacroStep] = useState(null);
  const [selectorKey, setSelectorKey] = useState(null);

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

  const initialize = async () => {
    await scanKeyboard();

    setLoading(false);
  };

  const onKeySelect = async (event) => {
    const target = event.currentTarget;
    const keyIndex = parseInt(target.getAttribute("data-key-index"));
    const ledIndex = parseInt(target.getAttribute("data-led-index"));
    await setCurrentKeyIndex(keyIndex);
    await setCurrentLedIndex(ledIndex);

    const key = keymap.custom[currentLayer][keyIndex];
    await setSelectorKey(key);
    if (db.isInCategory(key, "dynmacros")) {
      const macroId = key.code - key.rangeStart;

      await setCurrentMacroId(macroId);
    }
  };

  const onMacroEditorClose = async () => {
    const key = keymap.custom[currentLayer][currentKeyIndex];

    await setSelectorKey(key);
    await setOpenMacroEditor(false);
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

      const defLayer = await focus.command("settings.defaultLayer");
      if (defLayer <= deviceKeymap.custom.length) setCurrentLayer(defLayer);
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
    await focus.command("macros", macros);

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
  const saveChangesDisabled =
    !modified || M.getStoredSize(macros) > macros.storageSize;

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
        setLayer={setCurrentLayer}
        onKeyChange={onKeyChange}
        onKeymapChange={onKeymapChange}
        onColormapChange={onColormapChange}
        onPaletteChange={onPaletteChange}
        onLedChange={onLedChange}
        setOpenMacroEditor={maybeOpenMacroEditor}
        currentKey={currentKey}
      />
      <FloatingKeyPicker
        sidebarWidth={sidebarWidth}
        onKeyChange={onKeyChange}
        keymap={keymap}
        currentKey={currentKey}
      />
      <SaveChangesButton
        floating
        onClick={onApply}
        disabled={saveChangesDisabled}
      >
        {t("components.save.saveChanges")}
      </SaveChangesButton>
    </React.Fragment>
  );
};

export default Editor;
