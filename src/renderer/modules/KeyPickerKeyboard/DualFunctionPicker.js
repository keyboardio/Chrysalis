import React, { Component } from "react";
import Styled from "styled-components";

// React Components
import Dropdown from "react-bootstrap/Dropdown";

// Local components
import Title from "../../component/Title";
import { ButtonConfig } from "../../component/Button";
import i18n from "../../i18n";

const Style = Styled.div`
.dualFunctionPickerInner {
  padding: 16px 24px;
  h4 {
    font-size: 14px;
  }
}
.dropdown-toggle.btn.btn-primary {
  padding: 8px 16px;
}
.dropdownInner, .dropdownItemSelected {
  font-size: 14px;
}
.dualFuntionWrapper {
  display: flex;
  grid-gap: 24px;
  h5 {
    text-transform: none;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: -0.03em;
  }
}
.groupButtons {
  max-width: auto;
}
.layersButtons {
    .button-config {
      width: 40px;
    }
}
.modButtons {
  .button-config {
    width: 60px;
  }
}
`;

class DualFunctionPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.modKey = [
      { name: "Dual Control ", nameStd: "Ctrl", keynum: 49169 },
      { name: "Dual Shift   ", nameStd: "Shift", keynum: 49425 },
      { name: "Dual Alt     ", nameStd: "Alt", keynum: 49681 },
      { name: "Dual Gui/OS  ", nameStd: "O.S.", keynum: 49937 },
      { name: "Dual Alt Gr  ", nameStd: "Alt Gr.", keynum: 50705 }
    ];
    this.layerKey = [
      { name: "Dual Layer 1  ", nameStd: "1", keynum: 51218 },
      { name: "Dual Layer 2  ", nameStd: "2", keynum: 51474 },
      { name: "Dual Layer 3  ", nameStd: "3", keynum: 51730 },
      { name: "Dual Layer 4  ", nameStd: "4", keynum: 51986 },
      { name: "Dual Layer 5  ", nameStd: "5", keynum: 52242 },
      { name: "Dual Layer 6  ", nameStd: "6", keynum: 52498 },
      { name: "Dual Layer 7  ", nameStd: "7", keynum: 52754 },
      { name: "Dual Layer 8  ", nameStd: "8", keynum: 53010 }
    ];
  }

  render() {
    const { keyCode, onKeySelect, activeTab, isStandardView } = this.props;
    const isMod = [224, 225, 226, 227, 228, 229, 230, 231, 2530, 3043].includes(keyCode.base + keyCode.modified);
    const isNotNK = !(keyCode.base + keyCode.modified > 3 && keyCode.base + keyCode.modified < 256);
    const isNotDF = !(keyCode.base + keyCode.modified > 49169 && keyCode.base + keyCode.modified < 53266);
    const disabled = isMod || (isNotNK && isNotDF);
    // console.log("CHECKING", isMod, isNotNK, isNotDF, keyCode);

    //if (disabled && !isStandardView) return <></>;
    const layers = (
      <div className="dualFunctionPickerInner">
        <Title text="Add Dual-function" headingLevel={4} />
        <Dropdown
          value={keyCode.modified != 0 ? this.layerKey.map(i => i.keynum).includes(keyCode.modified) : keyCode.modified}
          onSelect={value => onKeySelect(parseInt(value) + keyCode.base)}
          className={`custom-dropdown ${
            keyCode.modified > 0 && this.layerKey.map(i => i.keynum).includes(keyCode.modified) ? "active" : ""
          }`}
        >
          <Dropdown.Toggle id="dropdown-custom" disabled={disabled || activeTab == "super" ? true : false}>
            <div className="dropdownItemSelected">
              <div className="dropdownItem">
                {keyCode.modified > 0 && this.layerKey.map(i => i.keynum).includes(keyCode.modified)
                  ? this.layerKey[
                      isNaN(keyCode.modified) || this.layerKey.every(e => e.keynum !== keyCode.modified)
                        ? 0
                        : this.layerKey.findIndex(o => o.keynum == keyCode.modified)
                    ].name
                  : "Select layer"}
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.layerKey.map((item, id) => {
              return (
                <Dropdown.Item
                  eventKey={item.keynum}
                  key={`itemDualFunctionLayer-${id}`}
                  disabled={item.keynum == -1 || isMod}
                  className={`${keyCode.modified > 0 && item.keynum == keyCode.base + keyCode.modified ? "active" : ""}`}
                >
                  <div className="dropdownInner">
                    <div className="dropdownItem">{item.name}</div>
                  </div>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown
          value={keyCode.modified != 0 ? this.modKey.map(i => i.keynum).includes(keyCode.modified) : keyCode.modified}
          onSelect={value => onKeySelect(parseInt(value) + keyCode.base)}
          className={`custom-dropdown ${
            keyCode.modified > 0 && this.modKey.map(i => i.keynum).includes(keyCode.modified) ? "active" : ""
          }`}
          disabled={disabled || activeTab == "super"}
        >
          <Dropdown.Toggle id="dropdown-custom" disabled={disabled || activeTab == "super" ? true : false}>
            <div className="dropdownItemSelected">
              <div className="dropdownItem">
                {keyCode.modified > 0 && this.modKey.map(i => i.keynum).includes(keyCode.modified)
                  ? this.modKey[
                      isNaN(keyCode.modified) || this.modKey.every(e => e.keynum !== keyCode.modified)
                        ? 0
                        : this.modKey.findIndex(o => o.keynum == keyCode.modified)
                    ].name
                  : "Select modifier"}
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.modKey.map((item, id) => {
              return (
                <Dropdown.Item
                  eventKey={item.keynum}
                  key={`itemDualFunctionMod-${id}`}
                  disabled={item.keynum == -1 || isMod}
                  className={`${keyCode.modified > 0 && item.keynum == keyCode.base + keyCode.modified ? "active" : ""}`}
                >
                  <div className="dropdownInner">
                    <div className="dropdownItem">{item.name}</div>
                  </div>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );

    const layersStdView = (
      <div className="dualFuntionWrapper">
        <div className="layersButtons">
          <Title text={i18n.general.layer} headingLevel={5} />
          <div className="groupButtons">
            {this.layerKey.map((item, id) => {
              return (
                <ButtonConfig
                  key={`itemDualFunctionLayers-${id}`}
                  buttonText={item.nameStd}
                  onClick={e => onKeySelect(parseInt(item.keynum) + keyCode.base)}
                  selected={keyCode.modified > 0 && item.keynum == keyCode.modified ? true : false}
                  disabled={disabled}
                />
              );
            })}
          </div>
        </div>
        <div className="modButtons">
          <Title text={i18n.general.modifier} headingLevel={5} />
          <div className="groupButtons">
            {this.modKey.map((item, id) => {
              return (
                <ButtonConfig
                  key={`itemDualFunctionMod-${id}`}
                  buttonText={item.nameStd}
                  onClick={e => onKeySelect(parseInt(item.keynum) + keyCode.base)}
                  selected={keyCode.modified > 0 && item.keynum == keyCode.modified ? true : false}
                  disabled={disabled}
                />
              );
            })}
          </div>
        </div>
      </div>
    );

    return <Style>{isStandardView ? layersStdView : layers}</Style>;
  }
}

export default DualFunctionPicker;
