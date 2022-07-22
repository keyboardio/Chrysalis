// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
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
import React, { Component } from "react";

import Styled from "styled-components";
import i18n from "../../i18n";
import Spinner from "react-bootstrap/Spinner";

import Keymap, { KeymapDB } from "../../../api/keymap";

import TimelineEditorForm from "./TimelineEditorForm";
import Title from "../../component/Title";
import { IconStopWatchXs } from "../../component/Icon";
import { PreviewMacroModal } from "../../component/Modal";

const Styles = Styled.div`
background-color: ${({ theme }) => theme.styles.macro.timelineBackground};
border-radius: 0px; 
margin-top: 0px;
padding-bottom: 5px;
.timelineHeader {
    padding: 24px 32px;
    display: flex;
    align-items: baseline;
    h4 {
        font-size: 21px; 
        color: ${({ theme }) => theme.styles.macro.colorTitle};
        margin: 0;
    }
    .outline-sm {
      padding: 2px 12px;
      border: 1px solid ${({ theme }) => theme.styles.button.previewButton.borderColor};
      color:  ${({ theme }) => theme.styles.button.previewButton.color};
      margin-top: 8px;
      font-size: 13px;
      transition: 300ms ease-in-out;
      transition-property: background, color, border;
      .buttonLabel {
        align-items: center;
      }
      &:hover {
        border: 1px solid  ${({ theme }) => theme.styles.button.previewButton.borderHover};
        color: ${({ theme }) => theme.styles.button.previewButton.colorHover};
        background-color: ${({ theme }) => theme.styles.button.previewButton.backgroundHover};
      }
    }
}
.card {
  width: auto;
  height: 100%;
  margin: 2rem;
  padding: 0;
  overflow: auto;
  background-color: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.card.color};
}
.card::-webkit-scrollbar {
  display: none;
}
.macroHeaderMem{
  display: flex;
  justify-content: space-between;
}
.macroHeaderTitle {
  align-self: center;
}
.macroFreeMem {
  width: 40%;
  display: flex;
  align-items: center;
}
.memSlider {
  width: -webkit-fill-available;
  margin-left: 8px;
  margin-right: 8px;
}
.memSlider {
  .rangeslider__fill {
    background-color: lightgreen;
  }
  .rangeslider__handle {
    display: none;
  }
}
.outOfMem {
  .rangeslider__fill {
    background-color: red;
  }
  .rangeslider__handle {
    background-color: red;
  }
}
.cardcontent {
  padding: 0px;
  &:last-child {
    padding-bottom: 0px;
  }
}
.iconFloppy{
  margin-right: 6px;
  width: 27px;
}
.cardHeader {
  background-color: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.card.color};
}
.cardTitle {
  color: ${({ theme }) => theme.card.color};
}

&.timelineWrapper {
  display: grid;
  grid-template-columns: minmax(auto,240px) 1fr;
  margin-top: 24px;
}
`;

class MacroManager extends Component {
  constructor(props) {
    super(props);

    this.trackingWidth = React.createRef();
    this.portal = React.createRef();

    this.state = {
      open: false,
      componentWidth: 0,
      rows: [],
      scrollPos: 0
    };
    this.keymapDB = new KeymapDB();

    this.parseKey = this.parseKey.bind(this);
  }

  parseKey(keycode) {
    const macro = this.props.macros[parseInt(this.keymapDB.parse(keycode).label)];
    let macroName;
    try {
      macroName = this.props.macros[parseInt(this.keymapDB.parse(keycode).label)].name.substr(0, 5);
    } catch (error) {
      macroName = "*NotFound*";
    }
    if (keycode >= 53852 && keycode <= 53852 + 128) {
      if (this.props.code !== null) return this.keymapDB.parse(keycode).extraLabel + "." + macroName;
    }
    return this.props.code !== null
      ? this.keymapDB.parse(keycode).extraLabel != undefined
        ? this.keymapDB.parse(keycode).extraLabel + "." + this.keymapDB.parse(keycode).label
        : this.keymapDB.parse(keycode).label
      : "";
  }

  updateWidth = () => {
    this.setState({
      componentWidth: 50
    });
    this.setState({
      componentWidth: this.trackingWidth.current.clientWidth
    });
  };

  updateScroll = scrollPos => {
    this.setState({ scrollPos });
  };

  componentDidMount() {
    // Additionally I could have just used an arrow function for the binding `this` to the component...
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    const { keymapDB, macro, macros, updateActions } = this.props;
    //console.log("Macro on TimelineEditorManager", macro);
    return (
      <Styles className="timelineWrapper">
        <div className="timelineHeaderWrapper">
          <div className="timelineHeader">
            <div className="timelineHeaderContent">
              <Title text={i18n.editor.macros.timelineTitle} headingLevel={4} />
              <div id="portalPreviewMacroModal" ref={this.portal}></div>
              {this.portal.current !== null ? (
                <PreviewMacroModal hookref={this.portal}>
                  {macro.actions.length > 0
                    ? macro.actions.map((item, index) => (
                        <span
                          key={`literal-${index}`}
                          className={`previewKey action-${item.actions} keyCode-${item.keyCode} ${
                            item.keyCode > 223 && item.keyCode < 232 && item.action != 2 ? "isModifier" : ""
                          }`}
                        >
                          {item.type == 2 ? (
                            <>
                              <IconStopWatchXs /> {item.keyCode}
                            </>
                          ) : this.parseKey(item.keyCode) == "SPACE" ? (
                            " "
                          ) : (
                            this.parseKey(item.keyCode)
                          )}
                        </span>
                      ))
                    : ""}
                </PreviewMacroModal>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="timelineBodyWrapper" ref={this.trackingWidth}>
          {macro !== null && macro.actions !== null && macro.actions.lenght > 0 ? (
            <div className="loading marginCenter">
              <Spinner className="spinner-border" role="status" />
            </div>
          ) : (
            <TimelineEditorForm
              macro={macro}
              updateActions={updateActions}
              keymapDB={keymapDB}
              componentWidth={this.state.componentWidth}
              updateScroll={this.updateScroll}
              scrollPos={this.state.scrollPos}
            />
          )}
          <div id="portalMacro"></div>
        </div>
      </Styles>
    );
  }
}

export default MacroManager;
