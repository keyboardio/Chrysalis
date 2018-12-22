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
import AvrGirl from "avrgirl-arduino";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";

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

  _flashDebug = (message, ...args) => {
    if (message == "found port on") {
      this._portName = args[0];
    }
    console.log(message, ...args);
  };

  _flash = async () => {
    const board = {
      name: "Keyboard.io Model 01",
      baud: 9600,
      productId: ["0x2300", "0x2301"],
      protocol: "avr109",
      signature: new Buffer.from([0x43, 0x41, 0x54, 0x45, 0x52, 0x49, 0x4e])
    };

    let port = this.focus._port;

    return new Promise((resolve, reject) => {
      port.update({ baudRate: 1200 }, () => {
        console.log("baud update");
        setTimeout(() => {
          port.set({ dtr: true }, () => {
            console.log("dtr on");
            setTimeout(() => {
              port.set({ dtr: false }, () => {
                console.log("dtr off");
                setTimeout(() => {
                  focus._port = null;
                  let avrgirl = new AvrGirl({
                    board: board,
                    debug: this._flashDebug,
                    manualReset: true
                  });
                  avrgirl.connection.debug = this._flashDebug;

                  avrgirl.flash(this.props.filename, error => {
                    if (error) {
                      console.log(error);
                      try {
                        avrgirl.connection.serialPort.close();
                      } catch (e) {} // eslint-disable-line
                      reject(error);
                    } else {
                      setTimeout(() => {
                        avrgirl.connection.serialPort.close();
                        resolve();
                      }, 500);
                    }
                  });
                }, 1000);
              });
            }, 250);
          });
        }, 250);
      });
    });
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
            {"If you wish to proceed, press and hold the "}
            <kbd>Prog</kbd>
            {" key on your keyboard, and click the 'Upload' button."}
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
