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
 * - Only display default imports if there are any
 * - i18n
 * - export
 * - only display the textbox if importing custom, or on export?
 */

import React from "react";
import path from "path";
import fs from "fs";

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
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Focus from "../../../../../api/focus";
import { getStaticPath } from "../../../../config";
import { KeymapDB } from "../../../../../api/keymap";

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

class ImportExportBase extends React.Component {
  state = {
    layoutToImport: "custom"
  };

  selectLayoutToImport = event => {
    this.setState({ layoutToImport: event.target.value });
  };

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

  render() {
    const { classes, open, onClose, layer } = this.props;
    const { layoutToImport, layerData } = this.state;

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
