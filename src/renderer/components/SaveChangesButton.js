// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import CheckIcon from "@mui/icons-material/Check";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import withStyles from "@mui/styles/withStyles";
import i18n from "@renderer/i18n";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const styles = (theme) => ({
  buttonSuccess: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
    },
  },
  fabProgress: {
    color: theme.palette.success.main,
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: theme.palette.success.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  fab: {
    position: "fixed",
    justifyContent: "flex-end",
    bottom: 0,
    left: theme.spacing(4),
    zIndex: theme.zIndex.drawer + 1,
  },
});

class SaveChangesButton extends React.Component {
  state = {
    inProgress: false,
    success: false,
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = async (event) => {
    this.setState(
      {
        inProgress: true,
      },
      async () => {
        await this.props.onClick(event);
        this.setState({
          success: true,
          inProgress: false,
        });
        this.timer = setTimeout(() => {
          this.setState({ success: false });
        }, 2000);
      }
    );
  };

  render() {
    const { inProgress, success } = this.state;
    const { classes, successMessage } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    const textPart = !this.props.floating && (
      <Box className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={inProgress || (this.props.disabled && !success)}
          onClick={this.handleButtonClick}
        >
          {success
            ? successMessage || i18n.t("components.save.success")
            : this.props.children}
        </Button>
      </Box>
    );

    const icon = this.props.icon || <SaveAltIcon />;

    const OptionalTooltip = (props) => {
      if (this.props.floating) {
        return <Tooltip title={this.props.children}>{props.children}</Tooltip>;
      }
      return props.children;
    };

    return (
      <OptionalTooltip>
        <Box
          className={classNames(
            classes.root,
            this.props.className,
            this.props.floating && classes.fab
          )}
        >
          <Box className={classNames(classes.wrapper, classes.icon)}>
            <Fab
              disabled={inProgress || (this.props.disabled && !success)}
              color="primary"
              className={buttonClassname}
              classes={{ disabled: classes.disabled }}
              onClick={this.handleButtonClick}
            >
              {success ? <CheckIcon /> : icon}
            </Fab>
            {inProgress && (
              <CircularProgress size={68} className={classes.fabProgress} />
            )}
          </Box>
          {textPart}
        </Box>
      </OptionalTooltip>
    );
  }
}

SaveChangesButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SaveChangesButton);
