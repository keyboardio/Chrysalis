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
    const { actions, action, onReplaceKey } = this.props;
    // let enumerator = [];
    // const skeys = Array(64)
    //   .fill()
    //   .map((_, i) => i + 53916);
    // const osm = Array(64)
    //   .fill()
    //   .map((_, i) => i + 53852);
    // const shftto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17450);
    // const mvto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17492);
    const osm = [
      { name: "One Shot Left Control", keynum: 49153 },
      { name: "One Shot Left Shift", keynum: 49154 },
      { name: "One Shot Left Alt", keynum: 49155 },
      { name: "One Shot Left OS", keynum: 49156 },
      { name: "One Shot Right Control", keynum: 49157 },
      { name: "One Shot Right Shift", keynum: 49158 },
      { name: "One Shot AltGr", keynum: 49159 },
      { name: "One Shot Right OS", keynum: 49160 }
    ];
    // enumerator = enumerator.concat(skeys, osm, shftto, mvto, onsht);

    return (
      <Style>
        <DropdownButton
          id="OSMPicker"
          className="OSMButton"
          drop={"up"}
          title={osm.map(x => {
            if (actions[action] == x.keynum) return x.name;
          })}
          value={osm.map(x => {
            if (actions[action] == x.keynum) return x.keynum;
          })}
          onSelect={value => onReplaceKey(value, action)}
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
      </Style>
    );
  }
}

export default OSMPicker;
