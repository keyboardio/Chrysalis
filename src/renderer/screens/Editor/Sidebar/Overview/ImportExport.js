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

/*
 * TODO:
 * - Error handling
 * - i18n
 * - export
 * - only display the textbox if importing custom, or on export?
 */

import React from "react";
import path from "path";
import fs from "fs";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
//import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Focus from "../../../../../api/focus";
import { KeymapDB } from "../../../../../api/keymap";
import { getStaticPath } from "../../../../config";

const db = new KeymapDB();

const styles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: theme.spacing(2),
    marginTop: -theme.spacing(1)
  },
  defaultImport: {
    minWidth: "15em",
    marginRight: theme.spacing(2)
  }
});

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} id={`ie-tabpanel-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

class DefaultImportBase extends React.Component {
  constructor(props) {
    super(props);

    const layoutState = this.loadLayout("qwerty");

    this.state = {
      layoutToImport: layoutState.layoutToImport,
      layout: layoutState.layout
    };
  }

  /*
  importLayout = data => {
    const { layer, keymap, onKeymapChange } = this.props;

    const newLayer = data.keymap.map(key => {
      return db.lookup(key.keyCode || key.code);
    });
    let newKeymap = keymap.custom;
    newKeymap[layer] = newLayer;

    onKeymapChange(newKeymap);
  };
  */

  loadLayout = layoutName => {
    const focus = new Focus();

    const { vendor, product } = focus.device.info;
    const cVendor = vendor.replace("/", "");
    const cProduct = product.replace("/", "");
    const layoutPath = layout =>
      path.join(getStaticPath(), cVendor, cProduct, `layouts/${layout}.json`);

    const importData = fs.readFileSync(layoutPath(layoutName), {
      encoding: "utf-8"
    });
    const keymap = JSON.parse(importData).keymap.map(key => {
      return db.lookup(key.keyCode || key.code);
    });

    return {
      layoutToImport: layoutName,
      layout: keymap
    };
  };

  selectLayoutToImport = event => {
    const newState = this.loadLayout(event.target.value);
    this.setState(newState);
  };

  render() {
    const { classes, theme, availableDefaults } = this.props;
    const { layoutToImport, layout } = this.state;

    const focus = new Focus();
    const Keymap = focus.device.components.keymap;
    const keymapWidget = (
      <Keymap className="layer" keymap={layout} theme={theme} />
    );

    const layouts = availableDefaults.map(name => {
      const label = name.charAt(0).toUpperCase() + name.slice(1);

      return (
        <MenuItem value={name} key={`import-default-${name}`}>
          {label}
        </MenuItem>
      );
    });

    return (
      <React.Fragment>
        <FormControl className={classes.defaultImport}>
          <InputLabel>Import a layout</InputLabel>
          <Select value={layoutToImport} onChange={this.selectLayoutToImport}>
            {layouts}
          </Select>
        </FormControl>

        {keymapWidget}
      </React.Fragment>
    );
  }
}
const DefaultImport = withStyles(styles, { withTheme: true })(
  DefaultImportBase
);

/*

  fieldChange = event => {
  this.setState({
  layoutToImport: "custom",
  layerData: event.target.value
  });
  };


  importLayout = data => {
  const { layer, keymap, onKeymapChange } = this.props;

  const newLayer = data.keymap.map(key => {
  return db.lookup(key.keyCode || key.code);
  });
  let newKeymap = keymap.custom;
  newKeymap[layer] = newLayer;

  onKeymapChange(newKeymap);
  };

  onImport = () => {
  const { layoutToImport, layerData } = this.state;
  let importData = layerData;

  if (layoutToImport != "custom") {
  const focus = new Focus();

  const { vendor, product } = focus.device.info;
  const cVendor = vendor.replace("/", "");
  const cProduct = product.replace("/", "");
  const layoutPath = layout =>
  path.join(getStaticPath(), cVendor, cProduct, `${layout}.json`);

  importData = fs.readFileSync(layoutPath(layoutToImport), {
  encoding: "utf-8"
  });
  }

  this.importLayout(JSON.parse(importData));
  this.props.onClose();
  };


  <div className={classes.toolbar}>
  <FormControl className={classes.defaultImport}>
  <InputLabel>Import a layout</InputLabel>
  <Select
  value={layoutToImport}
  onChange={this.selectLayoutToImport}
  >
  <MenuItem value="custom">Custom</MenuItem>
  <MenuItem value="qwerty">QWERTY</MenuItem>
  <MenuItem value="colemak">Colemak</MenuItem>
  <MenuItem value="dvorak">Dvorak</MenuItem>
  </Select>
  </FormControl>
  </div>

  <TextField
  multiline
  rows={10}
  variant="outlined"
  fullWidth
  value={layerData}
  onChange={this.fieldChange}
  />

  */

class ImportExportBase extends React.Component {
  constructor(props) {
    super(props);

    const focus = new Focus();

    const { vendor, product } = focus.device.info;
    const cVendor = vendor.replace("/", "");
    const cProduct = product.replace("/", "");
    const layoutDirPath = path.join(
      getStaticPath(),
      cVendor,
      cProduct,
      "layouts"
    );

    try {
      const layouts = fs
        .readdirSync(layoutDirPath, {
          encoding: "utf-8"
        })
        .map(name => path.basename(name, ".json"))
        .sort();

      this.state = {
        tab: 0,
        availableDefaults: layouts
      };
    } catch (_) {
      this.state = {
        tab: 1,
        availableDefaults: []
      };
    }
  }

  onTabChange = (_, index) => {
    this.setState({ tab: index });
  };

  render() {
    const { classes, open, onClose, layer, ...others } = this.props;
    const { tab, availableDefaults } = this.state;

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle disableTypography>
          <Typography variant="h6">Import / Export (Layer #{layer})</Typography>
          <IconButton onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.onTabChange}
          >
            <Tab
              label="Import default"
              disabled={availableDefaults.length == 0}
            />
            <Tab label="Import custom" />
            <Tab label="Export" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <DefaultImport availableDefaults={availableDefaults} {...others} />
          </TabPanel>
          <TabPanel value={tab} index={1} />
          <TabPanel value={tab} index={2} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={this.onImport}>
            Import
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
const ImportExport = withStyles(styles, { withTheme: true })(ImportExportBase);

export { ImportExport as default };
