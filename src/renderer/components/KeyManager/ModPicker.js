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

class ModPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderTooltip(line1, line2, line3, line4) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <span>{line1}</span>
        {line2 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line2}</span>
          </React.Fragment>
        )}
        {line3 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line3}</span>
          </React.Fragment>
        )}
        {line4 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line4}</span>
          </React.Fragment>
        )}
      </Tooltip>
    );
  }

  render() {
    const { actions, action, SelectModif, modifs, i } = this.props;

    const text1 =
      "Add any of these modifiers to the selected Key to create combinations such as Control Alt Del.";
    const text2 = "For mor complex combinations, you can use macros.";

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
            Win
          </Button>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip(text1, text2, "", "")}
          >
            <MdInfo className="modinfo" />
          </OverlayTrigger>
        </Row>
      </Style>
    );
  }
}

export default ModPicker;
