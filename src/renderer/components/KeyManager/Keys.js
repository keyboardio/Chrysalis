import React, { Component } from "react";

// Internal components
import PickedKey from "./PickedKey";

// React Components
import Card from "react-bootstrap/Card";
import Styled from "styled-components";

const Style = Styled.div`
.select-card {
  min-height: 100%;
  padding: 0;
}
.overflow {
  overflow: visible;
}
`;

class Keys extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { action, selKey, showKeyboard } = this.props;
    return (
      <Style>
        <Card className="select-card overflow">
          <Card.Body>
            <PickedKey
              action={action}
              selKey={selKey}
              showKeyboard={showKeyboard}
            />
          </Card.Body>
        </Card>
      </Style>
    );
  }
}

export default Keys;
