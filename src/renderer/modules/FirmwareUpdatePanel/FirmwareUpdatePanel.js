// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
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
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import i18n from "../../i18n";

import WhatsNew from "../WhatsNew";

const Style = Styled.div`

`;

const FirmwareUpdatePanel = ({ versions, currentlyRunning, latestAvailable, onClick, advancedUsers, onClickToggleAdvanced }) => {
  return (
    <Style>
      <div className="firmware-wrapper home-firmware">
        <Card className="firmware-card">
          <Card.Header className="header">
            {versions ? i18n.firmwareUpdate.texts.versionExists : i18n.firmwareUpdate.texts.versionNotExists}
          </Card.Header>
          <Card.Body className="body d-flex flex-column">
            <Card.Title className="title">
              Updating your Raise firmware is how we implement new cool features and bug fixes.
            </Card.Title>
            {currentlyRunning}
            {latestAvailable}
          </Card.Body>
          <Row className="mt-auto">
            <Col xs={6} className="flashingcol">
              <Button className="custombutton outlined pr-1" size="lg" onClick={onClickToggleAdvanced}>
                {i18n.firmwareUpdate.texts.advUsers}
              </Button>
            </Col>
            <Col xs={6} className="flashingcol">
              <Button className="flashingbutton nooutlined" size="lg" onClick={onClick}>
                {i18n.firmwareUpdate.flashing.button}
              </Button>
            </Col>
          </Row>
          <Row className="mt-auto">{advancedUsers}</Row>
        </Card>
        <WhatsNew />
      </div>
    </Style>
  );
};

export default FirmwareUpdatePanel;
