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
import Title from "../../component/Title";
import i18n from "../../i18n";
import Dropdown from "react-bootstrap/Dropdown";

const Style = Styled.div`
.cardContentNeuronData {
  border-radius: 6px;
  padding: 24px;
  background: ${({ theme }) => theme.styles.neuronData.neuronInfoBackground};
  box-shadow: ${({ theme }) => theme.styles.neuronData.neuronInfoBoxShadow};
}
.accordion .card {
  border: 1px solid ${({ theme }) => theme.styles.neuronData.accordionBorder};
  background: ${({ theme }) => theme.styles.neuronData.accordionCardBackground};
}
.accordion .card .card-header{
  padding: 12px 24px;
}
.accordion .card + .card {
  margin-top: -1px;
}
.accordionHeader {
  display: flex;
  position: relative;
  .plus {
    position: absolute;
    top: 50%;
    right: -12px;
    opacity: 0.5;
    transform: translate3d(0, -50%, 0);
  }
}
.accordionIcon + .accordionTitle {
  padding-left: 12px;
}
`;
const NeuronSelector = ({ onSelect, neurons, selectedNeuron, onClickDelete, onClick }) => {
  return (
    <Style>
      <div className="neuronSelector">
        <Dropdown onSelect={onSelect} value={selectedNeuron} className="fullWidth">
          <Dropdown.Toggle className="toggler neuronToggler">
            {neurons.length == 0
              ? i18n.keyboardSettings.neuronManager.noDefault
              : i18n.formatString(
                  i18n.keyboardSettings.neuronManager.neuron,
                  parseInt(selectedNeuron) + 1,
                  neurons[selectedNeuron].name
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
        <Dropdown className="icon">
          <Dropdown.Toggle className="toggler neuronToggler">Icon</Dropdown.Toggle>
          <Dropdown.Menu className="dropdownMenu">
            <Dropdown.Item>
              <div className="dropdownInner">
                <div className="dropdownIcon">Icon pen</div>
                <div className="dropdownItem">Change name</div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div className="dropdownInner">
                <div className="dropdownIcon">Icon trash</div>
                <div className="dropdownItem">Delete </div>
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Style>
  );
};

export default NeuronSelector;
