import React, { Component } from "react";
import Styled from "styled-components";

// Internal Components
import { LayerPicker } from "../KeyPicker";
import MacroPicker from "./MacroPicker";
import ModPicker from "./ModPicker";
import F13Picker from "./F13Picker";

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
  height: 320px;
  padding: 0;
}
.bin {
  align-self: center;
  font-size: 1.4rem;
  margin-top: 4px;
  color: ${({ theme }) => theme.card.icon};
}
.info {
  align-self: center;
  font-size: 1.2rem;
  margin-top: 4px;
  color: ${({ theme }) => theme.card.icon};
}
.modinfo {
  align-self: center;
  font-size: 1.2rem;
  margin-top: 4px;
  color: ${({ theme }) => theme.card.icon};
}
.topelem {
  padding: 1em;
  margin-top: 0.6em;
  background-color: ${({ theme }) => theme.card.backgroundActive};
  .row {
    margin-bottom: 0.4em;
  }
}
.normalelem {
  padding: 0.6em 1em 0em 1em;
}
.disabled {
  color: ${({ theme }) => theme.card.icon};
}
.whitebg {
  background-color: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.card.color};
}
.fixedheight {
  height: 30px;
}
.fixedwidth {
  width: 62px;
}
.namepicker {
  font-weight: 300;
}
.whitebgns {
  background-color: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.card.colorDisabled};
  height: 30px;
}
.notfocus {
  background-color: ${({ theme }) => theme.card.disabled};
  border-color: ${({ theme }) => theme.colors.button.borderColor};
  color: ${({ theme }) => theme.card.backgroundActive};
}
.keyselect {
  padding-right: 0;
}
.card-body {
  flex: none !important;
  padding: 0.5rem 1.25rem 0rem;
}
.titleheight {
  line-height: revert;
}
.overflowS {
  overflow-y: scroll;
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
class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.taps = ["TAP", "HOLD", "T&H", "2TAP", "2T&H"];

    this.Selection = this.Selection.bind(this);
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
      action,
      actions,
      modifs,
      selKeys,
      SelectModif,
      onReplaceKey,
      activeKB,
      AssignMacro,
      macros,
      superName,
      setSuperName
    } = this.props;

    const move1 = "Permanently move to a given layer.";
    const move2 =
      "To come back to the starting layer, set another Layer Lock key on the layer you moved to. This new Layer Lock key must target the initial layer.";
    let adjactions = actions;
    if (adjactions.length < 5) {
      while (adjactions.length < 5) {
        adjactions.push(0);
      }
    }
    const element = this.taps.map((name, i) => {
      return (
        <Card.Body key={i} className={i === action ? "topelem" : "normalelem"}>
          <Row>
            <Col xs={10} onClick={e => this.Selection(i)} className="keyselect">
              <InputGroup className="">
                <InputGroup.Text
                  className={`fixedheight fixedwidth ${
                    i !== action ? "notfocus" : ""
                  }`}
                >
                  {name}
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  className={`fixedheight ${
                    adjactions[i] <= 1 ? "whitebgns" : "whitebg"
                  }`}
                  value={adjactions[i] <= 1 ? "None Selected" : selKeys[i]}
                  disabled
                />
              </InputGroup>
            </Col>
            <Col xs={2} className="p-0" onClick={e => onReplaceKey(0, i)}>
              <MdDeleteForever
                className={i !== action ? "bin disabled" : "bin"}
              />
              {i !== action ? (
                ""
              ) : (
                <OverlayTrigger
                  rootClose
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
                  rootClose
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={this.renderTooltip([move1, move2])}
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
          actions[action] >= 104 &&
          actions[action] <= 115 ? (
            <F13Picker
              action={action}
              actions={actions}
              onReplaceKey={onReplaceKey}
            ></F13Picker>
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
              macros={macros}
            ></MacroPicker>
          ) : (
            ""
          )}
        </Card.Body>
      );
    });

    return (
      <Style>
        <Card className="type-card overflowS">
          <Card.Body>
            <Row className="m-0 py-1">
              <Col xs={12} className="px-0 text-center">
                <InputGroup className="">
                  <FormControl
                    id="nameSelectro"
                    className="fixedheight namepicker"
                    value={superName}
                    placeholder={
                      superName == ""
                        ? "Edit label (5 characters max)"
                        : superName
                    }
                    onChange={setSuperName}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
          {element}
        </Card>
      </Style>
    );
  }
}

export default Selector;
