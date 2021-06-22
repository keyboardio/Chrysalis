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
import Styled from "styled-components";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdClose, MdCheck, MdRefresh } from "react-icons/md";
import { CardColumns } from "react-bootstrap";

const Styles = Styled.div`

`;

class DialogTitle extends React.Component {
  render() {
    const { children, onClose, disabled } = this.props;
    return (
      <Card.Title disableTypography className={"classes.root"}>
        <h6>{children}</h6>
        {onClose ? (
          <Button
            className={"classes.closeButton"}
            disabled={disabled}
            onClick={onClose}
          >
            <MdClose />
          </Button>
        ) : null}
      </Card.Title>
    );
  }
}
class CustomDialog extends React.Component {
  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    return (
      <Card
        onClose={this.handleClose}
        open={this.props.open}
        maxWidth="md"
        disableEscapeKeyDown={true}
      >
        {this.props.title}
        <Card.Body>{this.props.children}</Card.Body>
        {this.props.countdown !== null && (
          <Card.Body>
            {this.props.countdown < 0 ? (
              <React.Fragment />
            ) : (
              {
                /* <Countdown>{this.props.countdown}</Countdown> */
              }
            )}
            <Button
              onClick={this.props.countdown !== 0 ? this.props.upload : null}
              variant="contained"
              color={this.props.countdown ? "primary" : "secondary"}
              disabled={this.props.countdown !== 0 ? this.props.disabled : null}
            >
              {this.props.buttonText}
            </Button>
          </Card.Body>
        )}
      </Card>
    );
  }
}

export default CustomDialog;
