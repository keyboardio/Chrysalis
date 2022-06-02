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
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Title from "../../component/Title";
import { ColorButton } from "../../component/Button";

// Icons
import { CgSmartHomeLight, CgColorPicker } from "react-icons/cg";

import { IconColorPalette, IconKeysLight, IconKeysUnderglow } from "../../component/Icon";

const toolsWidth = 45;

const Styles = Styled.div`
width: 100%;
  .color-editor {

    background-color: ${({ theme }) => theme.card.background};
    border-radius: 10px;
    box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 2px 1px -1px rgb(0 0 0 / 12%);
    svg {
      vertical-align: initial;
    }
    .colors {
      margin: 0;
      padding: 5px;
      justify-content: center;
      .color-button {
        width: 12%;
        padding: 5px 0px;
        border-radius: 0px;
        color: ${({ theme }) => theme.colors.button.text};
        background-color: ${({ theme }) => theme.card.background};
        border: 0px;
        font-size: larger;
        text-align: -webkit-center;
        box-shadow: none;

        .color {
          height: 28px;
          width: 28px;
          border-radius: 4px;
          border: 0px solid ${({ theme }) => theme.card.background};
          box-shadow: 2px 2px 4px 1px darkgrey;
        }
        .color.actv{
          box-shadow: 0px 0px 3px 5px ${({ theme }) => theme.colors.button.active};
        }
        .color:hover {
          box-shadow: 0px 0px 4px 3px ${({ theme }) => theme.colors.button.hover};
        }
        .color:focus {
          height: 28px;
          width: 28px;
          border-radius: 4px;
          border: 3px solid black;
        }
      }
      .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
        box-shadow: none;
      }
    }
    .color-options {
      margin: 0;
      justify-content: center;
      padding: 6px 0px;
      button {
        border: none;
        font-size: large;
        color: ${({ theme }) => theme.colors.button.text};
        background-color: transparent;
      }
      button:hover {
        background-color: ${({ theme }) => theme.colors.button.disabled};
      }
      button:focus {
        background-color: ${({ theme }) => theme.colors.button.background};
        color: ${({ theme }) => theme.colors.button.text};
        box-shadow: none;
      }
      button:active {
        background-color: grey !important;
        box-shadow: none !important;
      }
      .btn-primary:not(:disabled):not(.disabled).active {
        background-color: ${({ theme }) => theme.colors.button.background};
        color: ${({ theme }) => theme.colors.button.text};
        box-shadow: none !important;
      }
    }
  }

  .colorpick {
    padding: 28px 8px;
    margin-left: 4px;
    margin-top: 4px;
  }
  .otherbutts {
    padding: 6px 8px;
    margin-left: -4px;
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
        <Button
          key={menuKey}
          onClick={ev => {
            this.selectColor(ev, idx);
          }}
          className="color-button"
          data-id={data.rgb}
        >
          <div className="button-content">
            <div key={colors[idx]} className={`color ${selected === idx ? "actv" : ""}`} style={buttonStyle} />
          </div>
        </Button>
      );
    });

    const iconStyles = { transform: "rotate(180deg)" };

    const edit = <>{this.CButton("Edit current color", this.showColorPicker, <CgColorPicker />, false, "first colorpick")}</>;

    const popover = {
      position: "absolute",
      bottom: "120px"
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
