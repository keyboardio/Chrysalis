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

`;
const NeuronSelector = ({ onSelect, neurons, selectedNeuron, onClickDelete, onClick }) => {
  return (
    <Style>
      <div className="neuronSelector dropdownMultipleActions">
        <Dropdown onSelect={onSelect} value={selectedNeuron} className="dropdownList">
          <Dropdown.Toggle className="toggler neuronToggler">
            {neurons.length == 0 ? (
              i18n.keyboardSettings.neuronManager.noDefault
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
          <Dropdown className="dropdownActionsList">
            <Dropdown.Toggle className="toggler">Icon</Dropdown.Toggle>
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
      </div>
    </Style>
  );
};

export default NeuronSelector;
