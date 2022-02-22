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
svg {
  margin-right: 10px;
}
`;

const ButtonConfig = ({ selected, onClick, size, buttonText, style, icoSVG, disabled }) => {
  return (
    <Style
      onClick={onClick}
      data-value={selected}
      className={`${size} ${selected ? "active" : ""} button-config ${style}`}
      disabled={disabled}
    >
      {icoSVG ? icoSVG : ""}
      <span className={"buttonLabel"} dangerouslySetInnerHTML={{ __html: buttonText }} />
    </Style>
  );
};

export default ButtonConfig;
