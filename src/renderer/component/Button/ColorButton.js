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
import PropTypes from "prop-types";
import Styled from "styled-components";

const Style = Styled.div` 
.colorIndicator {
  border-radius: 4px;
  border: 1px solid black;
  width: 24px;
  height: 24px;
  display: inline-block;
}
`;

const ColorButton = ({ selected, onClick, label, text, icoSVG, color }) => {
  const [disabled, setDisabled] = React.useState(true);
  React.useEffect(() => {
    if (color) {
      setDisabled(false);
    }
  }, [color]);

  return (
    <Style>
      <div
        onClick={disabled ? () => {} : onClick}
        className={`${selected ? "active" : ""} button buttonColor`}
        disabled={disabled}
      >
        <div className={"buttonIcon"}>
          {icoSVG ? icoSVG : null}
          {color ? <div className="colorIndicator" style={{ background: `${color.rgb}` }}></div> : null}
        </div>
        <div className={"buttonLabel"}>
          {label ? <div className="subtitle">{label}</div> : null}
          {text}
        </div>
      </div>
    </Style>
  );
};

ColorButton.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  text: PropTypes.string,
  icoSVG: PropTypes.object,
  color: PropTypes.object
};

export default ColorButton;
