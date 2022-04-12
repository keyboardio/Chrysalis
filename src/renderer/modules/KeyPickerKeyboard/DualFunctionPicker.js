import React, { Component } from "react";
import Styled from "styled-components";

// React Components
import Dropdown from "react-bootstrap/Dropdown";

// Local components
import Title from "../../component/Title";

const Style = Styled.div`
.dualFunctionPickerInner {
  padding: 16px 24px;
  h4 {
    font-size: 14px;
  }
}
`;

class DualFunctionPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.modKey = [
      { name: "Dual Control ", keynum: 49169 },
      { name: "Dual Shift   ", keynum: 49425 },
      { name: "Dual Alt     ", keynum: 49681 },
      { name: "Dual Gui/OS  ", keynum: 49937 },
      { name: "Dual Alt Gr  ", keynum: 50705 }
    ];
    this.layerKey = [
      { name: "Dual Layer 1  ", keynum: 51218 },
      { name: "Dual Layer 2  ", keynum: 51474 },
      { name: "Dual Layer 3  ", keynum: 51730 },
      { name: "Dual Layer 4  ", keynum: 51986 },
      { name: "Dual Layer 5  ", keynum: 52242 },
      { name: "Dual Layer 6  ", keynum: 52498 },
      { name: "Dual Layer 7  ", keynum: 52754 },
      { name: "Dual Layer 8  ", keynum: 53010 }
    ];
  }

  render() {
    const { keyCode, onKeySelect, activeTab } = this.props;
    const isMod = [224, 225, 226, 227, 228, 229, 230, 231, 2530, 3043].includes(keyCode.base + keyCode.modified);
    // console.log("Check ISMOD", isMod);

    const layers = (
      <React.Fragment>
        <Dropdown
          value={keyCode.modified != 0 ? this.layerKey.map(i => i.keynum).includes(keyCode.modified) : keyCode.modified}
          onSelect={value => onKeySelect(parseInt(value) + keyCode.base)}
          className={`custom-dropdown ${
            keyCode.modified > 0 && this.layerKey.map(i => i.keynum).includes(keyCode.modified) ? "active" : ""
          }`}
          disabled={isMod || activeTab == "super"}
        >
          <Dropdown.Toggle id="dropdown-custom">
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
                  disabled={item.keynum == -1}
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
          disabled={isMod || activeTab == "super"}
        >
          <Dropdown.Toggle id="dropdown-custom">
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
                  disabled={item.keynum == -1}
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
      </React.Fragment>
    );

    return (
      <Style>
        <div className="dualFunctionPickerInner">
          <Title text="Add Dual-function" headingLevel={4} />
          {layers}
        </div>
      </Style>
    );
  }
}

export default DualFunctionPicker;
