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
import Form from "react-bootstrap/Form";

import Title from "../Title";

const Style = Styled.div`
&.customCheckbox {
    .customCheckboxInner {
        display: flex;
        flex-wrap: nowrap;
    }
    label,
    label h6 {
        margin-bottom: 0;
    }	
    label:hover {
        cursor: pointer;
    }
    label h6 {
        line-height: 32px;
    }
    .tooltipIcon {
        vertical-align: 0;
    }
    input[type=checkbox], input[type=radio] {
        display: none;
    }
    .form-check {
        padding-left: 26px;
    }
    .form-check:before,
    .form-check:after {
        content: "";
        position: absolute;
        transition: 300ms ease-in-out;
        display: inline-block;
        transform: translate3d(0, -50%, 0);
        top: 50%;
        left: 0;
    }
    .form-check::before {
        width: 18px;
        height: 18px;
        border-radius: 4px; 
        transition-property: border;
    }
    .form-check::after {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        margin-left: 4px;
        transition-property: background;
    }   
}
&:hover {
    cursor: pointer;
}
`;

const CustomRadioCheckBox = ({
  label,
  type,
  id,
  name,
  tooltip,
  tooltipDelay,
  tooltipPlacement,
  className,
  onClick,
  disabled,
  checked
}) => {
  return (
    <Style className={`customCheckbox ${className}`} onClick={onClick}>
      <div className="customCheckboxInner" id={`input-${id}`}>
        <Form.Check type={type} id={`input-${id}-${type}`} name={name} disabled={disabled ? disabled : false} checked={checked} />
        <label htmlFor={`input-${id}-${type}`}>
          <Title text={label} tooltip={tooltip} headingLevel={6} />
        </label>
      </div>
    </Style>
  );
};

export default CustomRadioCheckBox;
