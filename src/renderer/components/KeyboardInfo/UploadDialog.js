// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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
import path from "path";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";

import { getStaticPath } from "../../config";
import SaveChangesButton from "../SaveChangesButton";

const styles = theme => ({
  dialog: {
    padding: theme.spacing.unit * 2
  },
  p: {
    marginBottom: theme.spacing.unit * 2
  }
});

class UploadDialog extends React.Component {
  state = {
    inProgress: false
  };

  constructor(props) {
    super(props);
    this.focus = new Focus();
  }

  _flash = async () => {
    let port = this.focus._port;
    const filename =
      this.props.filename ||
      path.join(getStaticPath(), "/Model01-Firmware.hex");

    return this.focus.device.flash(port, filename);
  };

  upload = async () => {
    await this.props.toggleFlashing();
    await this.setState({ inProgress: true });

    try {
      await this._flash();
    } catch (e) {
      console.error(e);
      this.props.enqueueSnackbar("Error flashing the firmware", {
        variant: "error"
      });
      this.props.toggleFlashing();
      this.props.onDisconnect();
      return;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        this.props.enqueueSnackbar("Firmware flashed successfully!", {
          variant: "success"
        });

        this.props.toggleFlashing();
        resolve();
      }, 1000);
    });
  };

  onClose = () => {
    if (this.state.inProgress) return;
    return this.props.onClose();
  };

  render() {
    const { open, classes } = this.props;

    return (
      <Dialog
        onClose={this.onClose}
        open={open}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle>{"Upload new firmware?"}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.p}>
            {
              "This will overwrite the firmware already present on the keyboard. But do not worry, updating is safe, you can't brick your keyboard, not even with bad firmware."
            }
          </DialogContentText>
          <DialogContentText className={classes.p}>
            {this.focus.device.messages.preFlash}
          </DialogContentText>
          <DialogContentText className={classes.p}>
            {
              "Once the upload is finished - either successfully or with errors -, you will be taken back to the initial keyboard selection screen. This is normal."
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.onClose}
            color="primary"
            disabled={this.state.inProgress}
          >
            Cancel
          </Button>
          <SaveChangesButton onClick={this.upload} successMessage="Uploaded!">
            Upload
          </SaveChangesButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withSnackbar(withStyles(styles)(UploadDialog));
