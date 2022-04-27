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
import { ButtonSettings } from "../Button";
import { IconArrowsSmallSeparating } from "../Icon";
import { IconPen } from "../Icon";
import { IconDelete } from "../Icon";

import { NameModal } from "../Modal/"; // Imported custom modal component

const Style = Styled.div`

`;
class NeuronSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  handleSave = data => {
    this.toggleShow();
    this.props.updateItem(data);
  };

  render() {
    const { onSelect, itemList, selectedItem, deleteItem, subtitle } = this.props;
    const { show } = this.state;

    return (
      <Style>
        <div className="itemListelector dropdownMultipleActions">
          <Dropdown onSelect={onSelect} value={selectedItem} className="dropdownList">
            <Dropdown.Toggle className="toggler neuronToggler">
              {itemList.length == 0 ? (
                i18n.keyboardSettings.neuronManager.defaultNeuron
              ) : (
                <div className="dropdownListInner">
                  <div className="dropdownListNumber">#{parseInt(selectedItem) + 1}</div>
                  <div className="dropdownListItem">
                    <div className="dropdownListItemInner">
                      <div className="dropdownListItemLabel">{subtitle}</div>
                      <div className="dropdownListItemSelected">
                        {itemList[selectedItem].name == "" ? i18n.general.noname : itemList[selectedItem].name}
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
              {itemList.map((item, iter) => (
                <Dropdown.Item eventKey={iter} key={`item-${iter}`} className={iter === selectedItem ? "active" : ""}>
                  {item.name == "" ? i18n.general.noname : item.name}
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
                <Dropdown.Item onClick={this.toggleShow}>
                  <div className="dropdownInner">
                    <div className="dropdownIcon">
                      <IconPen />
                    </div>
                    <div className="dropdownItem">Change name</div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item onClick={deleteItem}>
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
        <NameModal
          show={show}
          name={itemList[selectedItem].name}
          toggleShow={this.toggleShow}
          handleSave={this.handleSave}
          modalTitle={i18n.keyboardSettings.neuronManager.changeLayerTitle}
          labelInput={i18n.keyboardSettings.neuronManager.inputLabel}
        />
      </Style>
    );
  }
}

export default NeuronSelector;
