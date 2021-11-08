import React, { Component } from "react";
import Styled from "styled-components";

// Local components

// React Components
import Tooltip from "react-bootstrap/Tooltip";

// Media

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

export default class renderImgTooltip extends Component {
  render() {
    const { image, ...props } = this.props;
    return (
      <Tooltip id="select-tooltip" className="longtooltip" {...props}>
        <img src={image}></img>
      </Tooltip>
    );
  }
}
