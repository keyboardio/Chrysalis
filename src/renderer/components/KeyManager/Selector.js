import React, { Component } from "react";
import Styled from "styled-components";

// Internal Components

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Tooltip from "react-bootstrap/Tooltip";

// Media Components
// import darkTool from "../../../static/DarkSuperTooltip.png";

const Style = Styled.div`
.type-card {
  height: 290px;
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
  width: 100%;
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
.SuperKButton {
  button {
    margin: 0;
  }
}
.text-start {
  place-self: center;
  font-size: 18px;
  line-height: 18px;
}
.pickerRow {
  border-bottom: 1px solid;
  padding: 0rem 0.5rem 1rem 0.5rem;
  margin: 0rem 0rem 1rem 0rem;
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

  render() {
    const {
      action,
      actions,
      selKeys,
      onKeySelect,
      superkeys,
      keyCode
    } = this.props;

    const KC = keyCode.base + keyCode.modified;
    const superk = Array(superkeys.length)
      .fill()
      .map((_, i) => i + 53916);

    let adjactions = actions;
    if (adjactions.length < 5) {
      while (adjactions.length < 5) {
        adjactions.push(0);
      }
    }
    const listActions = this.taps.map((name, i) => {
      return (
        <Card.Body key={i} className="normalelem">
          <Row>
            <Col>
              <InputGroup className="">
                <InputGroup.Text className={`fixedheight fixedwidth "notfocus`}>
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

    const skSel = (
      <DropdownButton
        id="SuperPicker"
        drop={"up"}
        className="SuperKButton"
        title={
          superkeys[superk.indexOf(KC)] != undefined
            ? `${superk.indexOf(KC)} ${superkeys[superk.indexOf(KC)].name}`
            : ""
        }
        value={
          superkeys[superk.indexOf(KC)] != undefined
            ? superk[superk.indexOf(KC)]
            : ""
        }
        onSelect={value => {
          onKeySelect(parseInt(value));
        }}
      >
        {superk.map((x, id) => {
          return (
            <Dropdown.Item eventKey={x} key={`macro-${id}`} disabled={x == -1}>
              <div className="menuitem">
                <p>{`${id} ${superkeys[id].name}`}</p>
              </div>
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    );

    return (
      <Style>
        <Card className="type-card overflowS">
          <Card.Body>
            <Row className="pickerRow">
              <Col xs={4} className="px-0 text-start">
                <span>SUPERKEY</span>
              </Col>
              <Col xs={8} className="px-0">
                {skSel}
              </Col>
            </Row>
            <Row>{listActions}</Row>
          </Card.Body>
        </Card>
      </Style>
    );
  }
}

export default Selector;
