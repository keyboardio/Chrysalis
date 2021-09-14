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

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import MultipleKeysGroup from "./MultipleKeysGroup";

GroupItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  group: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    keys: PropTypes.array
  }).isRequired,
  keySelect: PropTypes.func.isRequired,
  selectedKeyCode: PropTypes.number.isRequired,
  numderContGrids: PropTypes.number.isRequired,
  numderLgItemsGrids: PropTypes.number.isRequired,
  numderMdItemsGrids: PropTypes.number.isRequired
};

const styles = theme => ({
  wrapper: {
    border: 1,
    marginBottom: 3
  },
  background: {
    height: "100%",
    margin: "0 5px",
    [theme.breakpoints.down("md")]: {
      paddingBottom: 8
    }
  },
  root: {
    display: "flex",
    justifyСontent: "space-evenly",
    padding: "0 2px"
  },
  button: {
    margin: 3,
    padding: 1,
    minWidth: "50px",
    width: "90%",
    borderColor: "#darkgray", //  TODO changing this to a palette color or elevation?
    fontSize: "0.7rem",
    fontWeight: 900
  },
  paper: {
    padding: theme.spacing(),
    textAlign: "left",
    color: "black",
    marginBottom: 4,
    font: "800 15px Arial",
    backgroundColor: "#c7c4c496" //  TODO changing this to a palette color or elevation?
  }
});

const isTransparent = key => key === "Transparent";

/**
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {object} group Keys group
 * @param {function} keySelect Callback function from Editor component that change key's value on the keyboard layout
 * @param {boolean} isUnited Is multiple group
 * @param {number} selectedKeyCode Property - new key's code we can change keyboard layout (highlight it in red).
 * @param {number} numderContGrids Defines the number of grids the container grid component is going to use.
 * @param {number} numderLgItemsGrids Defines the number of grids the item grid component is going to use in lg breakpoints.
 * @param {number} numderMdItemsGrids Defines the number of grids the item grid component is going to use in md breakpoints.
 */

function GroupItem(props) {
  const {
    classes,
    group,
    keySelect,
    isUnited,
    selectedKeyCode,
    numderContGrids,
    numderLgItemsGrids,
    numderMdItemsGrids
  } = props;

  /**
   * Renders key buttons
   * @param {object} group Keys group
   * @param {number} md Type of md prop
   * @param {number} lg Type of lg prop
   */
  const keyMap = (group, md, lg) =>
    group.keys.map(key => {
      const {
        code,
        labels: { primary, verbose }
      } = key;
      return (
        <React.Fragment key={code}>
          {primary || isTransparent(verbose) ? (
            <Grid
              id={code}
              item
              md={md}
              lg={lg}
              className={classes.key}
              onClick={() => keySelect(code)}
            >
              <Tooltip title={verbose || primary}>
                <Button
                  variant={code === selectedKeyCode ? "contained" : "outlined"}
                  color={code === selectedKeyCode ? "primary" : "default"}
                  className={classes.button}
                >
                  {primary || (isTransparent(verbose) && "Transp.")}
                </Button>
              </Tooltip>
            </Grid>
          ) : null}
        </React.Fragment>
      );
    });

  /**
   * Renders key buttons in grid container
   * @param {object} group Keys group
   * @param {number} md Type of md prop
   * @param {number} lg Type of lg prop
   * @param {string} className Class name for grid container
   */
  const renderKeyMap = (group, md, lg, className) => (
    <Grid container className={className}>
      {keyMap(group, md, lg)}
    </Grid>
  );

  return (
    <Grid item md={numderContGrids} sm={12} className={classes.wrapper}>
      <Paper className={classes.background}>
        <Paper className={classes.paper} xs={12}>
          {group.displayName.toUpperCase()}
        </Paper>
        {isUnited ? (
          <MultipleKeysGroup
            groups={group.innerGroup}
            renderKeyMap={renderKeyMap}
            classButton={classes.button}
          />
        ) : (
          <React.Fragment>
            {renderKeyMap(
              group,
              numderMdItemsGrids,
              numderLgItemsGrids,
              classes.root
            )}
          </React.Fragment>
        )}
      </Paper>
    </Grid>
  );
}

// export default React.memo(withStyles(styles)(GroupItem));
export default withStyles(styles)(GroupItem);
