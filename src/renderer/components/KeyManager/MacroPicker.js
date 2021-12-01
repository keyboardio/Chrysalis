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
    const { keyCode, onKeySelect, macros } = this.props;
    const KC = keyCode.base + keyCode.modified;
    const mcros = Array(macros.length)
      .fill()
      .map((_, i) => i + 53852);

    return (
      <Style>
        <DropdownButton
          id="MacroPicker"
          drop={"up"}
          className="MacroButton"
          title={macros[mcros.indexOf(KC)] != undefined ? `${mcros.indexOf(KC)} ${macros[mcros.indexOf(KC)].name}` : ""}
          value={macros[mcros.indexOf(KC)] != undefined ? mcros[mcros.indexOf(KC)] : ""}
          onSelect={value => {
            onKeySelect(parseInt(value));
          }}
        >
          {mcros.map((x, id) => {
            return (
              <Dropdown.Item eventKey={x} key={`macro-${id}`} disabled={x == -1}>
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
