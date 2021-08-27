import React, { Component } from "react";

// Internal components
import PickedKey from "./PickedKey";
import MacroPicker from "./MacroPicker";
import ModPicker from "./ModPicker";
import OSMPicker from "./OSMPicker";
import F13Picker from "./F13Picker";

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

class Keys extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  render() {
    const {
      action,
      actions,
      selKey,
      modifs,
      showKeyboard,
      activeKB,
      SelectModif,
      onReplaceKey,
      AssignMacro,
      macros
    } = this.props;
    const text =
      "This button opens the key configurator menu. Select any key to change the functionality of your Raise.";
    const text2 =
      "When you are done editing, remember to hit save on the bottom right corner.";

    return (
      <Style>
        <Card className="select-card overflow">
          <Card.Body>
            {/* <span>
              SELECTED KEY{" "}
              <OverlayTrigger
                rootClose
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip([text, text2])}
              >
                <MdInfo className={"info"} />
              </OverlayTrigger>
            </span>
            <PickedKey
              action={action}
              selKey={selKey}
              showKeyboard={showKeyboard}
              activeKB={activeKB}
            /> */}
            {actions != undefined &&
            actions[action] >= 53852 &&
            actions[action] <= 53852 + 64 ? (
              <MacroPicker
                action={action}
                actions={actions}
                AssignMacro={AssignMacro}
                macros={macros}
              ></MacroPicker>
            ) : (
              ""
            )}
            {actions != undefined &&
            actions[action] >= 49153 &&
            actions[action] <= 49160 ? (
              <OSMPicker
                action={action}
                actions={actions}
                onReplaceKey={onReplaceKey}
              ></OSMPicker>
            ) : (
              ""
            )}
            {actions != undefined &&
            actions[action] >= 104 &&
            actions[action] <= 115 ? (
              <F13Picker
                action={action}
                actions={actions}
                onReplaceKey={onReplaceKey}
              ></F13Picker>
            ) : (
              ""
            )}
            {/* {actions != undefined &&
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
            )} */}
          </Card.Body>
        </Card>
      </Style>
    );
  }
}

export default Keys;
