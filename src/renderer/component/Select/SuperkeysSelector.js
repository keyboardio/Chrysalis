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
1;
import { NameModal } from "../Modal/"; // Imported custom modal component
import { RegularButton, ButtonConfig, ButtonSettings } from "../Button";

import { IconArrowsSmallSeparating, IconPen, IconAddNew, IconClone, IconDelete } from "../Icon";

const Style = Styled.div` 
display: flex;
.dropdownMultipleActions {
  min-width: 320px;
  max-width: 320px;
}
.dropdownListItemSelected {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.dropdownListItemInner {
    padding-right: 70px;
}
.dropdown-menu {
    min-width: 268px;
}
.itemIndex {
    display: inline-block;
    width: 28px;
    margin-right: 6px;
    text-align: right;
}
.button.outline.gradient {
  align-self: center;
  padding: 12px;
  padding-right: 18px;
  margin-left: 8px;
  .buttonFX {
    width: 50px;
  }
}
.noDropdown.dropdownMultipleActions {
    min-width: 350px;
    max-width: 350px;
    .dropdownActions {
      display: flex;
      flex-wrap: nowrap;
      background: rgba(123, 134, 158, 0.1);
      border-radius: 3px;
      top: 5px;
      right: 5px;
      height: 48px;
    }
  }
  .dropdownListItemInner {
    padding-right: 128px;
    .caret {
      right: 112px;
    }
  }
  .button-config {
    background: transparent;
    padding: 12px 8px;
    border: none;
    box-shadow: none;
  }
}

`;
class SuperKeysSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      showAdd: false
    };
  }

  toggleShow = () => {
    this.setState({ show: !this.state.show });
  };

  toggleShowAdd = () => {
    this.setState({ showAdd: !this.state.showAdd });
  };

  handleSave = data => {
    this.toggleShow();
    this.props.updateItem(data);
  };

  handleAdd = data => {
    this.toggleShowAdd();
    this.props.addItem(data);
  };

  render() {
    const { onSelect, itemList, selectedItem, deleteItem, addItem, cloneItem, subtitle } = this.props;
    const { show, showAdd } = this.state;

    return (
      <Style>
        <div className="itemListelector dropdownMultipleActions noDropdown">
          <Dropdown onSelect={value => onSelect(parseInt(value))} value={selectedItem} className="dropdownList">
            <Dropdown.Toggle className="toggler neuronToggler">
              <div className="dropdownListInner">
                <div className="dropdownListNumber">{itemList.length == 0 ? "#0" : `#${parseInt(selectedItem) + 1}`}</div>
                <div className="dropdownListItem">
                  <div className="dropdownListItemInner">
                    <div className="dropdownListItemLabel">{subtitle}</div>
                    <div className="dropdownListItemSelected">
                      {itemList == undefined || itemList.length == 0 || itemList.length <= selectedItem
                        ? i18n.dialog.loading
                        : itemList[selectedItem].name == ""
                        ? i18n.general.noname
                        : itemList[selectedItem].name}
                    </div>
                    <span className="caret">
                      <IconArrowsSmallSeparating />
                    </span>
                  </div>
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownMenu dropdownActionsIcons">
              {itemList.map((item, iter) => (
                <Dropdown.Item eventKey={iter} key={`item-${iter}`} className={iter === selectedItem ? "active" : ""}>
                  <span className="itemIndex">#{iter + 1}.</span>
                  {item.name == "" ? i18n.general.noname : item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="dropdownActions">
            <ButtonConfig
              onClick={this.toggleShow}
              icoSVG={<IconPen />}
              tooltip={i18n.app.menu.changeName}
              tooltipPlacement="bottom"
              tooltipDelay={600}
            />
            <ButtonConfig
              onClick={cloneItem}
              icoSVG={<IconClone />}
              tooltip={i18n.general.clone}
              tooltipPlacement="bottom"
              tooltipDelay={600}
            />
            <ButtonConfig
              onClick={deleteItem}
              icoSVG={<IconDelete />}
              tooltip={i18n.general.delete}
              tooltipPlacement="bottom"
              tooltipDelay={600}
            />
            {/* <Dropdown drop="down" align="end" className="dropdownActionsList">
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
            </Dropdown> */}
          </div>
        </div>
        <RegularButton
          icoSVG={<IconAddNew />}
          icoPosition="left"
          buttonText={i18n.general.new}
          style="outline gradient addNew"
          onClick={this.toggleShowAdd}
        />
        {itemList == undefined || itemList.length == 0 || itemList.length <= selectedItem ? (
          ""
        ) : (
          <NameModal
            show={show}
            name={itemList[selectedItem].name}
            toggleShow={this.toggleShow}
            handleSave={this.handleSave}
            modalTitle={`Change Superkey name`}
            labelInput={`Superkey name`}
          />
        )}
        <NameModal
          show={showAdd}
          name={""}
          toggleShow={this.toggleShowAdd}
          handleSave={this.handleAdd}
          modalTitle={`Create new Superkey name`}
          labelInput={`Supekey name`}
        />
      </Style>
    );
  }
}

export default SuperKeysSelector;
