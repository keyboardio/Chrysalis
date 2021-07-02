import React, { Component } from "react";
import MacroTabKeys from "./MacroTabKeys";
import MacroTabSpecial from "./MacroTabSpecial";
import MacroTabMouse from "./MacroTabMouse";

import Styled from "styled-components";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { MdPublish } from "react-icons/md";
import i18n from "../../i18n";

const Styles = Styled.div`
.tool-tabs {
}
.margin {
  padding-top: 1rem;
}
.flex {
  display: flex;
}
.iconbutton {
  width: auto;
  height: 100%;
  margin-top: 0;
}
`;

class MacroToolTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "Keys"
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    const text = (
      <Row className={"flex margin"}>
        <Col xs={11}>
          <Form.Control
            type="text"
            placeholder="Enter Text"
            value={this.props.addText}
            onChange={this.props.onTextChange}
          />
        </Col>
        <Col xs={1}>
          <Button onClick={this.props.onAddText} className={"iconbutton"}>
            <MdPublish />
          </Button>
        </Col>
      </Row>
    );

    const keys = (
      <div className={"margin"}>
        <MacroTabKeys
          actionTypes={this.props.actionTypes}
          keymapDB={this.props.keymapDB}
          onAddSymbol={this.props.onAddSymbol}
          onAddDelay={this.props.onAddDelay}
        />
      </div>
    );

    const functions = (
      <div className={"margin"}>
        <MacroTabSpecial
          actionTypes={this.props.actionTypes}
          keymapDB={this.props.keymapDB}
          onAddSpecial={this.props.onAddSpecial}
          number={this.props.number}
          selected={this.props.selected}
        />
      </div>
    );

    const mouse = (
      <div className={"margin"}>
        <MacroTabMouse
          actionTypes={this.props.actionTypes}
          keymapDB={this.props.keymapDB}
          onAddSpecial={this.props.onAddSpecial}
        />
      </div>
    );

    return (
      <Styles>
        <Tabs
          activeKey={value}
          onSelect={this.handleChange}
          className="tool-tabs"
        >
          <Tab
            className="tab"
            eventKey="Text"
            title="Text"
            label={i18n.editor.macros.inputText}
          >
            {text}
          </Tab>
          <Tab
            className="tab"
            eventKey="Keys"
            title="Keys"
            label={i18n.editor.macros.keysAndDelays}
          >
            {keys}
          </Tab>
          <Tab
            className="tab"
            eventKey="Functions"
            title="Functions"
            label={i18n.editor.macros.functions}
          >
            {functions}
          </Tab>
          <Tab
            className="tab"
            eventKey="Mouse"
            title="Mouse"
            label={i18n.editor.macros.mouse}
          >
            {mouse}
          </Tab>
        </Tabs>
      </Styles>
    );
  }
}

export default MacroToolTab;
