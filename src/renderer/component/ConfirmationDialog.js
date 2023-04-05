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

import Modal from "react-bootstrap/Modal";

import i18n from "../i18n";

import { RegularButton } from "./Button";

const Styles = Styled.div`

`;

const ConfirmationDialog = props => {
  return (
    <Modal
      backdrop="static"
      show={props.open}
      onHide={props.onCancel}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Styles>
        <Modal.Header closeButton>
          <Modal.Title className="title">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">{props.text}</Modal.Body>
        <Modal.Footer>
          <RegularButton buttonText={i18n.dialog.cancel} style="outline" size="sm" onClick={props.onCancel} />
          <RegularButton buttonText={i18n.dialog.applyChanges} style="outline gradient" size="sm" onClick={props.onConfirm} />
        </Modal.Footer>
      </Styles>
    </Modal>
  );
};

export { ConfirmationDialog as default };
