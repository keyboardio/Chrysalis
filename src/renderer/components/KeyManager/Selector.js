import React, { Component } from "react";
import Styled from "styled-components";

// Internal Components

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Tooltip from "react-bootstrap/Tooltip";

// Media Components
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
  overflow-y: auto;
}
.overflowS::-webkit-scrollbar {
  display: none;
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
    const { action, actions, selKeys, superName, setSuperName } = this.props;

    let adjactions = actions;
    if (adjactions.length < 5) {
      while (adjactions.length < 5) {
        adjactions.push(0);
      }
    }
    const superKeys = this.taps.map((name, i) => {
      return (
        <Card.Body key={i} className={i === action ? "topelem" : "normalelem"}>
          <Row>
            <Col>
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
          </Row>
        </Card.Body>
      );
    });

    return (
      <Style>
        <Card className="type-card overflowS">
          <Card.Body>
            <Row className="m-0 py-1">
              <Col xs={12} className="px-0 text-start">
                <span>{`SUPERKEY: ${superName}`}</span>
              </Col>
            </Row>
          </Card.Body>
          {superKeys}
          <Button>Change superkey</Button>
        </Card>
      </Style>
    );
  }
}

export default Selector;
