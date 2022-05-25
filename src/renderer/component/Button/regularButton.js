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

const RegularButton = ({ selected, onClick, size, buttonText, style, icoSVG, icoPosition, disabled }) => {
  return (
    <div
      onClick={disabled ? () => {} : onClick}
      className={`${size ? size : ""} ${selected ? "active" : ""} button ${style && style} iconOn${
        icoPosition ? icoPosition : "None"
      }`}
      disabled={disabled}
    >
      <div className={"buttonLabel"}>
        {icoSVG && icoPosition !== "right" ? icoSVG : ""}
        <span className={"buttonText"} dangerouslySetInnerHTML={{ __html: buttonText }} />
        {icoSVG && icoPosition === "right" ? icoSVG : ""}
      </div>
      <div className="buttonFX"></div>
    </div>
  );
};

RegularButton.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.string,
  buttonText: PropTypes.string,
  style: PropTypes.string,
  icoSVG: PropTypes.object,
  icoPosition: PropTypes.string,
  disabled: PropTypes.bool
};

export default RegularButton;
