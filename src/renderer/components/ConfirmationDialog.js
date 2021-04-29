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

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import i18n from "../i18n";

const ConfirmationDialog = props => {
  return (
    <Modal backdrop="static" show={props.open} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.text}</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onCancel}
          className="mr-auto"
          variant="secondary"
        >
          {i18n.dialog.cancel}
        </Button>
        <Button onClick={props.onConfirm} variant="primary">
          {i18n.dialog.ok}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ConfirmationDialog as default };
