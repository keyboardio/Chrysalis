// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
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
import Styled from "styled-components";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdSave, MdCheck, MdRefresh } from "react-icons/md";
import i18n from "../i18n";

const Styles = Styled.div`

`;

class SaveChangesButton extends React.Component {
  state = {
    inProgress: false,
    success: false
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = async event => {
    this.setState(
      {
        inProgress: true
      },
      async () => {
        await this.props.onClick(event);
        this.setState({
          success: this.props.isBeginUpdate ? !this.props.isBeginUpdate : true,
          inProgress: false
        });
        this.timer = setTimeout(() => {
          this.setState({ success: false });
        }, 2000);
      }
    );
  };

  render() {
    const { inProgress, success } = this.state;
    const { successMessage } = this.props;

    const textPart = !this.props.floating && (
      <span>
        {success
          ? successMessage || i18n.components.save.success
          : this.props.children}
      </span>
    );

    const icon = this.props.icon || <MdSave />;

    return (
      <Styles>
        <Container fluid>
          <Row>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={"save-tooltip"}>
                  Save your layer modifications to the raise.
                </Tooltip>
              }
            >
              <Button
                disabled={inProgress || (this.props.disabled && !success)}
                variant="primary"
                onClick={this.handleButtonClick}
              >
                <Col>
                  <h5>
                    {inProgress ? (
                      <Spinner
                        as="span"
                        variant="primary"
                        animation="border"
                        size="sm"
                        role="status"
                      />
                    ) : success ? (
                      <MdCheck />
                    ) : (
                      icon
                    )}
                    {textPart}
                  </h5>
                </Col>
              </Button>
            </OverlayTrigger>
          </Row>
        </Container>
      </Styles>
    );
  }
}

export default SaveChangesButton;
