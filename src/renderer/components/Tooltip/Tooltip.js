/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2021  Dygmalab, Inc.
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

// Bootstrap components
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdInfoOutline } from "react-icons/md";

const TooltipStyle = Styled.div`
text-align: left;
.ttip-p {
  margin: 0;
}
.ttip-h {
  margin: 0;
  font-size: 1.3em;
}
`;

export default class CTooltip extends Component {
  RenderToolTip(texts) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <TooltipStyle>
          {texts.map((tip, i) => {
            return (
              <React.Fragment key={`Tip-${i}`}>
                {tip[0] == "*" ? (
                  <React.Fragment>
                    {i == 0 ? "" : <br></br>}
                    <h5 className="ttip-h">{tip.substr(1)}</h5>
                  </React.Fragment>
                ) : tip == "%" ? (
                  <br />
                ) : (
                  <p className="ttip-p">{tip}</p>
                )}
              </React.Fragment>
            );
          })}
        </TooltipStyle>
      </Tooltip>
    );
  }
  RenderImgToolTip(image) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <img src={image}></img>
      </Tooltip>
    );
  }

  render() {
    const { texts, placement, img, type } = this.props;
    const textTooltip = (
      <OverlayTrigger rootClose placement={placement} delay={{ show: 250, hide: 400 }} overlay={this.RenderToolTip(texts)}>
        <MdInfoOutline className="info ml-2" />
      </OverlayTrigger>
    );
    const imgTooltip = (
      <OverlayTrigger rootClose placement={placement} delay={{ show: 250, hide: 400 }} overlay={this.RenderImgToolTip(img)}>
        <MdInfoOutline className="info ml-2" />
      </OverlayTrigger>
    );
    return type == "text" ? textTooltip : type == "img" ? imgTooltip : "";
  }
}
