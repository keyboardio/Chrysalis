// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
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

import React, { Component } from "react";

import Styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { MdSave, MdDeleteForever, MdAdd, MdBuild } from "react-icons/md";

import i18n from "../../i18n";

const Styles = Styled.div`
width: -webkit-fill-available;
display: flex;
height 40px;
.selected {
  background-color: white;
  color: dimgrey;
}
.listItem {
  background-color: inherit !important;
}
.menuitem {

}
.textholder{
  padding-left: 1rem;
}
.textitem {
  line-height: 41px;
  font-size: 26px;
  margin: 0;
}
button#SKpicker {
}
.fullheight {
  height 100%;
}
.SPpbutton {
  button {
    width: -webkit-fill-available;
    margin: 0;
    text-align: start;
    height: 100%;
    background-color: transparent;
    border: 2px solid #999;
    font-weight: 200;
  }
  button::after {
    position: absolute;
    margin-left: .255em;
    right: 13px;
    top: 18px;
  }
}
.SKcontrols {
  button {
    background-color: transparent;
    color: ${({ theme }) => theme.card.altColor};
    margin: 0;
    padding: 0;
    padding-left: 0.5rem;
    .iconAdd {
      font-size: 1.8rem;
    }
    .iconDelete {
      font-size: 1.6rem;
    }
  }
}
.pickerContainer {
  width: 250px;
}
`;

class SuperkeyPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { superkeys, selected, changeSelected } = this.props;

    return (
      <Styles>
        <div className="textholder">
          <p className="textitem">Superkey</p>
        </div>
        <div className="pickerContainer">
          <DropdownButton
            id="SKpicker"
            className="SPpbutton fullheight pl-3"
            drop={"down"}
            title={superkeys.map(item => {
              if (selected == item.id) return `${item.id + 1} ${item.name}`;
            })}
            value={superkeys.map(item => {
              if (selected == item.id) return item.id;
            })}
            onSelect={value => changeSelected(parseInt(value))}
          >
            {superkeys.map(item => (
              <Dropdown.Item eventKey={item.id} key={`SKp-${item.id}`} disabled={item.id == -1}>
                <div className="menuitem">
                  <p>{`${item.id + 1} ${item.name}`}</p>
                </div>
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="SKcontrols">
          <Button onClick={this.props.addSuperkey} className="save-button fullheight">
            <MdAdd className="iconAdd" />
          </Button>
          <Button onClick={this.props.deleteSuperkey} className="save-button fullheight">
            <MdDeleteForever className="iconDelete" />
          </Button>
        </div>
      </Styles>
    );
  }
}

export default SuperkeyPicker;
