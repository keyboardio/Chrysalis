import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Styled from "styled-components";
import { KeyPicker } from "../KeyPicker";

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
    const { onReplaceKey, activeTab, action, actions } = this.props;

    return (
      <Card className="select-card">
        <KeyPicker
          onKeySelect={e => onReplaceKey(e, -1)}
          code={{ base: actions[action], modified: 0 }}
          disableMods={[0, 3].includes(action) && activeTab == "super"}
          disableMove={![0, 3].includes(action) && activeTab == "super"}
        />
      </Card>
    );
  }
}

export default Picker;
