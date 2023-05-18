import React, { Component } from "react";
import Styled from "styled-components";
import i18n from "../../i18n";

//Components
import Title from "../../component/Title";
import { ButtonConfig } from "../../component/Button";

const Style = Styled.div`
height: inherit;
.modPickerInner {
  padding: 16px;
  h4 {
    font-size: 13px;
  }
}
.modPickerInner.modPickerInnerStd {
  padding: 0;
}
.modPickerButtonsList {
  display: flex;
  margin-left: -2px;  
  margin-right: -2px;
  flex-wrap: wrap;
  .button-config {
    margin: 4px 2px 0 2px;  
    width: 56px;
    text-align: center;
    padding: 7px 4px;
    // font-size: 12px;
  }
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
      modifs: this.parseModifs(this.props.keyCode.base + this.props.keyCode.modified)
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      this.props.keyCode != 0 &&
      this.props.keyCode.base + this.props.keyCode.modified != previousProps.keyCode.base + previousProps.keyCode.modified
    ) {
      if (this.props.keyCode.base + this.props.keyCode.modified > 10000) {
        this.setState({
          modifs: []
        });
      } else {
        this.setState({
          modifs: this.parseModifs(this.props.keyCode.base + this.props.keyCode.modified)
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

  setModifierVisibility() {
    if (
      // (this.props.keyCode != undefined &&
      //   this.props.keyCode.base + this.props.keyCode.modified >= 224 &&
      //   this.props.keyCode.base + this.props.keyCode.modified <= 255) ||
      (this.props.keyCode != undefined &&
        this.props.keyCode.base + this.props.keyCode.modified >= 53852 &&
        this.props.keyCode.base + this.props.keyCode.modified <= 53852 + 128) ||
      this.props.keyCode.base + this.props.keyCode.modified == 0 ||
      (this.props.keyCode.base + this.props.keyCode.modified >= 17492 &&
        this.props.keyCode.base + this.props.keyCode.modified <= 17501) ||
      this.props.keyCode.base + this.props.keyCode.modified >= 8192
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { modifs, keyCode } = this.state;

    return (
      <Style>
        <div className={`modPickerInner ${this.props.isStandardView ? "modPickerInnerStd" : ""}`}>
          {!this.props.isStandardView ? <Title text={i18n.editor.standardView.keys.addModifier} headingLevel={4} /> : null}
          <div className="modPickerButtonsList">
            <ButtonConfig
              selected={modifs.includes(0)}
              buttonText="Shift"
              className="modbutton"
              onClick={e => this.SelectModif(0)}
              disabled={this.setModifierVisibility()}
            />
            <ButtonConfig
              selected={modifs.includes(1)}
              buttonText="Ctrl"
              className="modbutton"
              onClick={e => this.SelectModif(1)}
              disabled={this.setModifierVisibility()}
            />
            <ButtonConfig
              selected={modifs.includes(2)}
              buttonText="Alt"
              className="modbutton"
              onClick={e => this.SelectModif(2)}
              disabled={this.setModifierVisibility()}
            />

            <ButtonConfig
              selected={modifs.includes(3)}
              buttonText="Alt Gr"
              className="modbutton"
              onClick={e => this.SelectModif(3)}
              disabled={this.setModifierVisibility()}
            />

            <ButtonConfig
              selected={modifs.includes(4)}
              buttonText="OS"
              className="modbutton"
              onClick={e => this.SelectModif(4)}
              disabled={this.setModifierVisibility()}
            />
          </div>
        </div>
      </Style>
    );
  }
}

export default ModPicker;
