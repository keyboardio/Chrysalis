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

import React, { useState } from "react";
import i18n from "../../i18n";

//React Bootstrap components
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export const CopyFromDialog = props => {
  const [selectedLayer, setSelectedLayer] = useState(-1);
  return (
    <Modal backdrop="static" show={props.open} onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.editor.copyFrom}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{i18n.editor.pleaseSelectLayer}</h4>
        <ListGroup variant="flush">
          {props.layers.map(layer => {
            return (
              <ListGroup.Item
                key={layer.index}
                action
                disabled={layer.index == props.currentLayer}
                selected={layer.index == selectedLayer}
                onClick={() => {
                  setSelectedLayer(layer.index);
                }}
              >
                {layer.label}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="primary"
          onClick={() => {
            setSelectedLayer(-1);
            props.onCancel();
          }}
        >
          {i18n.dialog.cancel}
        </Button>
        <Button
          onClick={() => {
            const layer = selectedLayer;
            setSelectedLayer(-1);
            props.onCopy(layer);
          }}
          color="primary"
          disabled={selectedLayer == -1}
        >
          {i18n.dialog.ok}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
