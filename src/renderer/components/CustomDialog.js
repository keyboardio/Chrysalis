// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
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
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit * 2,
    top: theme.spacing.unit * 2
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, disabled } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          className={classes.closeButton}
          disabled={disabled}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

const Countdown = withStyles(theme => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit
  }
}))(Typography);

const Countbutton = withStyles(() => ({
  root: {
    width: 200
  }
}))(Button);

class CustomDialog extends React.Component {
  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.open} maxWidth="md">
        <DialogTitle onClose={this.handleClose} disabled={this.props.disabled}>
          {this.props.title}
        </DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        {this.props.countdown !== null && (
          <DialogActions>
            <Countdown>{this.props.countdown}</Countdown>
            <Countbutton
              onClick={this.props.countdown !== 0 ? this.props.upload : null}
              variant="contained"
              color={this.props.countdown ? "primary" : "secondary"}
              disabled={this.props.countdown !== 0 ? this.props.disabled : null}
            >
              {this.props.buttonText}
            </Countbutton>
          </DialogActions>
        )}
      </Dialog>
    );
  }
}

export default CustomDialog;
