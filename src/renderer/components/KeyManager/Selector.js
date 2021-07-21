import React, { Component } from "react";
import Styled from "styled-components";

// Internal Components
import { LayerPicker } from "../KeyPicker";
import MacroPicker from "./MacroPicker";
import ModPicker from "./ModPicker";

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import { MdDeleteForever, MdInfo } from "react-icons/md";

// Media Components
import lightTool from "../../../../static/DarkSuperTooltip.png";
// import darkTool from "../../../static/DarkSuperTooltip.png";

const Style = Styled.div`
.type-card {
    min-height: 100%;
    padding: 0;
    padding-top: 0.6em;
}
.bin {
  align-self: center;
  font-size: 1.4rem;
  margin-top: 4px;
  margin-left: -10px;
  color: #666;
}
.info {
  align-self: center;
  font-size: 1.2rem;
  margin-top: 4px;
  margin-left: -10px;
  color: #666;
}
.modinfo {
  align-self: center;
  font-size: 1.2rem;
  margin-top: 4px;
  color: #666;
}
.topelem {
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.button.background};
}
.normalelem {
  padding: 0.6em 1em 0em 1em;
}
.disabled {
  color: ${({ theme }) => theme.colors.button.deselectedText};
}
.whitebg {
  background-color: ${({ theme }) => theme.card.background};
}
.whitebgns {
  background-color: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.card.disabled};
}
.openkb {
  background-color: ${({ theme }) => theme.colors.button.active};
  border-color: ${({ theme }) => theme.colors.button.borderColor};
}
`;

class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.taps = ["TAP", "HOLD", "T&H", "2TAP", "2T&H"];

    this.Selection = this.Selection.bind(this);
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

  renderImgTooltip(img) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <img src={img}></img>
      </Tooltip>
    );
  }

  Selection(action) {
    this.props.SelectAction(action);
    if (this.props.action == action) {
      this.props.showKeyboard();
    }
  }

  render() {
    const {
      selKeys,
      actions,
      action,
      modifs,
      SelectModif,
      onReplaceKey,
      activeKB,
      AssignMacro
    } = this.props;

    const move1 = "Permanently move to a given layer.";
    const move2 =
      "To come back to the starting layer, set another Layer Lock key on the layer you moved to. This new Layer Lock key must target the initial layer.";

    const element = this.taps.map((name, i) => {
      return (
        <Card.Body key={i} className={i === action ? "topelem" : "normalelem"}>
          <Row>
            <Col xs={10} onClick={e => this.Selection(i)}>
              <InputGroup className="mb-2">
                <InputGroup.Text
                  className={i === action && activeKB ? "openkb" : ""}
                >
                  {name}
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  className={actions[i] == 0 ? "whitebgns" : "whitebg"}
                  value={actions[i] == 0 ? "None Selected" : selKeys[i]}
                  disabled
                />
              </InputGroup>
            </Col>
            <Col xs={1} className="p-0" onClick={e => onReplaceKey(0, i)}>
              <MdDeleteForever
                className={i !== action ? "bin disabled" : "bin"}
              />
            </Col>
            <Col xs={1} className="p-0">
              {i !== action ? (
                ""
              ) : (
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={this.renderImgTooltip(lightTool)}
                >
                  <MdInfo className={i !== action ? "info disabled" : "info"} />
                </OverlayTrigger>
              )}
            </Col>
          </Row>
          {actions != undefined &&
          action == i &&
          actions[action] >= 17492 &&
          actions[action] <= 17502 ? (
            <React.Fragment>
              <Row className="modbuttonrow">
                <LayerPicker
                  onKeySelect={e => onReplaceKey(e, -1)}
                  code={{
                    base: actions[action],
                    modified: 0
                  }}
                />
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={this.renderTooltip(move1, move2, "", "")}
                >
                  <MdInfo className="info" />
                </OverlayTrigger>
              </Row>
            </React.Fragment>
          ) : (
            ""
          )}
          {actions != undefined &&
          action == i &&
          actions[action] &&
          actions[action] >= 4 &&
          actions[action] <= 10000 ? (
            <ModPicker
              action={action}
              actions={actions}
              modifs={modifs}
              SelectModif={SelectModif}
              i={i}
            />
          ) : (
            ""
          )}
          {actions != undefined &&
          action == i &&
          actions[action] &&
          actions[action] >= 53852 &&
          actions[action] <= 53852 + 64 ? (
            <MacroPicker
              action={action}
              actions={actions}
              AssignMacro={AssignMacro}
            ></MacroPicker>
          ) : (
            ""
          )}
        </Card.Body>
      );
    });

    return (
      <Style>
        <Card className="type-card overflow">{element}</Card>
      </Style>
    );
  }
}

export default Selector;
