import React, { Component } from "react";
import Styled from "styled-components";

// React Boostrap Components
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Style = Styled.div`
.F13Button{
  .dropdown-toggle{
    text-align: left;
    padding-left: 20px;
    width: 50%;
    overflow-y: visible;
    border: 1px solid ${({ theme }) => theme.colors.button.disabled};;
  }
}
.menuitem {
  p {
    margin-bottom: 0;
  }
}
`;

class F13Picker extends Component {
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
    // const F13 = Array(64)
    //   .fill()
    //   .map((_, i) => i + 53852);
    // const shftto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17450);
    // const mvto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17492);
    const f13 = [
      { name: "F13", keynum: 104 },
      { name: "F14", keynum: 105 },
      { name: "F15", keynum: 106 },
      { name: "F16", keynum: 107 },
      { name: "F17", keynum: 108 },
      { name: "F18", keynum: 109 },
      { name: "F19", keynum: 110 },
      { name: "F20", keynum: 111 },
      { name: "F21", keynum: 112 },
      { name: "F22", keynum: 113 },
      { name: "F23", keynum: 114 },
      { name: "F24", keynum: 115 }
    ];
    // enumerator umerator.concat(skeys, F13, shftto, mvto, onsht);

    return (
      <Style>
        <DropdownButton
          id="F13Picker"
          className="F13Button"
          drop={"up"}
          title={f13.map(x => {
            if (actions[action] == x.keynum) return x.name;
          })}
          value={f13.map(x => {
            if (actions[action] == x.keynum) return x.keynum;
          })}
          onSelect={value => onReplaceKey(value, action)}
        >
          {f13.map((x, id) => {
            return (
              <Dropdown.Item
                eventKey={x.keynum}
                key={`F13-${id}`}
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

export default F13Picker;
