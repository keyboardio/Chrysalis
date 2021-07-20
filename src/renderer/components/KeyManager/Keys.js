import React, { Component } from "react";

// Internal components
import PickedKey from "./PickedKey";
import MacroPicker from "./MacroPicker";
import ModPicker from "./ModPicker";

// React Components
import Card from "react-bootstrap/Card";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Styled from "styled-components";
import { MdInfo } from "react-icons/md";

const Style = Styled.div`
.select-card {
  min-height: 100%;
  padding: 0;
}
.overflow {
  overflow: visible;
}
.info {
  vertical-align: middle;
  font-size: 1.2rem;
  color: #666;
}
`;

class Keys extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderTooltip(line1, line2) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <span>{line1}</span>
        <br></br>
        <span>{line2}</span>
      </Tooltip>
    );
  }

  render() {
    const {
      actions,
      action,
      selKey,
      showKeyboard,
      activeKB,
      AssignMacro,
      modifs,
      SelectModif
    } = this.props;
    const text =
      "This button opens the key configurator menu. Select any key to change the functionality of your Raise.";
    const text2 =
      "When you are done editing, remember to hit save on the bottom right corner.";

    return (
      <Style>
        <Card className="select-card overflow">
          <Card.Body>
            <span>
              SELECTED KEY{" "}
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip(text, text2)}
              >
                <MdInfo className={"info"} />
              </OverlayTrigger>
            </span>
            <PickedKey
              action={action}
              selKey={selKey}
              showKeyboard={showKeyboard}
              activeKB={activeKB}
            />
            {actions != undefined &&
            actions[action] >= 53852 &&
            actions[action] <= 53852 + 64 ? (
              <MacroPicker
                action={action}
                actions={actions}
                AssignMacro={AssignMacro}
              ></MacroPicker>
            ) : (
              ""
            )}
            {actions != undefined &&
            actions[action] >= 4 &&
            actions[action] <= 10000 ? (
              <ModPicker
                action={action}
                actions={actions}
                modifs={modifs}
                SelectModif={SelectModif}
                i={0}
              ></ModPicker>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </Style>
    );
  }
}

export default Keys;
