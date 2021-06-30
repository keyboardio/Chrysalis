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
import classNames from "classnames";

import Styled from "styled-components";
import { toast } from "react-toastify";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/DropdownItem";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { MdClose, MdCreate, MdInfo, MdBuild } from "react-icons/md";

import i18n from "../../i18n";

const Styles = Styled.div`
  .rout: {
    display: "flex",
    flexWrap: "wrap"
  }
`;

class MacroList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, macros, selected, changeSelected } = this.props;

    return (
      <Styles>
        <FormControl className={classes.formControl}>
          <Dropdown
            key={selected}
            select
            variant="outlined"
            value={selected}
            className={classNames(classes.margin, classes.textField)}
            label={i18n.editor.macros.selectMacro}
            onChange={e => {
              changeSelected(e.target.value);
            }}
          >
            {macros.map(item => (
              <DropdownItem value={item.id} key={`item-${item.id}`}>
                <div style={{ display: "flex" }}>
                  <p
                    inset
                    primary={`${("0" + item.id).substr(-2)} - ${item.name}`}
                    secondary={item.macro}
                  />
                </div>
              </DropdownItem>
            ))}
          </Dropdown>
        </FormControl>
      </Styles>
    );
  }
}

export default MacroList;
