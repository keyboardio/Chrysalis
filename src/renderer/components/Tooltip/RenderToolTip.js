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

export default class renderTooltip extends Component {
  render() {
    const { texts, ...props } = this.props;
    return (
      <Tooltip id="select-tooltip" className="longtooltip" {...props}>
        <TooltipStyle>
          {texts.map((tip, i) => {
            return (
              <React.Fragment key={`Tip-${i}`}>
                {i % 2 == 1 || !isNaN(tip[0]) ? (
                  <p className="ttip-p">{tip}</p>
                ) : (
                  <React.Fragment>
                    {i == 0 ? "" : <br></br>}
                    <h5 className="ttip-h">{tip}</h5>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </TooltipStyle>
      </Tooltip>
    );
  }
}
