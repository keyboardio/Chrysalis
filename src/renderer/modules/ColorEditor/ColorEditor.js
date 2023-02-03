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
  grid-gap: 4px;
}
.sketch-picker {
  font-weight: 600;
  input {
    font-weight: 500;
    width: 100%;
  }
}

@media screen and (max-width: 1599px) {
  .panelTitle {
    padding-right: 12px;
  }
}
@media screen and (max-width: 1499px) {
  .panelTitle {
    display: none;
  }
}
`;

export default class ColorEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false,
      internalColors: props.colors
    };

    this.showColorPicker = this.showColorPicker.bind(this);
    this.selectColor = this.selectColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.spare = this.spare.bind(this);
    this.addNewColorPalette = this.addNewColorPalette.bind(this);
  }

  handleChange(color) {
    const { selected, onColorPick } = this.props;
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

  removeColorPalette(idx) {
    let arrayColorPalette = [...this.state.internalColors];
    let index = idx;
    if (index !== -1) {
      arrayColorPalette.splice(index, 1);
      this.setState({ internalColors: arrayColorPalette });
    }
  }

  addNewColorPalette() {
    let arrayColorPalette = [...this.state.internalColors];
    arrayColorPalette.push({ r: 122, g: 121, b: 241, rgb: "(122, 121, 241)" });
    this.setState({ internalColors: arrayColorPalette });

    this.selectColor(null, this.state.internalColors.length);
    this.setState({ displayColorPicker: true });
  }

  render() {
    const { colors, selected, toChangeAllKeysColor, onBacklightColorSelect, onColorButtonSelect } = this.props;
    const { displayColorPicker, internalColors } = this.state;

    const layerButtons = internalColors.map((data, idx) => {
      const menuKey = `color-${idx.toString()}-${colors[idx].rgb.toString()}`;
      const buttonStyle = {
        //backgroundColor: data.rgb
        backgroundColor: colors[idx].rgb
      };
      if (
        idx > 0 &&
        data.rgb == "rgb(0, 0, 0)" &&
        internalColors[idx - 1].rgb == "rgb(0, 0, 0)" &&
        data.rgb == internalColors[idx - 1].rgb
      ) {
        //internalColors.slice(idx, 1);
        this.removeColorPalette(idx);
      } else {
        return (
          <ColorPicker
            onClick={ev => {
              this.selectColor(ev, idx);
            }}
            menuKey={menuKey}
            key={`${menuKey}-key-${colors[idx]}`}
            id={idx}
            selected={selected}
            buttonStyle={buttonStyle}
            dataID={data.rgb}
            className="colorPicker"
          />
        );
      }
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
          <div className="colorPallete">
            {layerButtons}
            {internalColors.length < 16 ? (
              <ColorPicker
                onClick={this.addNewColorPalette}
                menuKey="menuKeyAddNewColor"
                key={`buttonAddNewColor`}
                className="addColorButton"
              />
            ) : (
              ""
            )}
          </div>
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
                  toChangeAllKeysColor(selected, 0, 70);
                }}
                label={i18n.editor.color.applyColor}
                text={i18n.editor.color.allKeys}
                icoSVG={<IconKeysLight />}
                color={colors[selected]}
              />
              <ColorButton
                onClick={() => {
                  toChangeAllKeysColor(selected, 70, 177);
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
