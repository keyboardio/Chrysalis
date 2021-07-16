import React, { Component } from "react";

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Styled from "styled-components";
import { MdChevronRight } from "react-icons/md";

const Style = Styled.div`
.section {
  min-height: 100%;
  padding: 0;
}
.showbutton {
  margin 0;
}
.selectedkey {
  border-radius: 100px;
}
`;

class PickedKey extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { selKey, showKeyboard } = this.props;

    return (
      <Style>
        <Card.Title>Selected key</Card.Title>
        <Row className="section">
          <Col xs={11} className="section">
            <Form.Control
              type="text"
              value={selKey}
              disabled
              className="selectedkey"
              readOnly
            ></Form.Control>
          </Col>
          <Col xs={1} className="section">
            <Button onClick={showKeyboard} className="showbutton">
              <MdChevronRight />
            </Button>
          </Col>
        </Row>
      </Style>
    );
  }
}

export default PickedKey;
