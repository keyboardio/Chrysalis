import { LegacyAlert } from "./components/LegacyAlert";
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

import Box from "@mui/material/Box";

import { toast } from "react-toastify";

const Store = require("electron-store");
const settings = new Store();

import Focus from "../../../api/focus";
import Log from "../../../api/log";
import { KeymapDB, default as Keymap } from "@api/keymap";

import Sidebar, { sidebarWidth } from "./Sidebar";

import SaveChangesButton from "../../components/SaveChangesButton";
import { PageTitle } from "../../components/PageTitle";
import i18n from "../../i18n";
import LoadingScreen from "../../components/LoadingScreen";
import OnlyCustomScreen from "./components/OnlyCustomScreen";

import {
  showContextBar,
  hideContextBar,
} from "@renderer/components/ContextBar";

const db = new KeymapDB();
const context_bar_channel = new BroadcastChannel("context_bar");

class Editor extends React.Component {
  state = {
    loading: true,
    currentLayer: 0,
    currentKeyIndex: 0,
    currentLedIndex: 0,
    keymap: {
      custom: [],
      default: [],
      onlyCustom: false,
    },
    colorMap: {
      palette: [],
      colorMap: [],
    },
    modified: false,
    hasLegacy: false,
    layout: "English (US)",
  };
  keymapDB = new KeymapDB();

  setLayer = (layer) => {
    this.setState({ currentLayer: layer });
  };
  selectKey = (keyIndex, ledIndex) => {
    this.setState({
      currentKeyIndex: keyIndex,
      currentLedIndex: ledIndex,
    });
  };

  setLayout = async (layout) => {
    db.setLayout(layout);

    this.setState((state) => {
      let newKeymap = state.keymap;
      newKeymap.custom = newKeymap.custom.map((layer) => {
        return layer.map((key) => {
          return db.lookup(key.code);
        });
      });

      return {
        layout: layout,
        keymap: newKeymap,
      };
    });
    await settings.set("keyboard.layout", layout);
  };

  onKeySelect = (event) => {
    const target = event.currentTarget;
    const keyIndex = parseInt(target.getAttribute("data-key-index"));
    const ledIndex = parseInt(target.getAttribute("data-led-index"));

    this.selectKey(keyIndex, ledIndex);
  };

  onKeyChange = (keyCode) => {
    this.setState((state) => {
      let newKeymap = state.keymap;
      const oldKey =
        newKeymap.custom[state.currentLayer][state.currentKeyIndex];
      const newKey = db.lookup(keyCode);
      newKeymap.custom[state.currentLayer][state.currentKeyIndex] = newKey;
      let hasLegacy = state.hasLegacy;

      if (hasLegacy) {
        const k = new Keymap();
        hasLegacy = k.hasLegacyCodes(newKeymap.custom);
      }
      if (newKey.legacy) {
        hasLegacy = true;
      }

      return {
        modified: true,
        hasLegacy: hasLegacy,
        keymap: newKeymap,
      };
    });
    showContextBar();
  };

  onLedChange = (index) => {
    this.setState((state) => {
      let newColormap = state.colormap;
      newColormap.colorMap[state.currentLayer][state.currentLedIndex] = index;

      return {
        modified: true,
        colormap: newColormap,
      };
    });

    showContextBar();
  };

  onPaletteChange = (newPalette) => {
    this.setState((state) => {
      let colormap = state.colormap;
      colormap.palette = newPalette;

      return {
        modified: true,
        colormap: colormap,
      };
    });

    showContextBar();
  };

  onKeymapChange = (newKeymap) => {
    const k = new Keymap();
    this.setState((state) => {
      let keymap = state.keymap;
      keymap.custom = newKeymap;

      return {
        modified: true,
        hasLegacy: k.hasLegacyCodes(keymap.custom),
        keymap: keymap,
      };
    });

    showContextBar();
  };

  onColormapChange = (newColormap) => {
    this.setState((state) => {
      let colormap = state.colormap;
      colormap.colorMap = newColormap;

      return {
        modified: true,
        colormap: colormap,
      };
    });

    showContextBar();
  };

