import React, { Component } from "react";
import Styled from "styled-components";

// Internal components
import MacroPicker from "./MacroPicker";
import OSMPicker from "./OSMPicker";
import F13Picker from "./F13Picker";
import PickedKey from "./PickedKey";
import ModPicker from "./ModPicker";
import DualFunction from "./DualFunction";
import LayerPicker from "./LayerPicker";

// React Components
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdInfo } from "react-icons/md";

const Style = Styled.div`
.key-card {
  min-height: 290px;
  padding: 0;
}
.overflow {
  overflow: auto;
}
.overflow::-webkit-scrollbar {
  display: none;
}
.info {
  vertical-align: middle;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.card.icon};
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
    const { selKey, keyCode, macros, onKeySelect, activeTab } = this.props;
    const text = "Selected key indicator";
    const text2 = "This box shows the current selected key and it's options.";
    const text3 = "Modifiers";
    const text4 = "Add a modifier press in combination with the selected key.";
    const text5 = "Layer & key";
    const text6 = "Add a second functionality to the key when holding it, like layer switch or modifiers";
    const text7 = "Layer Switch";
    const text8 = "Replace the current key action with a layer shift function.";
    const text9 = "Layer Lock";
    const text10 = "Replace the current key action with a layer shift function.";
    const text11 = "OneShot Mod and Layer";
    const text12 = "Replace the current key action with a Oneshot modifier or layer action.";
    const text13 = "Macros";
    const text14 = "Replace the current key action with a Macro from the available ones.";

    return (
      <Style>
        <Card className="key-card overflow">
          <Card.Body>
            <span>SELECTED KEY</span>
            {!(keyCode.base >= 104 && keyCode.base <= 115) &&
            !(keyCode.base + keyCode.modified >= 53852 && keyCode.base + keyCode.modified <= 53852 + 64) ? (
              <PickedKey selKey={selKey} />
            ) : (
              ""
            )}
            {keyCode != undefined && keyCode.base + keyCode.modified >= 53852 && keyCode.base + keyCode.modified <= 53852 + 64 ? (
              <MacroPicker keyCode={keyCode} onKeySelect={onKeySelect} macros={macros}></MacroPicker>
            ) : (
              ""
            )}
            {keyCode != undefined && keyCode.base + keyCode.modified >= 49153 && keyCode.base + keyCode.modified <= 49170 ? (
              <OSMPicker keyCode={keyCode} onKeySelect={onKeySelect}></OSMPicker>
            ) : (
              ""
            )}
            {keyCode != undefined && keyCode.base >= 104 && keyCode.base <= 115 ? (
              <Row className="mx-0">
                <Col xs={8} className="p-0">
                  <PickedKey selKey={selKey} />
                </Col>
                <Col xs={4} className="p-0">
                  <F13Picker keyCode={keyCode} onKeySelect={onKeySelect} />
                </Col>
              </Row>
            ) : (
              ""
            )}
            {keyCode != undefined &&
            ((keyCode.base + keyCode.modified >= 4 && keyCode.base + keyCode.modified <= 10000) ||
              (keyCode.base + keyCode.modified >= 49169 && keyCode.base + keyCode.modified <= 53266)) ? (
              <React.Fragment>
                <ModPicker key={keyCode} keyCode={keyCode} onKeySelect={onKeySelect}></ModPicker>
                <DualFunction keyCode={keyCode} onKeySelect={onKeySelect} activeTab={activeTab}></DualFunction>
              </React.Fragment>
            ) : (
              ""
            )}
            {keyCode != undefined && keyCode.base + keyCode.modified >= 17408 && keyCode.base + keyCode.modified <= 17501 ? (
              <React.Fragment>
                <LayerPicker keyCode={keyCode} onKeySelect={onKeySelect} activeTab={activeTab}></LayerPicker>
              </React.Fragment>
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
