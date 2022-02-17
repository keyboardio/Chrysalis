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

const Style = Styled.div`
&.button {
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5em;
  padding: 14px 24px;
  border-radius: 6px;
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
}
&.button-primary {
  color: #fff;
  background: linear-gradient(90deg, #FE007C 0%, #6B14F9 100%);
}
&.button-primary[disabled] {
  background: linear-gradient(90deg, #57617E -24.56%, #3F425A 79.82%);
  color: var(--gray-300);
  &:hover {
    cursor: not-allowed;
  }
}
&.button-outline {
  color: #fff;
  border: 1px solid var(--gray-400);
  box-shadow: 0px 0px 0px 1px var(--gray-400) inset;
  transition-property: border, box-shadow, background;
  transition: 300ms ease-in-out;
  &:hover {
    border: 1px solid var(--gray-300);
    box-shadow: 0px 0px 0px 1px var(--gray-300) inset;
    background-color: rgba(255,255,255,0.05);
  }
}
`;
//className={`icon-image ${selected ? "select" : ""}`}
const RegularButton = ({ selected, onClick, size, buttonText, style, icoSVG, theme, disabled }) => {
  return (
    <Style
      onClick={onClick}
      className={`${size} ${theme} ${selected ? "active" : ""} button button-${style}`}
      disabled={disabled}
    >
      <div className={"buttonLabel"} dangerouslySetInnerHTML={{ __html: buttonText }} />
    </Style>
  );
};

export default RegularButton;
