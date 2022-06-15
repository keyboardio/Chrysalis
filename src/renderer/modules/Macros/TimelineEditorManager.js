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

import TimelineEditorForm from "./TimelineEditorForm";
import Title from "../../component/Title";

const Styles = Styled.div`
background-color: ${({ theme }) => theme.styles.macro.timelineBackground};
border-radius: 0px 0px 16px 16px;
padding-bottom: 20px;   
margin-top: 2px;
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
      padding: 6px 12px;
      border: 1px solid ${({ theme }) => theme.styles.button.previewButton.borderColor};
      color:  ${({ theme }) => theme.styles.button.previewButton.color};
      margin-left: 24px;
      font-size: 14px;
      transition: 300ms ease-in-out;
      transition-property: background, color, border;
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
`;

class MacroManager extends Component {
  constructor(props) {
    super(props);

    this.trackingWidth = React.createRef();

    this.state = {
      open: false,
      componentWidth: 0
    };
  }

  updateWidth = () => {
    this.setState({
      componentWidth: 50
    });
    this.setState({
      componentWidth: this.trackingWidth.current.clientWidth
    });
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
    const { keymapDB, macro, updateActions } = this.props;

    return (
      <Styles>
        <div className="timelineHeader" ref={this.trackingWidth}>
          <Title text={i18n.editor.macros.timelineTitle} headingLevel={4} />
          <div id="portalPreviewMacroModal"></div>
          {/* <PreviewMacroModal>
            {this.state.rows.length == 0 ? (
              <></>
            ) : (
              this.state.rows.map((item, index) => (
                <span
                  key={`literal-${index}`}
                  className={`previewKey action-${item.action} keyCode-${item.keyCode} ${
                    item.keyCode > 223 && item.keyCode < 232 && item.action != 2 ? "isModifier" : ""
                  }`}
                >
                  {item.action == 2 ? <IconStopWatchXs /> : ""}
                  {item.symbol == "SPACE" ? " " : item.symbol}
                </span>
              ))
            )}
          </PreviewMacroModal> */}
        </div>
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
          />
        )}
        <div id="portalMacro"></div>
      </Styles>
    );
  }
}

export default MacroManager;
