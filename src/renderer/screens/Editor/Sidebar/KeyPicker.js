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

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

import Keyboard104 from "../Keyboard104";
import Collapsible from "../components/Collapsible";
import { KeymapDB } from "../../../../api/keymap";
import {
  addModifier,
  removeModifier
} from "../../../../api/keymap/db/modifiers";
import { GuiLabel } from "../../../../api/keymap/db/base/gui";

const db = new KeymapDB();

const styles = theme => ({
  mods: {
    marginTop: theme.spacing(1)
  },
  layout: {
    marginBottom: theme.spacing(1)
  }
});

class KeyPickerBase extends React.Component {
  state = {
    pickerOpen: false
  };

  isStandardKey = props => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey];
    const code = key.baseCode || key.code;

    return code >= 4 && code <= 255;
  };

  openPicker = () => {
    this.setState({ pickerOpen: true });
  };

  closePicker = () => {
    this.setState({ pickerOpen: false });
  };

  onKeyChange = keyCode => {
    const { selectedKey, keymap, layer } = this.props;
    const key = keymap.custom[layer][selectedKey];
    let offset = 0;
    if (key.baseCode) {
      offset = key.code - key.baseCode;
    }

    this.props.onKeyChange(parseInt(keyCode) + offset);
    this.closePicker();
  };

  toggleModifier = mod => event => {
    const { selectedKey, keymap, layer } = this.props;
    const key = keymap.custom[layer][selectedKey].code;

    if (event.target.checked) {
      this.props.onKeyChange(addModifier(key, mod));
    } else {
      this.props.onKeyChange(removeModifier(key, mod));
    }
  };

  makeSwitch = mod => {
    const { selectedKey, keymap, layer } = this.props;
    const key = keymap.custom[layer][selectedKey].code;

    return (
      <Switch
        checked={db.isInCategory(key, mod)}
        color="primary"
        onChange={this.toggleModifier(mod)}
      />
    );
  };

  setLayout = event => {
    const layout = event.target.value || this.props.layout;
    this.props.setLayout(layout);
  };

  render() {
    const { classes, keymap, selectedKey, layer, layout } = this.props;
    const key = keymap.custom[layer][selectedKey];
    const label = db.format(key, "full");
    const baseCode = key.baseCode || key.code;
    const standardKey = baseCode >= 4 && baseCode <= 255;

    const layoutMenu = db.getSupportedLayouts().map((layout, index) => {
      const menuKey = "layout-menu-" + index.toString();
      return (
        <MenuItem value={layout} key={menuKey}>
          <ListItemText primary={layout} />
        </MenuItem>
      );
    });

    return (
      <React.Fragment>
        <Collapsible
          expanded={this.isStandardKey(this.props)}
          title="Standard keys"
        >
          <div>
            <FormControl className={classes.layout}>
              <Select value={layout} onClick={this.setLayout} autoWidth>
                {layoutMenu}
              </Select>
            </FormControl>
          </div>
          <div>
            <Button variant="contained" onClick={this.openPicker}>
              {label.hint} {label.main}
            </Button>
          </div>
          <FormControl
            component="fieldset"
            className={classes.mods}
            disabled={!standardKey}
          >
            <FormGroup row>
              <FormControlLabel
                control={this.makeSwitch("shift")}
                label="Shift"
              />
              <FormControlLabel
                control={this.makeSwitch("ctrl")}
                label="Control"
              />
              <FormControlLabel control={this.makeSwitch("alt")} label="Alt" />
              <FormControlLabel
                control={this.makeSwitch("gui")}
                label={GuiLabel.full}
              />
              <FormControlLabel
                control={this.makeSwitch("altgr")}
                label="AltGr"
              />
            </FormGroup>
          </FormControl>
        </Collapsible>
        <Dialog
          open={this.state.pickerOpen}
          onClose={this.closePicker}
          fullWidth
          maxWidth="lg"
        >
          <Keyboard104
            onKeySelect={this.onKeyChange}
            currentKeyCode={key.baseCode || key.code}
            keymap={keymap}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}
const KeyPicker = withStyles(styles, { withTheme: true })(KeyPickerBase);

export { KeyPicker as default };
