// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import PaletteIcon from "@material-ui/icons/Palette";
import Portal from "@material-ui/core/Portal";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { toast } from "react-toastify";

import Focus from "../../../api/focus";
import Log from "../../../api/log";
import openURL from "../../utils/openURL";
import { KeymapDB } from "../../../api/keymap";

import ColorPalette from "../../components/ColorPalette";
import KeySelector from "./KeySelector";
import SaveChangesButton from "../../components/SaveChangesButton";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import i18n from "../../i18n";
import ImportExportDialog from "./ImportExportDialog";
import { CopyFromDialog } from "./CopyFromDialog";
import LoadingScreen from "../../components/LoadingScreen";

const styles = theme => ({
  tbg: {
    marginRight: theme.spacing.unit * 4
  },
  layerSelectItem: {
    display: "inline-flex"
  },
  grow: {
    flexGrow: 1
  },
  editor: {
    margin: theme.spacing.unit * 3,
    marginBottom: 150,
    textAlign: "center"
  },
  moreMenu: {
    marginTop: theme.spacing.unit * 4
  },
  layerItem: {
    paddingLeft: theme.spacing.unit * 4
  },
  layerSelect: {
    marginRight: theme.spacing.unit * 4
  },
  tabWrapper: {
    flexDirection: "row",
    "& svg": {
      position: "relative",
      top: -theme.spacing.unit / 2
    }
  },
  tabLabelContainer: {
    width: "auto",
    padding: `6px ${theme.spacing.unit}px`
  },
  disabledLayer: {
    opacity: 0.5,
    filter: "saturate(25%)"
  }
});

class Editor extends React.Component {
  state = {
    currentLayer: 0,
    currentKeyIndex: -1,
    currentLedIndex: -1,
    modified: false,
    saving: false,
    keymap: {
      custom: [],
      default: [],
      onlyCustom: false
    },
    palette: [],
    colorMap: [],
    mode: "layout",
    clearConfirmationOpen: false,
    copyFromOpen: false,
    importExportDialogOpen: false,
    isMultiSelected: false,
    isColorButtonSelected: false,
    hasKeymap: false,
    hasColormap: false,
    loading: true
  };
  keymapDB = new KeymapDB();

  /**
   * Bottom menu never hide and automatically select a key at launch and have this shown in the bottom menu
   */
  bottomMenuNeverHide = () => {
    this.setState(state => ({
      currentKeyIndex: state.currentKeyIndex !== -1 ? state.currentKeyIndex : 0,
      currentLedIndex: state.currentLedIndex !== -1 ? state.currentLedIndex : 0,
      selectedPaletteColor: null,
      isColorButtonSelected: false
    }));
  };

