// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2021  Keyboardio, Inc.
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
import Electron from "electron";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Portal from "@material-ui/core/Portal";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import LayoutSharing from "./StorageAndSharing/LayoutSharing";
import i18n from "../i18n";

import Focus from "../../api/focus";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: `0px ${theme.spacing(8)}px`
  },
  grow: {
    flexGrow: 1
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1)
  }
});

class StorageAndSharing extends React.Component {
  state = {
    dialogOpen: false
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  render() {
    const { classes, keymap, layer, colormap } = this.props;
    const { dialogOpen } = this.state;

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.t("app.menu.storageAndSharing")}
        </Portal>
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {i18n.t("storageAndSharing.sharing.title")}
        </Typography>
        <Card>
          <CardContent>
            <Typography component="p" gutterBottom>
              {i18n.t("storageAndSharing.sharing.description")}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <div className={classes.grow} />
            <Button
              onClick={this.openDialog}
              color="secondary"
              variant="outlined"
            >
              {i18n.t("storageAndSharing.sharing.button")}
            </Button>
          </CardActions>
        </Card>
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {i18n.t("storageAndSharing.eeprom.title")}
        </Typography>
        <Card>
          <CardContent>
            <Typography component="p" gutterBottom>
              {i18n.t("storageAndSharing.eeprom.description")}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <Button color="default" variant="text">
              {i18n.t("storageAndSharing.eeprom.clear")}
            </Button>
            <div className={classes.grow} />
            <Button color="secondary" variant="outlined">
              {i18n.t("storageAndSharing.eeprom.save")}
            </Button>
            <Button color="secondary" variant="outlined">
              {i18n.t("storageAndSharing.eeprom.restore")}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

/*
  <LayoutSharing
  open={dialogOpen}
  onClose={this.closeDialog}
  keymap={keymap}
  colormap={colormap}
  layer={layer}
  onKeymapChange={this.props.onKeymapChange}
  onPaletteChange={this.props.onPaletteChange}
  onColormapChange={this.props.onColormapChange}
  />
*/

StorageAndSharing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StorageAndSharing);
