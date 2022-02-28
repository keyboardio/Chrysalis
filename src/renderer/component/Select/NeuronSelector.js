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
import i18n from "../../i18n";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ButtonSettings } from "../Button";
import { RegularButton } from "../Button";
import { IconArrowsSmallSeparating } from "../Icon";
import { IconPen } from "../Icon";
import { IconDelete } from "../Icon";

const Style = Styled.div`

`;
const NeuronSelector = ({ onSelect, neurons, selectedNeuron, updateNeuronName, deleteNeuron }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ChangeNameModal = () => {
    return (
      <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Nueron name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" value={neurons[selectedNeuron].name} />
        </Modal.Body>
        <Modal.Footer>
          <RegularButton buttonText={"Discard changes"} style="outline" onClick={handleClose} />
          <RegularButton buttonText={"Save changes"} style="primary" onClick={updateNeuronName} />
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <Style>
      <div className="neuronSelector dropdownMultipleActions">
        <Dropdown onSelect={onSelect} value={selectedNeuron} className="dropdownList">
          <Dropdown.Toggle className="toggler neuronToggler">
            {neurons.length == 0 ? (
              i18n.keyboardSettings.neuronManager.defaultNeuron
            ) : (
              <div className="dropdownListInner">
                <div className="dropdownListNumber">#{parseInt(selectedNeuron) + 1}</div>
                <div className="dropdownListItem">
                  <div className="dropdownListItemInner">
                    <div className="dropdownListItemLabel">{i18n.keyboardSettings.neuronManager.neuronLabel}</div>
                    <div className="dropdownListItemSelected">
                      {neurons[selectedNeuron].name}
                      <span className="sr-only">
                        {i18n.formatString(
                          i18n.keyboardSettings.neuronManager.neuron,
                          parseInt(selectedNeuron) + 1,
                          neurons[selectedNeuron].name
                        )}
                      </span>
                    </div>
                    <span className="caret">
                      <IconArrowsSmallSeparating />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdownMenu">
            {neurons.map((neuron, iter) => (
              <Dropdown.Item
                eventKey={iter}
                key={`neuron-${iter}`}
                className={neuron.name === neurons[selectedNeuron].name ? "active" : ""}
              >
                {neuron.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="dropdownActions">
          <Dropdown drop="down" align="end" className="dropdownActionsList">
            <Dropdown.Toggle className="button-settings">
              <ButtonSettings />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownMenu">
              <Dropdown.Item onClick={handleShow}>
                <div className="dropdownInner">
                  <div className="dropdownIcon">
                    <IconPen />
                  </div>
                  <div className="dropdownItem">Change name</div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={deleteNeuron}>
                <div className="dropdownInner">
                  <div className="dropdownIcon">
                    <IconDelete />
                  </div>
                  <div className="dropdownItem">Delete</div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <ChangeNameModal />
    </Style>
  );
};

export default NeuronSelector;
