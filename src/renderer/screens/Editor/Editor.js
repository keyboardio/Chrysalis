// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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
import PropTypes from "prop-types";

import Portal from "@material-ui/core/Portal";
import { withStyles } from "@material-ui/core/styles";

import { toast } from "react-toastify";
import settings from "electron-settings";

import Focus from "../../../api/focus";
import Log from "../../../api/log";
import { KeymapDB } from "../../../api/keymap";

import Sidebar, { sidebarWidth } from "./Sidebar";

import SaveChangesButton from "../../components/SaveChangesButton";
import i18n from "../../i18n";
import LoadingScreen from "../../components/LoadingScreen";
import OnlyCustomScreen from "./components/OnlyCustomScreen";

const db = new KeymapDB();

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100% - ${sidebarWidth}px)`
  },
  warning: {
    zIndex: theme.zIndex.drawer + 2,
    position: "relative"
  }
});

class Editor extends React.Component {
  state = {
    loading: true,
    currentLayer: 0,
    currentKeyIndex: 0,
    currentLedIndex: 0,
    keymap: {
      custom: [],
      default: [],
      onlyCustom: false
    },
    colorMap: {
      palette: [],
      colorMap: []
    },
    modified: false,
    layout: "English (US)"
  };
  keymapDB = new KeymapDB();

  setLayer = layer => {
    this.setState({ currentLayer: layer });
  };
  selectKey = (keyIndex, ledIndex) => {
    this.setState({
      currentKeyIndex: keyIndex,
      currentLedIndex: ledIndex
    });
  };
  setModified = () => {
    this.setState({ modified: true });
  };
  setLayout = async layout => {
    db.setLayout(layout);

    this.setState(state => {
      let newKeymap = state.keymap;
      newKeymap.custom = newKeymap.custom.map(layer => {
        return layer.map(key => {
          return db.lookup(key.code);
        });
      });

      return {
        layout: layout,
        keymap: newKeymap
      };
    });
    await settings.set("keyboard.layout", layout);
  };

  onKeySelect = event => {
    const target = event.currentTarget;
    const keyIndex = parseInt(target.getAttribute("data-key-index"));
    const ledIndex = parseInt(target.getAttribute("data-led-index"));

    this.selectKey(keyIndex, ledIndex);
  };

  onKeyChange = keyCode => {
    this.setState(state => {
      let newKeymap = state.keymap;
      newKeymap.custom[state.currentLayer][state.currentKeyIndex] = db.lookup(
        keyCode
      );

      return {
        modified: true,
        keymap: newKeymap
      };
    });
    this.props.startContext();
  };

  onLedChange = index => {
    this.setState(state => {
      let newColormap = state.colormap;
      newColormap.colorMap[state.currentLayer][state.currentLedIndex] = index;

      return {
        modified: true,
        colormap: newColormap
      };
    });

    this.props.startContext();
  };

  onPaletteChange = newPalette => {
    this.setState(state => {
      let colormap = state.colormap;
      colormap.palette = newPalette;

      return {
        modified: true,
        colormap: colormap
      };
    });

    this.props.startContext();
  };

  onKeymapChange = newKeymap => {
    this.setState(state => {
      let keymap = state.keymap;
      keymap.custom = newKeymap;

      return {
        modified: true,
        keymap: keymap
      };
    });

    this.props.startContext();
  };

  onColormapChange = newColormap => {
    this.setState(state => {
      let colormap = state.colormap;
      colormap.colorMap = newColormap;

      return {
        modified: true,
        colormap: colormap
      };
    });

    this.props.startContext();
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
        await focus.command("keymap", keymap);
      }

      let colormap = await focus.command("colormap");

      this.setState({
        keymap: keymap,
        colormap: colormap
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
    const layoutSetting = await settings.get("keyboard.layout", "English (US)");
    db.setLayout(layoutSetting);

    await this.scanKeyboard();
    let initialLayer = 0;

    this.setState({
      currentLayer: initialLayer,
      loading: false,
      layout: layoutSetting
    });
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.inContext && !nextProps.inContext) {
      this.scanKeyboard();
      this.setState({ modified: false });
    }
    if (!this.state.keymap.onlyCustom) {
      this.scanKeyboard();
    }
  };

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
      saving: false
    });
    logger.log("Changes saved.");
    this.props.cancelContext();
  };

  render() {
    const { classes } = this.props;
    const {
      currentLayer,
      keymap,
      colormap,
      currentKeyIndex,
      currentLedIndex,
      layout
    } = this.state;

    if (this.state.loading) {
      return <LoadingScreen />;
    }

    if (!this.state.keymap.onlyCustom) {
      return <OnlyCustomScreen titleElement={this.props.titleElement} />;
    }

    const layerData = keymap.custom && keymap.custom[currentLayer];
    const focus = new Focus();
    const Keymap = focus.device.components.keymap;
    const keymapWidget = (
      <div className={classes.editor}>
        <Keymap
          className="layer"
          index={currentLayer}
          keymap={layerData}
          onKeySelect={this.onKeySelect}
          selectedKey={currentKeyIndex}
          palette={colormap.palette}
          colormap={colormap.colorMap[currentLayer]}
          theme={this.props.theme}
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
        <Portal container={this.props.titleElement}>{title}</Portal>
        <main className={classes.content}>{keymapWidget}</main>
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

Editor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Editor);
