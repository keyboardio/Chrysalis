import React, { Component } from "react";

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";

const Style = Styled.div`
.type-card {
    min-height: 100%;
}
`;

class Selector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { action, SelectAction, selKeys, onReplaceKey } = this.props;

    return (
      <Style>
        <Card className="type-card">
          <Row>
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
          </Row>
        </Card>
      </Style>
    );
  }
}

export default Selector;
