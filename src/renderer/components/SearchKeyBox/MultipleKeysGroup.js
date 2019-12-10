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
/**
 * This is Reactjs functional component that change key value on the keyboard layout
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MouseGroup from "./MouseGroup";

MultipleKeysGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  renderKeyMap: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  classButton: PropTypes.string.isRequired
};

const styles = () => ({
  container: {
    padding: "0 2px"
  }
});

/**
 * Reactjs functional component that creates blocks with two or other keys group
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {array} groups Keys groups what will render
 * @param {function} renderKeyMap Callback function from GroupItem component that renders key buttons in grid container
 * @param {object} classButton className of buttons from parent component
 */
function MultipleKeysGroup(props) {
  const { groups, renderKeyMap, classes, classButton } = props;
  return (
    <Grid container>
      {groups.map(group => (
        <React.Fragment key={group.groupName}>
          {group.groupName.includes("Mouse") ? (
            <MouseGroup
              group={group}
              renderKeyMap={renderKeyMap}
              classButton={classButton}
            />
          ) : (
            <Grid item xs={12}>
              {renderKeyMap(group, 3, 2, classes.container)}
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
}

export default withStyles(styles)(MultipleKeysGroup);
