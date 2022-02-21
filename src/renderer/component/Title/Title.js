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
import { IconInformationBubble } from "../Icon";
import LightWarning from "../../../../static/base/light-warning.png";

const Style = Styled.div`
.lg {
	font-size:81px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
.md {
	font-size:54px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
h1 {
	font-size:36px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
h2 {
	font-size:24px;
	font-family:"Libre Franklin";
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
h3 {
	font-size:21px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
h4 {
	font-size:18px;
	font-weight:600;
	letter-spacing:-0.03em;
	text-decoration:none;
}
h5 {
	font-size:12px;
	font-weight:600;
	line-height:125%;
	letter-spacing:0.04em;
	text-decoration:none;
  text-transform: uppercase;
}
.hasIcon svg {
	margin-right: 12px;
	vertical-align: -0.2em;
}
.tooltipIcon {
  color: var(--purple-100);
  padding-left: 8px;
  vertical-align: 2px;
  display: inline-block;
}
.warning {
	position: relative;
	color: var(--brand-warning-lighter);
}
.warning:before {
	content: "";
	position: absolute;
	left: -32px;	
	top: 50%;
	background-image: url(${LightWarning});
	background-repeat: no-repeat;
	width: 32px;
	height: 96px;
	transform: translate3d(0, -50%, 0);
}
.warning:after {
	content: "";
	position: absolute;
	left: -35px;	
	top: 50%;
	width: 3px;
	height: 24px;
	background: linear-gradient(180deg, #FE007C 0%, #FF9F43 0.01%, #FECA57 100%);
	border-radius: 3px 0px 0px 3px;	
	transform: translate3d(0, -50%, 0);
}

`;
const Title = ({ text, headingLevel, size, color, type, tooltip, svgICO }) => {
  let Tag = "h" + headingLevel;

  return (
    <Style>
      <Tag className={`${size ? size : ""} ${type ? type : ""} ${color ? color : ""} ${svgICO && "hasIcon"}`}>
        {svgICO && svgICO}
        <span dangerouslySetInnerHTML={{ __html: text }} />
        {tooltip && (
          <>
            <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top">{tooltip}</Tooltip>}>
              <span className="tooltipIcon">
                <IconInformationBubble />
              </span>
            </OverlayTrigger>
          </>
        )}
      </Tag>
    </Style>
  );
};

export default Title;