  scanKeyboard = async () => {
    let focus = new Focus();
    let logger = new Log();

    try {
      let defLayer = await focus.command("settings.defaultLayer");
      defLayer = parseInt(defLayer) || 0;

      let keymap = await focus.command("keymap");

      let empty = true;
      for (let layer of keymap.custom) {
        for (let i of layer) {
          if (i.keyCode != 65535) {
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

      let mode = "layout";
      if (keymap.custom.length == 0 && colormap.colorMap.length > 0)
        mode = "colormap";

      this.setState({
        defaultLayer: defLayer,
        keymap: keymap,
        palette: colormap.palette,
        colorMap: colormap.colorMap,
        mode: mode,
        hasKeymap: keymap.custom.length > 0,
        hasColormap: colormap.colorMap.length > 0
      });
      this.bottomMenuNeverHide();
    } catch (e) {
      toast.error(e);
      this.props.onDisconnect();
    }
  };

  getCurrentKey() {
    if (this.state.currentKeyIndex < 0) return -1;

    let layer = parseInt(this.state.currentLayer),
      keyIndex = parseInt(this.state.currentKeyIndex);

    return this.state.keymap.custom[layer][keyIndex].keyCode;
  }

  onKeyChange = keyCode => {
    // Keys can only change on the custom layers

    let layer = this.state.currentLayer,
      keyIndex = this.state.currentKeyIndex;

    if (keyIndex === -1) {
      return;
    }

    this.setState(state => {
      let keymap = state.keymap.custom.slice();
      keymap[layer][keyIndex] = this.keymapDB.parse(keyCode);
      return {
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: keymap
        },
        modified: true
      };
    });
    this.props.startContext();
  };

  onKeyPress = event => {
    const key = this.keymapDB.parseJsKey(event.key);
    if (key) {
      this.onKeyChange(key.code);
    }
  };

  onKeyUp = event => {
    if (event.key === "Backspace") {
      this.onKeyChange(65535); // Transparent
    }
  };

  /**
   * Verificate that colors in keyboard button and in color palette is equal
   * @param {number} colorIndex Number of palette index
   * @param {number} currentLayer Number of current layer
   * @param {number} currentLedIndex Number of current selected keyboard button
   */

  onVerificationColor = (colorIndex, currentLayer, currentLedIndex) => {
    const { colorMap } = this.state;
    const currentIndexKeyButton = colorMap[currentLayer][currentLedIndex];
    return currentIndexKeyButton === colorIndex;
  };

  /**
   * Change state if click control or shift button
   * @param {number} layer Number of current layer
   * @param {number} ledIndex Number of current selected keyboard button
   */
  onCtrlShiftPress = (layer, ledIndex) => {
    this.setState({
      selectedPaletteColor: this.state.colorMap[layer][ledIndex],
      isMultiSelected: true,
      isColorButtonSelected: true
    });
  };

  /**
   * Change state if color buton selected
   * @param {number} layer Number of layer in attribute of keyboard button
   * @param {number} currentLayer Number of current layer from state
   * @param {number} ledIndex Number of current selected keyboard button
   */
  onButtonKeyboardColorChange = (currentLayer, layer, ledIndex) => {
    const { selectedPaletteColor, modified } = this.state;
    const isEqualColor = this.onVerificationColor(
      selectedPaletteColor,
      currentLayer,
      ledIndex
    );
    if (!modified && isEqualColor) {
      return;
    } else {
      this.setState(state => {
        let colormap = state.colorMap.slice();
        colormap[currentLayer][ledIndex] = this.state.selectedPaletteColor;
        this.props.startContext();
        return {
          selectedPaletteColor: this.state.colorMap[layer][ledIndex],
          colorMap: colormap,
          modified: true
        };
      });
    }
  };

  onKeySelect = event => {
    const {
      selectedPaletteColor,
      currentLayer,
      isMultiSelected,
      isColorButtonSelected,
      currentKeyIndex
    } = this.state;
    const currentTarget = event.currentTarget;
    let layer = parseInt(currentTarget.getAttribute("data-layer")),
      keyIndex = parseInt(currentTarget.getAttribute("data-key-index")),
      ledIndex = parseInt(currentTarget.getAttribute("data-led-index"));

    if (keyIndex == currentKeyIndex) {
      if (event.ctrlKey || (event.shiftKey && !isColorButtonSelected)) {
        this.onCtrlShiftPress(layer, ledIndex);
        return;
      } else {
        this.setState({
          currentKeyIndex: -1,
          currentLedIndex: -1,
          selectedPaletteColor: null,
          isMultiSelected: false,
          isColorButtonSelected: false
        });
        return;
      }
    }

    this.setState(state => {
      if (
        state.colorMap.length > 0 &&
        layer >= 0 &&
        layer < state.colorMap.length
      ) {
        return {
          currentLayer: layer,
          currentKeyIndex: keyIndex,
          currentLedIndex: ledIndex
        };
      } else {
        return {
          currentLayer: layer,
          currentKeyIndex: keyIndex
        };
      }
    });

    if (event.ctrlKey || event.shiftKey) {
      this.onCtrlShiftPress(layer, ledIndex);
      return;
    } else {
      if (
        selectedPaletteColor !== null &&
        isMultiSelected &&
        isColorButtonSelected
      ) {
        this.onButtonKeyboardColorChange(currentLayer, layer, ledIndex);
      }
      if (isColorButtonSelected && !isMultiSelected) {
        this.setState(
          () => {
            return {
              isMultiSelected: true
            };
          },
          () => {
            this.onButtonKeyboardColorChange(currentLayer, layer, ledIndex);
          }
        );
      }
    }
  };

  selectLayer = event => {
    if (event.target.value === undefined) return;
    this.setState({
      currentLayer: event.target.value
    });
    this.bottomMenuNeverHide();
  };

  onApply = async () => {
    this.setState({ saving: true });
    let focus = new Focus();
    let logger = new Log();

    await focus.command("keymap", this.state.keymap);
    await focus.command("colormap", this.state.palette, this.state.colorMap);
    await focus.command("settings.defaultLayer", this.state.defaultLayer);
    this.setState({
      modified: false,
      saving: false,
      isMultiSelected: false,
      selectedPaletteColor: null,
      isColorButtonSelected: false
    });
    logger.log("Changes saved.");
    this.props.cancelContext();
  };

  componentDidMount() {
    this.scanKeyboard().then(() => {
      const defLayer =
        this.state.defaultLayer >= 126 ? 0 : this.state.defaultLayer;
      let initialLayer = 0;

      this.setState({
        currentLayer: initialLayer,
        defaultLayer: defLayer,
        loading: false
      });
    });
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.inContext && !nextProps.inContext) {
      this.scanKeyboard();
      this.setState({ modified: false });
    }
  };

  copyFromDialog = () => {
    this.setState({ copyFromOpen: true });
  };
  cancelCopyFrom = () => {
    this.setState({ copyFromOpen: false });
  };
  copyFromLayer = layer => {
    this.setState(state => {
      let newKeymap, newColormap;

      newKeymap = state.keymap.custom.slice();
      newKeymap[state.currentLayer] = state.keymap.custom[layer].slice();

      newColormap = state.colorMap.slice();
      if (newColormap.length > 0)
        newColormap[state.currentLayer] = state.colorMap[layer].slice();

      this.props.startContext();
      return {
        colorMap: newColormap,
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: newKeymap
        },
        copyFromOpen: false,
        modified: true
      };
    });
  };

