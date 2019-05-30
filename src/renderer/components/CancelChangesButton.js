// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";

CancelChangesButton.propTypes = {
  classes: PropTypes.object.isRequired,
  cancelContext: PropTypes.func.isRequired
};

const styles = theme => ({
  fab: {
    position: "fixed",
    justifyContent: "center",
    bottom: 0,
    right: theme.spacing.unit * 9,
    margin: theme.spacing.unit
  }
});

/**
 * Reactjs functional component that create button for cancel changes
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} cancelContext Function that cancel context. Parameter - "true"
 */
function CancelChangesButton(props) {
  const { classes, cancelContext } = props;

  return (
    <Tooltip placement="top" title={props.children}>
      <Fab
        color="secondary"
        aria-label="Add"
        className={classes.fab}
        onClick={() => {
          cancelContext(true);
        }}
      >
        <CloseIcon />
      </Fab>
    </Tooltip>
  );
}

export default withStyles(styles)(CancelChangesButton);
