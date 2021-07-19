import React, { Component } from "react";

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { MdDeleteForever, MdInfo } from "react-icons/md";
import Styled from "styled-components";
import { LayerPicker } from "../KeyPicker";

const Style = Styled.div`
.type-card {
    min-height: 100%;
    padding: 0px;
}
.modbutton:not(:disabled):not(.disabled).active, .modbutton:not(:disabled):not(.disabled):active {
  border: 1px solid ${({ theme }) => theme.colors.button.disabled};
}
.modbutton {
  margin-right: 0.4em;
  border: 1px solid ${({ theme }) => theme.colors.button.disabled};
}
.modbuttonrow {
  margin-left: 0;
}
.chevron {
  align-self: center;
  font-size: 1.6rem;
  margin-top: 4px;
  margin-left: -10px;
}
.modchev {
  align-self: center;
  font-size: 1.6rem;
  margin-top: 4px;
}
.topelem {
  padding: 1em;
  background-color: ${({ theme }) => theme.colors.button.background};
}
.normalelem {
  padding: 1em 1em 0em 1em;
}
.disabled {
  color: ${({ theme }) => theme.colors.button.deselected};
}
.whitebg {
  background-color: ${({ theme }) => theme.card.background};
}
`;

class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.taps = ["TAP", "HOLD", "T&H", "2TAP", "2T&H"];

    this.Selection = this.Selection.bind(this);
  }

  Selection(action) {
    this.props.SelectAction(action);
    this.props.showKeyboard();
  }

  render() {
    const {
      selKeys,
      actions,
      action,
      modifs,
      SelectModif,
      onReplaceKey
    } = this.props;

    const element = this.taps.map((name, i) => {
      return (
        <Card.Body key={i} className={i === action ? "topelem" : "normalelem"}>
          <Row>
            <Col xs={10} onClick={e => this.Selection(i)}>
              <InputGroup className="mb-2">
                <InputGroup.Text>{name}</InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  className="whitebg"
                  value={selKeys[i]}
                  disabled
                />
              </InputGroup>
            </Col>
            <Col xs={1} className="p-0" onClick={e => onReplaceKey(0, i)}>
              <MdDeleteForever
                className={i !== action ? "chevron disabled" : "chevron"}
              />
            </Col>
            <Col xs={1} className="p-0">
              <MdInfo
                className={i !== action ? "chevron disabled" : "chevron"}
              />
            </Col>
          </Row>
          {actions != undefined && action == i ? (
            actions[action] >= 17492 && actions[action] <= 17502 ? (
              <React.Fragment>
                <Row className="modbuttonrow">
                  <LayerPicker
                    onKeySelect={e => onReplaceKey(e, -1)}
                    code={{
                      base: actions[action],
                      modified: 0
                    }}
                  />
                </Row>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Row className="modbuttonrow">
                  <Button
                    active={modifs[action].includes(0)}
                    className="modbutton"
                    onClick={e => SelectModif(0)}
                  >
                    Shift
                  </Button>
                  <Button
                    active={modifs[action].includes(1)}
                    className="modbutton"
                    onClick={e => SelectModif(1)}
                  >
                    Ctrl
                  </Button>
                  <Button
                    active={modifs[action].includes(2)}
                    className="modbutton"
                    onClick={e => SelectModif(2)}
                  >
                    Alt
                  </Button>
                  <Button
                    active={modifs[action].includes(3)}
                    className="modbutton"
                    onClick={e => SelectModif(3)}
                  >
                    Alt Gr
                  </Button>
                  <Button
                    active={modifs[action].includes(4)}
                    className="modbutton"
                    onClick={e => SelectModif(4)}
                  >
                    Win
                  </Button>
                  <MdInfo className="modchev" />
                </Row>
              </React.Fragment>
            )
          ) : (
            ""
          )}
        </Card.Body>
      );
    });

    return (
      <Style>
        <Card className="type-card">
          {element}
          {/* <Row>
            <Col xs={4}>
              <ButtonGroup vertical toggle>
                <ToggleButton
                  type="radio"
                  value={0}
                  checked={action === 0}
                  onChange={SelectAction}
                >
                  Tap
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  value={1}
                  checked={action === 1}
                  onChange={SelectAction}
                >
                  Hold
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  value={2}
                  checked={action === 2}
                  onChange={SelectAction}
                >
                  T&H
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  value={3}
                  checked={action === 3}
                  onChange={SelectAction}
                >
                  2Tap
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  value={4}
                  checked={action === 4}
                  onChange={SelectAction}
                >
                  2T&H
                </ToggleButton>
              </ButtonGroup>
            </Col>
            <Col xs={6}>
              <Card.Text>{selKeys[0]}</Card.Text>
              <Card.Text>{selKeys[1]}</Card.Text>
              <Card.Text>{selKeys[2]}</Card.Text>
              <Card.Text>{selKeys[3]}</Card.Text>
              <Card.Text>{selKeys[4]}</Card.Text>
            </Col>
            <Col xs={2}>
              <Button size="sm" onClick={e => onReplaceKey(0, 0)}>
                <MdDeleteForever />
              </Button>

              <Button size="sm" onClick={e => onReplaceKey(0, 1)}>
                <MdDeleteForever />
              </Button>

              <Button size="sm" onClick={e => onReplaceKey(0, 2)}>
                <MdDeleteForever />
              </Button>

              <Button size="sm" onClick={e => onReplaceKey(0, 3)}>
                <MdDeleteForever />
              </Button>

              <Button size="sm" onClick={e => onReplaceKey(0, 4)}>
                <MdDeleteForever />
              </Button>
            </Col>
          </Row> */}
        </Card>
      </Style>
    );
  }
}

export default Selector;
