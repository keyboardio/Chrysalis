import React, { Component } from "react";
import Styled from "styled-components";

// React Boostrap Components
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Style = Styled.div`
.OSMButton{
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
        <DropdownButton
          id="OSMPicker"
          drop={"up"}
          className="OSMButton"
          title={
            osm[
              isNaN(KC) || KC < 49153 || KC > 49160
                ? 0
                : osm.findIndex(o => o.keynum == KC)
            ].name
          }
          value={osm.map(x => {
            if (KC == x.keynum) return x.keynum;
          })}
          onSelect={value => onKeySelect(parseInt(value))}
        >
          {osm.map((x, id) => {
            return (
              <Dropdown.Item
                eventKey={x.keynum}
                key={`OSM-${id}`}
                disabled={x.keynum == -1}
              >
                <div className="menuitem">
                  <p>{x.name}</p>
                </div>
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <DropdownButton
          id="OSMPicker"
          drop={"up"}
          className="OSMButton"
          title={
            osl[
              isNaN(KC) || KC < 49161 || KC > 49168
                ? 0
                : osl.findIndex(o => o.keynum == KC)
            ].name
          }
          value={osl.map(x => {
            if (KC == x.keynum) return x.keynum;
          })}
          onSelect={value => onKeySelect(parseInt(value))}
        >
          {osl.map((x, id) => {
            return (
              <Dropdown.Item
                eventKey={x.keynum}
                key={`OSL-${id}`}
                disabled={x.keynum == -1}
              >
                <div className="menuitem">
                  <p>{x.name}</p>
                </div>
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Style>
    );
  }
}

export default OSMPicker;
