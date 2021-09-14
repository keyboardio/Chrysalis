import React, { Component } from "react";
import Styled from "styled-components";

// React Boostrap Components
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Style = Styled.div`
.MacroButton{
  margin-bottom: 0.5em;
  .dropdown-toggle{
    text-align: left;
    padding-left: 20px;
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

class MacroPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { actions, action, AssignMacro, macros } = this.props;
    // let enumerator = [];
    // const skeys = Array(64)
    //   .fill()
    //   .map((_, i) => i + 53916);
    const mcros = Array(macros.length)
      .fill()
      .map((_, i) => i + 53852);
    // const shftto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17450);
    // const mvto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17492);
    // const onsht = Array(18)
    //   .fill()
    //   .map((_, i) => i + 49153);
    // enumerator = enumerator.concat(skeys, mcros, shftto, mvto, onsht);

    return (
      <Style>
        <DropdownButton
          id="MacroPicker"
          className="MacroButton"
          title={
            macros[mcros.indexOf(actions[action])] != undefined
              ? `${mcros.indexOf(actions[action])} ${
                  macros[mcros.indexOf(actions[action])].name
                }`
              : ""
          }
          value={
            macros[mcros.indexOf(actions[action])] != undefined
              ? mcros[mcros.indexOf(actions[action])]
              : ""
          }
          onSelect={AssignMacro}
        >
          {mcros.map((x, id) => {
            return (
              <Dropdown.Item
                eventKey={x}
                key={`macro-${id}`}
                disabled={x == -1}
              >
                <div className="menuitem">
                  <p>{`${id} ${macros[id].name}`}</p>
                </div>
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Style>
    );
  }
}

export default MacroPicker;
