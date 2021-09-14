import React, { Component } from "react";
import Styled from "styled-components";

// React Boostrap Components
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdInfo } from "react-icons/md";

const Style = Styled.div`
.modbutton:not(:disabled):not(.disabled).active, .modbutton:not(:disabled):not(.disabled):active {
  border: 1px solid ${({ theme }) => theme.colors.button.borderColor};
}
.modbutton {
  margin-right: 0.4em;
  border: 1px solid ${({ theme }) => theme.colors.button.disabled};
  padding: .375rem .55rem;
}
.modbutton.focus, .modbutton:focus {
  background-color: ${({ theme }) => theme.colors.button.deselected};
  border-color: ${({ theme }) => theme.colors.button.borderColor};
  box-shadow: none;
}
.modbuttonrow {
  margin-left: 0;
}
.modinfo {
  align-self: center;
  font-size: 1.2rem;
  margin-top: 4px;
  color: #666;
}
`;
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

class ModPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderTooltip(tooltips) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <TooltipStyle>
          {tooltips.map((tip, i) => {
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

  render() {
    const { actions, action, SelectModif, modifs, i } = this.props;

    const text1 = "Key combined with modifier";
    const text2 =
      "Add any of these modifiers to the selected Key to create combinations such as Control Alt Del.";
    const text3 = "More options";
    const text4 = "For more complex combinations, you can use macros.";

    return (
      <Style>
        <Row className="modbuttonrow">
          <Button
            active={modifs[action].includes(0)}
            className="modbutton"
            onClick={e => SelectModif(0)}
            disabled={actions[i] == 0 ? true : false}
          >
            Shift
          </Button>
          <Button
            active={modifs[action].includes(1)}
            className="modbutton"
            onClick={e => SelectModif(1)}
            disabled={actions[i] == 0 ? true : false}
          >
            Ctrl
          </Button>
          <Button
            active={modifs[action].includes(2)}
            className="modbutton"
            onClick={e => SelectModif(2)}
            disabled={actions[i] == 0 ? true : false}
          >
            Alt
          </Button>
          <Button
            active={modifs[action].includes(3)}
            className="modbutton"
            onClick={e => SelectModif(3)}
            disabled={actions[i] == 0 ? true : false}
          >
            Alt Gr
          </Button>
          <Button
            active={modifs[action].includes(4)}
            className="modbutton"
            onClick={e => SelectModif(4)}
            disabled={actions[i] == 0 ? true : false}
          >
            O.S.
          </Button>
          <OverlayTrigger
            rootClose
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip([text1, text2, text3, text4])}
          >
            <MdInfo className="modinfo" />
          </OverlayTrigger>
        </Row>
      </Style>
    );
  }
}

export default ModPicker;
