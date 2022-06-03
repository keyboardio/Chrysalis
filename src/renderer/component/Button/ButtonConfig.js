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

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Style = Styled.div`

}
`;

const ButtonConfig = ({
  selected,
  onClick,
  size,
  buttonText,
  tooltip,
  tooltipPlacement,
  tooltipClassName,
  style,
  icoSVG,
  icoPosition,
  tooltipDelay,
  disabled
}) => {
  return (
    <>
      {tooltip ? (
        <OverlayTrigger
          placement={tooltipPlacement ? tooltipPlacement : "top"}
          delay={{ show: `${tooltipDelay ? tooltipDelay : "0"}`, hide: "0" }}
          overlay={
            <Tooltip id="tooltip-top" className={`${tooltipClassName ? tooltipClassName : "tooltipRegular"}`}>
              <div dangerouslySetInnerHTML={{ __html: tooltip }} />
            </Tooltip>
          }
        >
          <Style
            onClick={disabled ? () => {} : onClick}
            data-value={selected}
            className={`${size ? size : ""} ${selected ? "active" : ""}  button-config ${style ? style : ""} ${
              style ? style : ""
            } icon-${icoPosition ? icoPosition : "none"}`}
            disabled={disabled}
          >
            {icoSVG && icoPosition !== "right" ? icoSVG : ""}
            {buttonText && <span className={"buttonLabel"} dangerouslySetInnerHTML={{ __html: buttonText }} />}
            {icoSVG && icoPosition === "right" ? icoSVG : ""}
          </Style>
        </OverlayTrigger>
      ) : (
        <Style
          onClick={disabled ? () => {} : onClick}
          data-value={selected}
          className={`${size ? size : ""} ${selected ? "active" : ""} ${disabled ? "disabled" : ""}  button-config ${
            style ? style : ""
          } ${style ? style : ""} icon-${icoPosition ? icoPosition : "none"}`}
          disabled={disabled}
        >
          {icoSVG && icoPosition !== "right" ? icoSVG : ""}
          {buttonText && <span className={"buttonLabel"} dangerouslySetInnerHTML={{ __html: buttonText }} />}
          {icoSVG && icoPosition === "right" ? icoSVG : ""}
        </Style>
      )}
    </>
  );
};

export default ButtonConfig;
