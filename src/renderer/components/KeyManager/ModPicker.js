import React, { Component } from "react";
import Styled from "styled-components";

// React Boostrap Components
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const Style = Styled.div`
.modbutton:not(:disabled):not(.disabled).active, .modbutton:not(:disabled):not(.disabled):active {
  border: 1px solid ${({ theme }) => theme.colors.button.borderColor};
}
.modbutton {
  margin-right: 0.4em;
  border: 1px solid ${({ theme }) => theme.colors.button.disabled};
  padding: .375rem .55rem;
}
.modbutton.focus, .modbutton:focus {
  background-color: ${({ theme }) => theme.colors.button.deselected};
  border-color: ${({ theme }) => theme.colors.button.borderColor};
  box-shadow: none;
}
.modbuttonrow {
  margin-left: 0;
}
.modinfo {
  align-self: center;
  font-size: 1.2rem;
  margin-top: 4px;
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

class ModPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modifs: []
    };
  }

  componentDidMount() {
    if (this.props.keyCode.base + this.props.keyCode.modified > 10000) return;
    this.setState({
      modifs: this.parseModifs(
        this.props.keyCode.base + this.props.keyCode.modified
      )
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.keyCode.base + this.props.keyCode.modified !=
      previousProps.keyCode.base + previousProps.keyCode.modified
    ) {
      if (this.props.keyCode.base + this.props.keyCode.modified > 10000) {
        this.setState({
          modifs: []
        });
      } else {
        this.setState({
          modifs: this.parseModifs(
            this.props.keyCode.base + this.props.keyCode.modified
          )
        });
      }
    }
  }

  parseModifs(keycode) {
    let modifs = [];
    if (keycode & 0b100000000) {
      // Ctrl Decoder
      modifs.push(1);
    }
    if (keycode & 0b1000000000) {
      // Alt Decoder
      modifs.push(2);
    }
    if (keycode & 0b10000000000) {
      // AltGr Decoder
      modifs.push(3);
    }
    if (keycode & 0b100000000000) {
      // Shift Decoder
      modifs.push(0);
    }
    if (keycode & 0b1000000000000) {
      // Win Decoder
      modifs.push(4);
    }
    return modifs;
  }

  applyModif(data) {
    let state = 0;
    if (data.includes(0)) {
      state += 2048;
    }
    if (data.includes(1)) {
      state += 256;
    }
    if (data.includes(2)) {
      state += 512;
    }
    if (data.includes(3)) {
      state += 1024;
    }
    if (data.includes(4)) {
      state += 4096;
    }

    return state;
  }

  SelectModif(data) {
    const { keyCode, onKeySelect } = this.props;
    const { modifs } = this.state;
    let mod = [...modifs];
    if (mod.includes(data)) {
      mod = mod.filter(e => e !== data);
    } else {
      mod.push(data);
    }
    this.setState({ modifs: mod });
    onKeySelect(keyCode.base + this.applyModif(mod));
  }

  render() {
    const { modifs } = this.state;

    return (
      <Style>
        <Row className="modbuttonrow">
          <Button
            active={modifs.includes(0)}
            className="modbutton"
            onClick={e => this.SelectModif(0)}
          >
            Shift
          </Button>
          <Button
            active={modifs.includes(1)}
            className="modbutton"
            onClick={e => this.SelectModif(1)}
          >
            Ctrl
          </Button>
          <Button
            active={modifs.includes(2)}
            className="modbutton"
            onClick={e => this.SelectModif(2)}
          >
            Alt
          </Button>
          <Button
            active={modifs.includes(3)}
            className="modbutton"
            onClick={e => this.SelectModif(3)}
          >
            Alt Gr
          </Button>
          <Button
            active={modifs.includes(4)}
            className="modbutton"
            onClick={e => this.SelectModif(4)}
          >
            O.S.
          </Button>
        </Row>
      </Style>
    );
  }
}

export default ModPicker;
