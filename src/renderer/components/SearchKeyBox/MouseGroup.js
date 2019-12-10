// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
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
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

MouseGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  renderKeyMap: PropTypes.func.isRequired,
  classButton: PropTypes.string.isRequired
};

const styles = () => ({
  itemName: {
    paddingLeft: 2
  },
  itemKeys: {
    paddingRight: 2
  }
});

/**
 * Reactjs functional component that creates blocks with mouse config keys
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {array} group Keys group what will render
 * @param {function} renderKeyMap Callback function from GroupItem component that renders key buttons in grid container
 * @param {object} classButton className of buttons from parent component
 */
function MouseGroup(props) {
  const { group, classes, renderKeyMap, classButton } = props;
  return (
    <React.Fragment>
      <Grid item xs={2} md={4} className={classes.itemName}>
        <Button
          variant="contained"
          color="secondary"
          disabled
          className={classButton}
        >
          {group.groupName
            .slice(group.groupName.indexOf(" ") - group.groupName.length)
            .toUpperCase()}
        </Button>
      </Grid>
      <Grid item xs={10} md={8} className={classes.itemKeys}>
        {renderKeyMap(group, 4, 3)}
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(MouseGroup);
