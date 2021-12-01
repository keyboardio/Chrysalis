import React, { Component } from "react";
import Styled from "styled-components";

// React Boostrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Local components
import Tooltip from "../Tooltip";

const Style = Styled.div`
.overflow {
  overflow: visible;
}
.overflow::-webkit-scrollbar {
  display: none;
}
.select-card {
    height: 290px;
    padding: 0;
}
.titles {
    margin-bottom: 0;
  }
.modbutton:not(:disabled):not(.disabled).active, .modbutton:not(:disabled):not(.disabled):active {
  background-color: #2a8af1;
  box-shadow: none;
}
.modbutton {
  margin-right: 0.4em;
}
.alignvert {
  padding-top: 3px;
  float: left;
}
.showbutton {
  margin 0;
}
.modbuttonrow {
  margin-left: 0;
}
.info {
  align-self: center;
  font-size: 1.2rem;
  margin-top: 4px;
  color: ${({ theme }) => theme.card.icon};
}
.selectButton {
  float: left;
  .dropdown-toggle{
    font-size: 0.97rem;
  }
}
.selectedState {
  button {
    background-color: ${({ theme }) => theme.colors.button.active};
  }
}
.select-body {
  padding: 0.55rem;
}
.item-layer {
  p {
    margin-bottom: 0;
  }
}
.OSButton{
  .dropdown-toggle{
    text-align: left;
    padding-left: 20px;
    overflow-y: visible;
  }
}
.menuitem {
  p {
    margin-bottom: 0;
  }
}
`;

class OSMPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { keyCode, onKeySelect } = this.props;
    const KC = keyCode.base + keyCode.modified;
    const osmtitle = "*ONE-SHOT MODIFIERS";
    const osmtext1 = "To explain One-Shot Modifiers functionality Let's use the 'One-Shot Shift' as an example:";
    const osmtext2 = "1. If you hold it, it will work as usual; it will make all letters capitalized.";
    const osmtext3 = "2. If you tap 'One-Shot Shift' once, and then hit the keys 'a' and 'b' you will type 'Ab'.";
    const osmtext4 = "The shift key is activated for the next key ONLY.";
    const osmtext5 =
      "3. If you double-tap 'One-Shot Shift', it will lock the modifier. Everything you type will be in capital letters";
    const osmtext6 = "as if you had Caps Lock activated. If you tap it again, it will be deactivated.";

    const osltitle = "*ONE-SHOT LAYERS";
    const osltext1 = "Imagine you are in Layer 1 and you have a ‘One-Shot Layer 2‘ key:";
    const osltext2 = "1. If you hold the key, you shift to Layer 2. Releasing the key will bring you back to Layer 1.";
    const osltext3 = "2. Single tap: Tap the ‘One-Shot Layer 2‘ once and it will bring you to Layer 2 but after you press";
    const osltext4 = "any key on that layer, you will be brought back to the previous layer.";
    const osltext5 =
      "3. Double-tap: It acts as ‘Layer Lock’. You are locked on Layer 2 until you tap the One-Shot Layer 2 key again.";
    const osltext6 = "%";
    const osltext7 =
      "Reminder: When assigning the One-Shot Layer key, make sure that the same key on the other layer is assigned as TRANS.";
    const osm = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "One Shot Left Control", keynum: 49153 },
      { name: "One Shot Left Shift", keynum: 49154 },
      { name: "One Shot Left Alt", keynum: 49155 },
      { name: "One Shot Left OS", keynum: 49156 },
      { name: "One Shot Right Control", keynum: 49157 },
      { name: "One Shot Right Shift", keynum: 49158 },
      { name: "One Shot AltGr", keynum: 49159 },
      { name: "One Shot Right OS", keynum: 49160 }
    ];
    const osl = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "One Shot Layer 1", keynum: 49161 },
      { name: "One Shot Layer 2", keynum: 49162 },
      { name: "One Shot Layer 3", keynum: 49163 },
      { name: "One Shot Layer 4", keynum: 49164 },
      { name: "One Shot Layer 5", keynum: 49165 },
      { name: "One Shot Layer 6", keynum: 49166 },
      { name: "One Shot Layer 7", keynum: 49167 },
      { name: "One Shot Layer 8", keynum: 49168 }
    ];

    return (
      <Style>
        <Row className="mx-0 pt-1">
          <Col xs={8} className="px-0">
            <p className="titles alignvert">ONESHOT MODIFIERS</p>
            <Tooltip type="text" placement="top" texts={[osmtitle, osmtext1, osmtext2, osmtext3, osmtext4, osmtext5, osmtext6]} />
          </Col>
        </Row>
        <Row className="mx-0">
          <DropdownButton
            id="OSMPicker"
            drop={"up"}
            className={`OSButton ${
              keyCode.base + keyCode.modified > 0 &&
              osm
                .map(x => {
                  if (KC == x.keynum) return x.keynum;
                })
                .includes(KC)
                ? "selectedState"
                : ""
            }`}
            title={osm[isNaN(KC) || KC < 49153 || KC > 49160 ? 0 : osm.findIndex(o => o.keynum == KC)].name}
            value={osm.map(x => {
              if (KC == x.keynum) return x.keynum;
            })}
            onSelect={value => onKeySelect(parseInt(value))}
          >
            {osm.map((x, id) => {
              return (
                <Dropdown.Item eventKey={x.keynum} key={`OSM-${id}`} disabled={x.keynum == -1}>
                  <div className="menuitem">
                    <p>{x.name}</p>
                  </div>
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Row>
        <Row className="mx-0 pt-1">
          <Col xs={7} className="px-0">
            <p className="titles alignvert">ONESHOT LAYERS</p>
            <Tooltip
              type="text"
              placement="top"
              texts={[osltitle, osltext1, osltext2, osltext3, osltext4, osltext5, osltext6, osltext7]}
            />
          </Col>
        </Row>
        <Row className="mx-0">
          <DropdownButton
            id="OSLPicker"
            drop={"up"}
            className={`OSButton ${
              keyCode.modified > 0 && osl.map(i => i.keynum).includes(keyCode.base + keyCode.modified) ? "selectedState" : ""
            }`}
            title={osl[isNaN(KC) || KC < 49161 || KC > 49168 ? 0 : osl.findIndex(o => o.keynum == KC)].name}
            value={osl.map(x => {
              if (KC == x.keynum) return x.keynum;
            })}
            onSelect={value => onKeySelect(parseInt(value))}
          >
            {osl.map((x, id) => {
              return (
                <Dropdown.Item eventKey={x.keynum} key={`OSL-${id}`} disabled={x.keynum == -1}>
                  <div className="menuitem">
                    <p>{x.name}</p>
                  </div>
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Row>
      </Style>
    );
  }
}

export default OSMPicker;
