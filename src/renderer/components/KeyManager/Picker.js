import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Styled from "styled-components";
import { KeyPicker, LayerMovPicker, MiscPicker } from "../KeyPicker";
import Keymap, { KeymapDB } from "../../../api/keymap";
import { Fragment } from "react";

const Style = Styled.div`
.select-card {
    min-height: 100%;
    padding: 0;
}
.nospacing{
    padding: 0;
    margin: 0;
}
`;

class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { AssignMacro, selKey, onReplaceKey, activeTab } = this.props;
    // let enumerator = [];
    // const skeys = Array(64)
    //   .fill()
    //   .map((_, i) => i + 53916);
    const mcros = Array(64)
      .fill()
      .map((_, i) => i + 53852);
    // const shftto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17450);
    // const mvto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17492);
    // const onsht = Array(18)
    //   .fill()
    //   .map((_, i) => i + 49153);
    // enumerator = enumerator.concat(skeys, mcros, shftto, mvto, onsht);

    const MacroPicker = (
      <Form.Group controlId="Macro Picker">
        {/* <Form.Label>
            <h5>Macro Select</h5>
          </Form.Label> */}
        <Form.Control as="select" htmlSize={4} onClick={AssignMacro}>
          {mcros.map((x, i) => {
            return (
              <option value={x} key={i}>
                {"Macro " + i}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
    );

    return (
      <Card className="select-card">
        <KeyPicker
          onKeySelect={e => onReplaceKey(e, -1)}
          code={{ base: selKey, modified: 0 }}
        />
        <Row className="nospacing">
          <Col xs={3} className="nospacing">
            {activeTab == "super" ? (
              <LayerMovPicker
                onKeySelect={e => onReplaceKey(e, -1)}
                code={{
                  base: selKey,
                  modified: 0
                }}
              />
            ) : (
              ""
            )}
          </Col>
          <Col xs={6} className="nospacing">
            <MiscPicker
              onKeySelect={e => onReplaceKey(e, -1)}
              code={{
                base: selKey,
                modified: 0
              }}
            />
          </Col>
          <Col xs={2} className="nospacing">
            {MacroPicker}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Picker;