  scanKeyboard = async () => {
    let focus = new Focus();
    let logger = new Log();

    try {
      let keymap = await focus.command("keymap");

      let empty = true;
      for (let layer of keymap.custom) {
        for (let i of layer) {
          if (i.code != 65535) {
            empty = false;
            break;
          }
        }
      }

      if (empty && !keymap.onlyCustom && keymap.custom.length > 0) {
        logger.log("Custom keymap is empty, copying defaults");
        for (let i = 0; i < keymap.default.length; i++) {
          keymap.custom[i] = keymap.default[i].slice();
        }
        keymap.onlyCustom = true;
        await focus.command("keymap", keymap);
      }

      let colormap = await focus.command("colormap");
      const k = new Keymap();
      this.setState({
        keymap: keymap,
        hasLegacy: k.hasLegacyCodes(keymap.custom),
        colormap: colormap,
      });
    } catch (e) {
      toast.error(e);
      this.props.onDisconnect();
    }
  };

  hasKeymap = () => {
    return this.state.keymap.custom.length > 0;
  };

  hasColormap = () => {
    return this.state.colormap.colorMap.length > 0;
  };

  async componentDidMount() {
    this.context_bar_channel = new BroadcastChannel("context_bar");

    const layoutSetting = await settings.get("keyboard.layout", "English (US)");
    db.setLayout(layoutSetting);

    await this.scanKeyboard();
    let initialLayer = 0;

    this.setState({
      currentLayer: initialLayer,
      loading: false,
      layout: layoutSetting,
    });
    context_bar_channel.onmessage = (event) => {
      if (event.data === "changes-discarded") {
        this.componentDidMount();

        this.setState({ modified: false });
      }
    };
  }
  async componentWillUnmount() {
    this.context_bar_channel.close();
  }

  onApply = async () => {
    this.setState({ saving: true });
    let focus = new Focus();
    let logger = new Log();

    await focus.command("keymap", this.state.keymap);
    await focus.command(
      "colormap",
      this.state.colormap.palette,
      this.state.colormap.colorMap
    );

    this.setState({
      modified: false,
      saving: false,
    });
    logger.log("Changes saved.");
    hideContextBar();
  };

  migrateLegacy = async () => {
    await this.setState((oldState) => {
      const k = new Keymap();
      let newKeymap = k.migrateLegacyCodes(oldState.keymap.custom);
      return {
        modified: true,
        hasLegacy: false,
        keymap: {
          default: oldState.keymap.default,
          onlyCustom: oldState.keymap.onlyCustom,
          custom: newKeymap,
        },
      };
    });
    let logger = new Log();
    logger.log("Legacy keycodes migrated to new ones.");

    showContextBar();
  };

  render() {
    const {
      currentLayer,
      keymap,
      colormap,
      currentKeyIndex,
      currentLedIndex,
      layout,
    } = this.state;

    if (this.state.loading) {
      return <LoadingScreen />;
    }

    if (!this.state.keymap.onlyCustom) {
      return <OnlyCustomScreen />;
    }

    const k = new Keymap();

    const layerData = keymap.custom && keymap.custom[currentLayer];
    const focus = new Focus();
    const KeymapSVG = focus.focusDeviceDescriptor.components.keymap;
    const keymapWidget = (
      <div>
        <KeymapSVG
          className="layer"
          index={currentLayer}
          keymap={layerData}
          onKeySelect={this.onKeySelect}
          selectedKey={currentKeyIndex}
          palette={colormap.palette}
          colormap={colormap.colorMap[currentLayer]}
        />
      </div>
    );

    let title;
    if (this.hasColormap() && this.hasKeymap()) {
      title = i18n.t("app.menu.editor");
    } else if (this.hasKeymap()) {
      title = i18n.t("app.menu.layoutEditor");
    } else {
      title = i18n.t("app.menu.colormapEditor");
    }

    return (
      <React.Fragment>
        <PageTitle title={title} />


        {this.state.hasLegacy && (
          <LegacyAlert migrateLegacy={this.migrateLegacy} />
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            margin: 3,
            width: `calc(100% - ${sidebarWidth}px)`,
          }}
        >
          {keymapWidget}
        </Box>
        <Sidebar
          keymap={keymap}
          colormap={colormap}
          selectedKey={currentKeyIndex}
          selectedLed={currentLedIndex}
          layer={currentLayer}
          layout={layout}
          setLayer={this.setLayer}
          setLayout={this.setLayout}
          onKeyChange={this.onKeyChange}
          onKeymapChange={this.onKeymapChange}
          onColormapChange={this.onColormapChange}
          onPaletteChange={this.onPaletteChange}
          onLedChange={this.onLedChange}
        />

        <SaveChangesButton
          floating
          onClick={this.onApply}
          disabled={!this.state.modified}
        >
          {i18n.t("components.save.saveChanges")}
        </SaveChangesButton>
      </React.Fragment>
    );
  }
}

export default Editor;
