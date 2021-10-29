import React, { Component } from "react";

// Internal components
import MacroPicker from "./MacroPicker";
import OSMPicker from "./OSMPicker";
import F13Picker from "./F13Picker";
import PickedKey from "./PickedKey";
import ModPicker from "./ModPicker";
import DualFunction from "./DualFunction";

// React Components
import Card from "react-bootstrap/Card";
import Tooltip from "react-bootstrap/Tooltip";
import Styled from "styled-components";
import Configurator from "./Configurator";

const Style = Styled.div`
.key-card {
  min-height: 320px;
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
    const { selKey, showKeyboard, keyCode, macros, onKeySelect } = this.props;

    return (
      <Style>
        <Card className="key-card overflow">
          <Card.Body>
            <span>SELECTED KEY</span>
            {keyCode != undefined &&
            ((keyCode.base + keyCode.modified >= 4 &&
              keyCode.base + keyCode.modified <= 10000) ||
              (keyCode.base + keyCode.modified >= 49169 &&
                keyCode.base + keyCode.modified <= 53266) ||
              (keyCode.base + keyCode.modified >= 17408 &&
                keyCode.base + keyCode.modified <= 17501) ||
              keyCode.base + keyCode.modified == 65535 ||
              keyCode.base + keyCode.modified == 0) &&
            !(keyCode.base >= 104 && keyCode.base <= 115) ? (
              <PickedKey selKey={selKey} showKeyboard={showKeyboard} />
            ) : (
              ""
            )}
            {keyCode != undefined &&
            keyCode.base + keyCode.modified >= 53852 &&
            keyCode.base + keyCode.modified <= 53852 + 64 ? (
              <MacroPicker
                keyCode={keyCode}
                onKeySelect={onKeySelect}
                macros={macros}
              ></MacroPicker>
            ) : (
              ""
            )}
            {keyCode != undefined &&
            keyCode.base + keyCode.modified >= 49153 &&
            keyCode.base + keyCode.modified <= 49170 ? (
              <OSMPicker
                keyCode={keyCode}
                onKeySelect={onKeySelect}
              ></OSMPicker>
            ) : (
              ""
            )}
            {keyCode != undefined &&
            keyCode.base >= 104 &&
            keyCode.base <= 115 ? (
              <F13Picker
                keyCode={keyCode}
                onKeySelect={onKeySelect}
              ></F13Picker>
            ) : (
              ""
            )}
            {keyCode != undefined &&
            ((keyCode.base + keyCode.modified >= 4 &&
              keyCode.base + keyCode.modified <= 10000) ||
              (keyCode.base + keyCode.modified >= 49169 &&
                keyCode.base + keyCode.modified <= 53266)) ? (
              <React.Fragment>
                <br />
                <ModPicker
                  key={keyCode}
                  keyCode={keyCode}
                  onKeySelect={onKeySelect}
                ></ModPicker>
                <br />
                <DualFunction
                  keyCode={keyCode}
                  onKeySelect={onKeySelect}
                ></DualFunction>
              </React.Fragment>
            ) : (
              ""
            )}
            {keyCode != undefined &&
            keyCode.base + keyCode.modified >= 17408 &&
            keyCode.base + keyCode.modified <= 17501 ? (
              <React.Fragment>
                <br />
                <Configurator
                  keyCode={keyCode}
                  onKeySelect={onKeySelect}
                ></Configurator>
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
