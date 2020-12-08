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

import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  dragger: {
    height: 5,
    cursor: "row-resize",
    padding: "5px 0 0 ",
    borderTop: "1px solid #ddd",
    zIndex: 100,
    backgroundColor: "#f4f7f9"
  },
  children: {
    display: "block"
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0
  }
});

class ResizableSlide extends React.Component {
  state = {
    isResizing: false,
    lastDownY: 0,
    newHeight: {
      height: 224
    }
  };

  constructor(props) {
    super(props);
    this.handleMouseMove.bind(this);
  }

  handleMouseDown = e => {
    this.setState({
      isResizing: true,
      lastDownY: e.clientY
    });
    e.preventDefault();
  };

  handleMouseUp = e => {
    this.setState({
      isResizing: false
    });
    e.preventDefault();
  };

  handleMouseMove = e => {
    if (!this.state.isResizing) return;

    const offsetY = document.body.offsetHeight - e.clientY;
    if (offsetY > 15) this.setState({ newHeight: { height: offsetY } });
  };

  componentDidMount() {
    document.addEventListener("mousemove", e => this.handleMouseMove(e));
    document.addEventListener("mouseup", e => this.handleMouseUp(e));
  }

  render() {
    const { children, classes, className, ...props } = this.props;

    return (
      <Paper {...props} className={classes.root}>
        <div className={classes.root} style={this.state.newHeight}>
          <div
            className={classes.dragger}
            onMouseDown={event => {
              this.handleMouseDown(event);
            }}
          />
          <div className={className}>{children}</div>
        </div>
      </Paper>
    );
  }
}

const StyledResizableSlide = withStyles(styles)(ResizableSlide);

export { StyledResizableSlide as default };
