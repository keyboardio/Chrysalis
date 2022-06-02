// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Component, Fragment } from "react";
import { SketchPicker } from "react-color";
import Styled from "styled-components";
import i18n from "../../i18n";

// Bootstrap components

import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Title from "../../component/Title";
import { ColorButton, ColorPicker } from "../../component/Button";

// Icons
import { CgSmartHomeLight, CgColorPicker } from "react-icons/cg";

import { IconColorPalette, IconKeysLight, IconKeysUnderglow } from "../../component/Icon";

const toolsWidth = 45;

const Styles = Styled.div`
width: 100%;
.panelTitle {
  white-space: nowrap;
  padding-right: 24px;
  h4 {
    color: ${({ theme }) => theme.styles.colorPanel.colorTitle};
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.02em;
    white-space: nowrap;
    margin: 0;
  }
}
.panelTools {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
}
.buttonsGroup {
  display: flex;
  flex-wrap: nowrap;
  .buttonColor {
    margin-left: 8px;
  }
}
.buttonEditColor {
  position: relative;
}
.buttonsApplyAll {
  display: flex;
  flex-wrap: nowrap;
}

.colorPallete {
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 2px;
}
`;

export default class ColorEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false
    };

    this.showColorPicker = this.showColorPicker.bind(this);
    this.selectColor = this.selectColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.spare = this.spare.bind(this);
  }

  handleChange(color) {
    const { selected, onColorPick } = this.props;
    console.log(selected, color);
    onColorPick(selected, color.rgb.r, color.rgb.g, color.rgb.b);
  }

  CButton(text, func, icon, disable, classes) {
    const id = `tooltip-${text}`;

    return (
      <OverlayTrigger rootClose overlay={<Tooltip id={id}>{text}</Tooltip>} placement="top">
        <Button disabled={disable} onClick={func} className={classes}>
          {icon}
        </Button>
      </OverlayTrigger>
    );
  }

  spare() {
    const { colors } = this.props;
  }

  selectColor(ev, pick) {
    const { colors, selected, onColorSelect } = this.props;
    console.log(colors[pick], pick, selected);
    onColorSelect(pick);
    if (pick === selected) {
      // setIndexFocusButton(!indexFocusButton);
      this.props.onColorButtonSelect("one_button_click", pick);
      return;
    }
    this.props.onColorButtonSelect("another_button_click", pick);
    // setIndexFocusButton(index);
    // setColorFocusButton(setColorTamplate(color));
  }

  showColorPicker(event) {
    this.setState(state => {
      return { displayColorPicker: !state.displayColorPicker };
    });
  }

  render() {
    const { colors, selected, toChangeAllKeysColor, onBacklightColorSelect, onColorButtonSelect } = this.props;
    const { displayColorPicker } = this.state;

    const layerButtons = colors.map((data, idx) => {
      const menuKey = `color-${idx.toString()}-${colors[idx].rgb.toString()}`;
      const buttonStyle = {
        backgroundColor: data.rgb
      };
      return (
        // <Button
        //   key={menuKey}
        //   onClick={ev => {
        //     this.selectColor(ev, idx);
        //   }}
        //   className="color-button sr-only"
        //   data-id={data.rgb}
        // >
        //   <div className="button-content">
        //     <div key={colors[idx]} className={`color ${selected === idx ? "actv" : ""}`} style={buttonStyle} />
        //   </div>
        // </Button>
        <ColorPicker
          onClick={ev => {
            this.selectColor(ev, idx);
          }}
          menuKey={menuKey}
          key={colors[idx]}
          id={idx}
          selected={selected}
          buttonStyle={buttonStyle}
          dataID={data.rgb}
        />
      );
    });

    const iconStyles = { transform: "rotate(180deg)" };

    const edit = <>{this.CButton("Edit current color", this.showColorPicker, <CgColorPicker />, false, "first colorpick")}</>;

    const popover = {
      position: "absolute",
      top: "42px"
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };

    return (
      <Styles className="extraPanel">
        <div className="panelTitle">
          <Title text={i18n.editor.color.colorPalette} headingLevel={4} />
        </div>
        <div className="panelTools">
          <div className="colorPallete">{layerButtons}</div>
          <div className="buttonsGroup">
            <div className="buttonEditColor">
              <ColorButton
                onClick={this.showColorPicker}
                label={i18n.editor.color.selectedColor}
                text={i18n.editor.color.editColor}
                icoSVG={<IconColorPalette />}
                color={colors[selected]}
              />
              {displayColorPicker ? (
                <div style={popover}>
                  <div style={cover} onClick={this.showColorPicker} aria-hidden="true" />
                  <SketchPicker color={colors[selected]} onChange={this.handleChange} />
                </div>
              ) : null}
            </div>
            <div className="buttonsApplyAll">
              <ColorButton
                onClick={() => {
                  toChangeAllKeysColor(selected, 0, 69);
                }}
                label={i18n.editor.color.applyColor}
                text={i18n.editor.color.allKeys}
                icoSVG={<IconKeysLight />}
                color={colors[selected]}
              />
              <ColorButton
                onClick={() => {
                  toChangeAllKeysColor(selected, 69, 142);
                }}
                label={i18n.editor.color.applyColor}
                text={i18n.editor.color.underglow}
                icoSVG={<IconKeysUnderglow />}
                color={colors[selected]}
              />
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}
