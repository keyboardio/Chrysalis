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
.selectsection {
  min-height: 100%;
  padding: 0;
  align-self: center;
  max-width: 1px;
}
.showbutton {
  margin: 0;
  padding: 0.4em 0.5em;
  svg {
    font-size: 1.6em;
  }
}
.selectedkey {
  border-radius: 4px;
  margin: 0.375rem .75rem;
  border: none;
  background-color: ${({ theme }) => theme.card.altIcon};
}
.activebg {
  background-color: ${({ theme }) => theme.colors.button.active};
}
.chevron {
  align-self: center;
  font-size: 1.6rem;
  margin-top: -6px;
  margin-left: -18px;
  color: ${({ theme }) => theme.colors.button.activeText};
}
.pksection {
  min-height: 100%;
  padding: 0 0.25rem 0 0;
}
.compensator {
  margin-left: 3px;
}
`;

class PickedKey extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { selKey } = this.props;

    return (
      <Style>
        <Row className="pksection">
          <Col xs={10} className="pksection compensator">
            <Form.Control
              type="text"
              value={selKey}
              disabled
              className={this.props.activeKB ? "activebg selectedkey" : "selectedkey"}
              readOnly
            ></Form.Control>
          </Col>
          <Col xs={2} className="selectsection">
            <MdChevronRight className="chevron" />
          </Col>
        </Row>
      </Style>
    );
  }
}

export default PickedKey;