  clearLayer = () => {
    this.setState(state => {
      const idx = state.currentLayer;

      let newKeymap;
      if (state.hasKeymap) {
        newKeymap = state.keymap.custom.slice();
        newKeymap[idx] = Array(newKeymap[0].length)
          .fill()
          .map(() => ({ keyCode: 0xffff }));
      }

      let newColormap = [];
      if (state.hasColormap) {
        newColormap = state.colorMap.slice();
        if (newColormap.length > 0) {
          newColormap[idx] = Array(newColormap[0].length)
            .fill()
            .map(() => 15);
        }
      }

      this.props.startContext();
      return {
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: newKeymap
        },
        colorMap: newColormap,
        modified: true,
        clearConfirmationOpen: false
      };
    });
  };

  confirmClear = () => {
    this.setState({ clearConfirmationOpen: true });
  };
  cancelClear = () => {
    this.setState({ clearConfirmationOpen: false });
  };

  setMode = mode => {
    this.setState({ mode: mode });
    this.bottomMenuNeverHide();
  };

  onColorButtonSelect = (action, colorIndex) => {
    const { isColorButtonSelected } = this.state;
    if (action === "one_button_click") {
      this.setState({
        isMultiSelected: false,
        isColorButtonSelected: !isColorButtonSelected
      });
      return;
    }
    if (action === "another_button_click") {
      this.setState({
        selectedPaletteColor: colorIndex,
        isColorButtonSelected: true
      });
      return;
    }
  };

  onColorSelect = colorIndex => {
    const {
      currentLayer,
      currentLedIndex,
      colorMap,
      selectedPaletteColor
    } = this.state;

    const isEqualColor = this.onVerificationColor(
      colorIndex,
      currentLayer,
      currentLedIndex
    );

    if (colorIndex == this.state.selectedPaletteColor) colorIndex = -1;
    if (colorIndex == -1) {
      this.setState({ selectedPaletteColor: selectedPaletteColor });
      return;
    }

    if (currentLayer < 0 || currentLayer >= colorMap.length) return;

    if (!isEqualColor) {
      this.setState(state => {
        let colormap = state.colorMap.slice();
        colormap[currentLayer][currentLedIndex] = colorIndex;
        return {
          isMultiSelected: true,
          colorMap: colormap,
          selectedPaletteColor: colorIndex,
          modified: true
        };
      });
      this.props.startContext();
    } else {
      this.setState({
        selectedPaletteColor: colorIndex
      });
    }
  };

  onColorPick = (colorIndex, r, g, b) => {
    let newPalette = this.state.palette.slice();
    newPalette[colorIndex] = {
      r: r,
      g: g,
      b: b,
      rgb: `rgb(${r}, ${g}, ${b})`
    };
    this.setState({
      palette: newPalette,
      modified: true
    });
    this.props.startContext();
  };

  importExportDialog = () => {
    this.setState({ importExportDialogOpen: true });
  };
  cancelImport = () => {
    this.setState({ importExportDialogOpen: false });
  };

  importConfig = config => {
    let logger = new Log();
    logger.debug("Importing config", config);

    // legacy single layer import
    if (!config.configVersion) {
      this.importLayer(config);
    } else if (config.configVersion === 1) {
      this.setState(state => {
        const colorMap = config.layers.map(l => l.colormap).filter(m => !!m);
        return {
          keymap: {
            onlyCustom: true,
            custom: config.layers.map(l =>
              l.keymap.map(k => this.keymapDB.parse(k))
            ),
            default: state.keymap.default
          },
          defaultLayer: config.defaultLayer || state.defaultLayer,
          colorMap: colorMap.length ? colorMap : state.colorMap,
          palette: config.palette || state.palette,
          modified: true
        };
      });
      this.props.startContext();
      this.toCloseImportExportDialog();
    } else {
      // invalid config
      throw new Error(`Invalid config version "${config.configVersion}"`);
    }
  };

  importLayer = data => {
    let logger = new Log();

    if (data.palette.length > 0) this.setState({ palette: data.palette });
    if (data.keymap.length > 0) {
      const { currentLayer } = this.state;
      this.setState(state => {
        let newKeymap = this.state.keymap.custom.slice();
        newKeymap[currentLayer] = data.keymap.slice();
        let newColormap = this.state.colorMap.slice();
        if (data.colormap && data.colormap.length > 0) {
          newColormap[currentLayer] = data.colormap.slice();
        }
        logger.debug("Importing layer", {
          currentLayer: currentLayer,
          keymap: {
            custom: newKeymap,
            onlyCustom: state.keymap.onlyCustom
          },
          colorMap: newColormap
        });
        return {
          keymap: {
            default: state.keymap.default,
            custom: newKeymap,
            onlyCustom: state.keymap.onlyCustom
          },
          colorMap: newColormap
        };
      });
    }
    this.setState({ modified: true });
    this.props.startContext();
    this.toCloseImportExportDialog();
  };

  /**
   * Close ImportExportDialog component
   */
  toCloseImportExportDialog = () => {
    this.setState({ importExportDialogOpen: false });
  };

  enableOnlyCustom = async () => {
    let focus = new Focus();
    await focus.command("keymap.onlyCustom", true);
    this.setState(state => ({
      keymap: {
        custom: state.keymap.custom,
        default: state.keymap.default,
        onlyCustom: true
      }
    }));
  };

  openFeatureRequest = async () => {
    const url =
      "https://github.com/keyboardio/Chrysalis/issues/new?labels=enhancement&template=feature_request.md";
    const opener = openURL(url);

    await opener();
  };

  render() {
    const { classes } = this.props;
    const {
      keymap,
      isColorButtonSelected,
      hasKeymap,
      hasColormap,
      colorMap,
      mode,
      loading
    } = this.state;

    if (loading) {
      return <LoadingScreen />;
    }

    let focus = new Focus();
    const Layer = focus.device.components.keymap;

    let currentLayer = this.state.currentLayer;

    let layerData;
    if (hasKeymap) {
      layerData = keymap.custom[currentLayer];
    }

    const layer = (
      <Fade in appear key={currentLayer}>
        <div className={classes.editor}>
          <Layer
            className="layer"
            index={currentLayer}
            keymap={layerData}
            onKeySelect={this.onKeySelect}
            selectedKey={this.state.currentKeyIndex}
            palette={this.state.palette}
            colormap={this.state.colorMap[this.state.currentLayer]}
            theme={this.props.theme}
          />
        </div>
      </Fade>
    );

    let copyFromLayerOptions;
    copyFromLayerOptions = !hasKeymap
      ? []
      : this.state.keymap.custom.map((_, index) => {
          const label = i18n.t("components.layer", { index: index });

          return {
            index: index,
            label: label
          };
        });

    let layerMenu;
    if (hasKeymap) {
      layerMenu = keymap.custom.map((_, index) => {
        const menuKey = "layer-menu-" + index.toString();
        return (
          <MenuItem value={index} key={menuKey}>
            <ListItemText
              inset
              primary={i18n.t("components.layer", { index: index })}
            />
          </MenuItem>
        );
      });
    } else {
      layerMenu = colorMap.map((_, index) => {
        const menuKey = "layer-menu-" + index.toString();
        return (
          <MenuItem value={index} key={menuKey}>
            <ListItemText
              inset
              primary={i18n.t("components.layer", { index: index })}
            />
          </MenuItem>
        );
      });
    }

    const editorSwitchToggle = hasColormap && hasKeymap;
    let title;
    if (hasColormap && hasKeymap) {
      title = i18n.t("app.menu.editor");
    } else if (hasKeymap) {
      title = i18n.t("app.menu.layoutEditor");
    } else {
      title = i18n.t("app.menu.colormapEditor");
    }

    let showSlider = true;
    if (hasKeymap) {
      showSlider = this.getCurrentKey() != -1;
    }

    let onlyCustomWarning;
    if (!this.state.keymap.onlyCustom) {
      const fixitButton = (
        <React.Fragment>
          <Box component="span" mr={1}>
            <Button color="primary" onClick={this.openFeatureRequest}>
              {i18n.t("editor.onlyCustom.openFR")}
            </Button>
          </Box>

          <Button onClick={this.enableOnlyCustom} color="primary">
            {i18n.t("editor.onlyCustom.fixItButton")}
          </Button>
        </React.Fragment>
      );

      onlyCustomWarning = (
        <Alert severity="error" action={fixitButton}>
          <Typography component="p">
            {i18n.t("editor.onlyCustom.warning")}
          </Typography>
        </Alert>
      );
    }

    return (
      <React.Fragment>
        <Portal container={this.props.titleElement}>{title}</Portal>
        <Portal container={this.props.appBarElement}>
          <Toolbar>
            {editorSwitchToggle && (
              <ToggleButtonGroup
                value={mode}
                exclusive
                className={classes.tbg}
                onChange={(_, mode) => {
                  this.setMode(mode);
                }}
              >
                {hasKeymap && (
                  <ToggleButton value="layout" disabled={mode == "layout"}>
                    <Tooltip title={i18n.t("editor.layoutMode")}>
                      <KeyboardIcon />
                    </Tooltip>
                  </ToggleButton>
                )}
                {hasColormap && (
                  <ToggleButton value="colormap" disabled={mode == "colormap"}>
                    <Tooltip title={i18n.t("editor.colormapMode")}>
                      <PaletteIcon />
                    </Tooltip>
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
            )}
            <div className={classes.grow} />
            <FormControl className={classes.layerSelect}>
              <Select
                value={currentLayer}
                classes={{ selectMenu: classes.layerSelectItem }}
                autoWidth
                onClick={this.selectLayer}
              >
                {layerMenu}
              </Select>
            </FormControl>
            <div>
              <Tooltip
                disableFocusListener
                title={i18n.t("editor.importExport")}
              >
                <IconButton onClick={this.importExportDialog}>
                  <ImportExportIcon />
                </IconButton>
              </Tooltip>
              <Tooltip disableFocusListener title={i18n.t("editor.copyFrom")}>
                <IconButton onClick={this.copyFromDialog}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={i18n.t("editor.clearLayer")}>
                <IconButton onClick={this.confirmClear}>
                  <LayersClearIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </Portal>
        {hasKeymap &&
          mode == "layout" &&
          keymap.custom.length == 0 &&
          keymap.default.length == 0 && <LinearProgress variant="query" />}
        {onlyCustomWarning}
        {layer}
        <Slide in={showSlider} direction="up" unmountOnExit>
          {(mode == "layout" && (
            <KeySelector
              onKeySelect={this.onKeyChange}
              currentKeyCode={this.getCurrentKey()}
              keymap={keymap}
            />
          )) ||
            (mode == "colormap" && (
              <ColorPalette
                disabled={currentLayer > colorMap.length}
                onColorSelect={this.onColorSelect}
                colorButtonIsSelected={this.state.colorButtonIsSelected}
                palette={this.state.palette}
                onColorPick={this.onColorPick}
                selected={this.state.selectedPaletteColor}
                isColorButtonSelected={isColorButtonSelected}
                onColorButtonSelect={this.onColorButtonSelect}
              />
            ))}
        </Slide>
        <SaveChangesButton
          floating
          onClick={this.onApply}
          disabled={!this.state.modified}
        >
          {i18n.t("components.save.saveChanges")}
        </SaveChangesButton>
        <ConfirmationDialog
          title={i18n.t("editor.clearLayerQuestion")}
          open={this.state.clearConfirmationOpen}
          onConfirm={this.clearLayer}
          onCancel={this.cancelClear}
        >
          {i18n.t("editor.clearLayerPrompt")}
        </ConfirmationDialog>
        <CopyFromDialog
          open={this.state.copyFromOpen}
          onCopy={this.copyFromLayer}
          onCancel={this.cancelCopyFrom}
          layers={copyFromLayerOptions}
          currentLayer={currentLayer}
        />
        <ImportExportDialog
          open={this.state.importExportDialogOpen}
          keymap={this.state.keymap}
          palette={this.state.palette}
          colormap={this.state.colorMap}
          defaultLayer={this.state.defaultLayer}
          deviceInfo={focus.device.info}
          onConfirm={this.importConfig}
          onCancel={this.cancelImport}
          toCloseImportExportDialog={this.toCloseImportExportDialog}
        />
      </React.Fragment>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Editor);
