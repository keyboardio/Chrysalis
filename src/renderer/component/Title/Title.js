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
.tooltipIcon {
  color: var(--purple-100);
  padding-left: 8px;
  vertical-align: 2px;
  display: inline-block;
}
`;
const Title = ({ text, headingLevel, size, color, type, tooltip, theme }) => {
  let themeMode = theme ? "themeDark" : "themeLight";
  let Tag = "h" + headingLevel;

  return (
    <Style>
      <Tag className={`${size} ${themeMode}`}>
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
