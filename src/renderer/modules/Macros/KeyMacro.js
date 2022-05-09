import React, { Component } from "react";

import Styled from "styled-components";

import Dropdown from "react-bootstrap/Dropdown";

import { MdClose } from "react-icons/md";
import i18n from "../../i18n";

import Title from "../../component/Title";
import { ButtonConfig } from "../../component/Button";

import {
  IconDragAndDrop,
  IconThreeDots,
  IconPressSm,
  IconReleaseSm,
  IconPressAndReleaseSm,
  IconDelete,
  IconAddLayer,
  IconStopWatchSm
} from "../../component/Icon";
import { FaLinux } from "react-icons/fa";
import { AiFillWindows, AiFillApple } from "react-icons/ai";

const Styles = Styled.div`
.chip {
  font-weight: 600;
  margin: 0;
  padding: 6px;
  background-color: transparent;
  font-size: 13px;
}

.keyMacroWrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    top: 71px;
    left: 0; 
    background-color: ${({ theme }) => theme.styles.macro.timelineBackground};
  }
}
.keyMacro {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.styles.macroKey.background};
    padding: 3px;
    width: 100px;
    height: 64px;
    margin: 4px 2px;
    display: flex;
    flex-wrap: wrap;
    .headerDrag {
        border-radius: 4px 4px 0px 0px;
        background-color:  ${({ theme }) => theme.styles.macroKey.backgroundHeader};
        border-bottom: 1px solid ${({ theme }) => theme.styles.macroKey.borderColor}; 
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0; 
        padding-right: 4px;
        flex: 0 0 100%;
    }
    .dragable {
      color:  ${({ theme }) => theme.styles.macroKey.iconDragColor};  
      padding: 0 6px;
    }
    .actionicon {
      color:  ${({ theme }) => theme.styles.macroKey.actionIconColor};
    }
    .bodyDrag {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;  
        flex: 0 0 100%;
    }
    .dropdown-toggle.btn.btn-primary {
        padding: 0 2px;
        background-color: transparent;
        margin: 0;
        border: none;
        &:after {
            content: none;
        }
    }
    .keyMacroMiniDashboard {
        border-radius: 6px;
        overflow: hidden;
    }
    .keyInfo {
        padding: 16px 12px 12px 12px;
        background: ${({ theme }) => theme.styles.macro.keyInfoBackground}; 
        h4 {
            font-weight: 600;
            text-transform: uppercase;
            margin: 0;
            font-size: 13px;
            font-weight: 500;
            color: ${({ theme }) => theme.styles.macro.keyInfoTitle}; 
        }
    }
    .keyFunctions {
        border-top: 1px solid ${({ theme }) => theme.styles.macro.keyFunctionsBorder};
        padding: 12px 8px;
        background: ${({ theme }) => theme.styles.macro.keyInfoBackground}; 
        h5 {
            color: ${({ theme }) => theme.styles.macro.keyFunctionTile};
            font-size: 13px;
            font-weight: 500;
            text-transform: none; 
            letter-spacingL: -0.025em; 
            margin: 0;
            margin-bottom: 8px;
        }
    }
    .keyFunctionsButtons {
      display: flex;
      flex-wrap: nowrap;
      margin-left: -2px;
      margin-right: -2px;
    }
    .button-config {
      color: ${({ theme }) => theme.styles.button.config.color};
      white-space: nowrap;
      margin: 0 2px;
      flex-grow: 1;
      text-align: center;
      &:hover {
        color: ${({ theme }) => theme.styles.button.config.colorHover};
      }
    }
    .keyModifiers {
      padding: 12px 8px;
      h4 {
          color: ${({ theme }) => theme.styles.macro.keyFunctionTile};
          font-size: 13px;
          font-weight: 500;
          text-transform: none; 
          letter-spacingL: -0.025em; 
          margin-bottom: 8px;
      }
      background: ${({ theme }) => theme.styles.macro.keyMacroMiniDashboardBackground}; 
    }
    .keyValue {
        color: ${({ theme }) => theme.styles.macro.keyValueColor};
        font-size: 24px;
        font-weight: 600;
        text-transform: capitalize;
        margin: 0;
        small {
          text-transform: none;
          font-size: 16px;
          font-weight: 600;
        }
    }
    .keyMacroItemOptions {
      padding-top: 8px;
    }
    .keyModifiersButtons {
      display: flex;
      flex-wrap: nowrap;
      margin-left: -2px;
      margin-right: -2px;
      display: grid;
      grid-gap: 6px 4px;
      grid-template-columns: repeat(4, 1fr);
    }
    .dropdown-menu {
      min-width: 362px;
      padding: 8px;
    }
    .dropdown-item.unstyled {
      padding: 0;
      margin: 0 2px;

    }
}
.keyMacroFreeSlot {
  background: transparent;
}
.keyMacroOptions {
  .dropdown-toggle.btn.btn-primary{
    color: ${({ theme }) => theme.styles.macroKey.dropdownIconColor};
  }
  &.show {
    .dropdown-toggle.btn.btn-primary {
      color: #fff;
      background-color: ${({ theme }) => theme.styles.macroKey.dropdownIconColor};
    }
  }
}
.isModifier {
  .keyMacroOptions {
    .dropdown-toggle.btn.btn-primary{
      color: ${({ theme }) => theme.styles.macroKey.dropdownIconColorModifier};
    }
  }
  .keyMacro {
    order: 2;
    // width: 86px;
    color: ${({ theme }) => theme.styles.macroKey.colorModifier}; 
    .headerDrag {
      order: 2;
      border-radius: 0px 0px 4px 4px;
      background-color: ${({ theme }) => theme.styles.macroKey.backgroundHeaderModifier};
      border-bottom: none;
      border-top: 1px solid ${({ theme }) => theme.styles.macroKey.borderColorModifier}; 
    }
    .bodyDrag {
      order: 1;
    }
    .dragable {
      color:  ${({ theme }) => theme.styles.macroKey.iconDragColorModifier};
    }
  }
  .keyMacroFreeSlot {
    order: 1;
  }
  .actionicon {
    color:  ${({ theme }) => theme.styles.macroKey.actionColorModifier};
  }

  // Shift modifiers
  &.keyCode-229,
  &.keyCode-225 {
    .keyMacro {
      background: ${({ theme }) => theme.styles.macroKey.shift.background}; 
      color:  ${({ theme }) => theme.styles.macroKey.shift.color};
    }
    .keyMacroFreeSlot {
      background: transparent;
    }
    .actionicon {
      color:  ${({ theme }) => theme.styles.macroKey.shift.actionColor};
    }
  }
  // Control modifiers
  &.keyCode-224,
  &.keyCode-228 {
    .keyMacro {
      background: ${({ theme }) => theme.styles.macroKey.control.background}; 
    }
    .keyMacroFreeSlot {
      background: transparent;
    }
  }
  // Alt modifiers
  &.keyCode-226,
  &.keyCode-230 {
    .keyMacro {
      background: ${({ theme }) => theme.styles.macroKey.alt.background}; 
    }
    .keyMacroFreeSlot {
      background: transparent;
    }
  }
  // OS modifiers
  &.keyCode-227,
  &.keyCode-231 {
    .keyMacro {
      background: ${({ theme }) => theme.styles.macroKey.os.background}; 
    }
    .keyMacroFreeSlot {
      background: transparent;
    }
  }
}
.isDelay {
  .keyMacroOptions {
    .dropdown-toggle.btn.btn-primary{
      color: ${({ theme }) => theme.styles.macroKey.dropdownIconColorModifier};
    }
  }
  .keyMacro {
    background-color:  ${({ theme }) => theme.styles.macroKey.delay.background};
    color: ${({ theme }) => theme.styles.macroKey.delay.color}; 
    .headerDrag {
      border-bottom: 1px solid ${({ theme }) => theme.styles.macroKey.delay.borderColor};
    }
  }
  .keyMacroFreeSlot {
    background: transparent;
  }
  .dragable {
    color:  ${({ theme }) => theme.styles.macroKey.iconDragColorModifier};
  }
  .actionicon {
    color:  ${({ theme }) => theme.styles.macroKey.delay.actionIconColor};
  }
}
`;

class KeyMacro extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      // HACK This gives us some readability on both light and dark themes
      // , but it actually needs to be refactored to allow theme use
      background: "#9e9e9e"
    })
  });

  shadeColor(color, percent) {
    if (color === "transparent") {
      return color;
    }
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 - percent)) / 100);
    G = parseInt((G * (100 - percent)) / 100);
    B = parseInt((B * (100 - percent)) / 100);

    R = Math.round((R * 255) / (R + 5));
    G = Math.round((G * 255) / (G + 5));
    B = Math.round((B * 255) / (B + 5));

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  render() {
    const { provided, snapshot, item, modifiers, addModifier, actionTypes } = this.props;
    const operationSystem = process.platform;
    let operationSystemIcons = [];
    if (operationSystem === "darwin") {
      operationSystemIcons = {
        shift: "Shift",
        control: "Control ^",
        os: {
          icon: false,
          text: "⌘"
        },
        alt: "⌥",
        altGr: "Right ⌥"
      };
    } else {
      if (operationSystem === "win32") {
        operationSystemIcons = {
          shift: "Shift",
          control: "Control",
          os: {
            icon: <AiFillWindows />,
            text: false
          },
          alt: "Alt",
          altGr: "Alt Gr."
        };
      } else {
        operationSystemIcons = {
          shift: "Shift",
          control: "Control",
          os: {
            icon: <FaLinux />,
            text: false
          },
          alt: "Alt",
          altGr: "Alt Gr."
        };
      }
    }
    let isModifier = false;
    if (item.keyCode > 223 && item.keyCode < 232 && item.action != 2) {
      isModifier = true;
    }

    console.log("Item", item);
    return (
      <Styles>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <div
            className={`keyMacroWrapper keyCode-${item.keyCode} ${isModifier ? "isModifier" : ""} ${
              item.action == 2 ? "isDelay" : ""
            }`}
          >
            <div className="keyMacro">
              <div className="headerDrag">
                <div className="dragable">
                  <IconDragAndDrop />
                </div>
                <div className="moreOptions">
                  <Dropdown
                    label={i18n.editor.macros.insertModifiers}
                    value=""
                    size="small"
                    className={"keyMacroOptions"}
                    onSelect={e => {
                      addModifier(item.id, e);
                    }}
                  >
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" drop="up" align="end">
                      <IconThreeDots />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <div className="keyMacroMiniDashboard">
                        <div className="keyInfo">
                          {item.action == 2 ? (
                            <Title headingLevel={4} text={i18n.editor.macros.delay} />
                          ) : (
                            <Title headingLevel={4} text={i18n.general.key} />
                          )}
                          <p className="keyValue">
                            {item.symbol} {item.action == 2 ? <small>ms</small> : ""}
                          </p>
                        </div>
                        {item.action != 2 ? (
                          <div className="keyFunctions">
                            <Title headingLevel={5} text="Edit function" />
                            <div className="keyFunctionsButtons">
                              <ButtonConfig
                                buttonText={"Press"}
                                icoPosition="left"
                                icoSVG={<IconPressSm />}
                                selected={actionTypes[item.action].name == "Key Press" ? true : false}
                              />
                              <ButtonConfig
                                buttonText={"Release"}
                                icoPosition="left"
                                icoSVG={<IconReleaseSm />}
                                selected={actionTypes[item.action].name == "Key Release" ? true : false}
                              />
                              <ButtonConfig
                                buttonText={"Press & Release"}
                                icoPosition="left"
                                icoSVG={<IconPressAndReleaseSm />}
                                selected={actionTypes[item.action].name == "Key Press & Rel." ? true : false}
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="keyModifiers">
                          <Title headingLevel={4} text="Add modifier" />
                          <div className="keyModifiersButtons">
                            {modifiers.map(
                              (item, id) =>
                                // item.name == "LEFT SHIFT" ? (
                                //   <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                //     <ButtonConfig buttonText={operationSystemIcons.shift} />
                                //   </Dropdown.Item>
                                // ) : item.name == "LEFT CTRL" ? (
                                //   <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                //     <ButtonConfig buttonText={operationSystemIcons.control} />
                                //   </Dropdown.Item>
                                // ) : item.name == "LEFT ALT" ? (
                                //   <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                //     <ButtonConfig buttonText={operationSystemIcons.alt} />
                                //   </Dropdown.Item>
                                // ) : item.name == "RIGHT ALT" ? (
                                //   <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                //     <ButtonConfig buttonText={operationSystemIcons.altGr} />
                                //   </Dropdown.Item>
                                // ) : (
                                //   <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                //     {operationSystemIcons.os.text ? (
                                //       <ButtonConfig buttonText={operationSystemIcons.os.text} />
                                //     ) : (
                                //       <ButtonConfig icoSVG={operationSystemIcons.os.icon} />
                                //     )}
                                //   </Dropdown.Item>
                                // )
                                item.name == "LEFT SHIFT" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="L. Shift" />
                                  </Dropdown.Item>
                                ) : item.name == "RIGHT SHIFT" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="R. Shift" />
                                  </Dropdown.Item>
                                ) : item.name == "LEFT CTRL" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="L. Ctrl" />
                                  </Dropdown.Item>
                                ) : item.name == "RIGHT CTRL" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="R. Ctrl" />
                                  </Dropdown.Item>
                                ) : item.name == "LEFT ALT" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="Alt" />
                                  </Dropdown.Item>
                                ) : item.name == "RIGHT ALT" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="Alt Gr." />
                                  </Dropdown.Item>
                                ) : item.name == "RIGHT ALT" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="R. Alt" />
                                  </Dropdown.Item>
                                ) : item.name == "LEFT GUI" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="L. OS" />
                                  </Dropdown.Item>
                                ) : item.name == "RIGHT GUI" ? (
                                  <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                    <ButtonConfig buttonText="R. OS" />
                                  </Dropdown.Item>
                                ) : (
                                  ""
                                )
                              // <ButtonConfig
                              //   key={`itemButton-${id}`}
                              //   buttonText={item.name}
                              //   onClick={e => {
                              //     addModifier(item.id, e);
                              //   }}
                              // />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="keyMacroItemOptions">
                        <Dropdown.Item key={`item-clone`} className="compact">
                          <div
                            onClick={() => {
                              this.props.onDeleteRow(item.id);
                            }}
                            className="dropdownInner"
                          >
                            <div className="dropdownIcon">
                              <IconAddLayer />
                            </div>
                            <div className="dropdownItem">Clone</div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item key={`item-delete`} className="compact">
                          <div
                            onClick={() => {
                              this.props.onDeleteRow(item.id);
                            }}
                            className="dropdownInner"
                          >
                            <div className="dropdownIcon">
                              <IconDelete />
                            </div>
                            <div className="dropdownItem">Delete</div>
                          </div>
                        </Dropdown.Item>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="bodyDrag">
                <p
                  className="chip"
                  style={
                    {
                      //backgroundColor: item.color,
                      //borderColor: item.color,
                      // HACK allow the text to be visible on darkTheme
                      // without completely rewriting the code which assigns the background colors
                      //color: "#000"
                    }
                  }
                >
                  {item.symbol}
                </p>
                <div className="actionicon">
                  {actionTypes[item.action].name == "Key Press" ? (
                    <IconPressSm />
                  ) : actionTypes[item.action].name == "Key Release" ? (
                    <IconReleaseSm />
                  ) : actionTypes[item.action].name == "Key Press & Rel." ? (
                    <IconPressAndReleaseSm />
                  ) : (
                    <IconStopWatchSm />
                  )}
                </div>
              </div>
            </div>
            <div className="keyMacro keyMacroFreeSlot"></div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default KeyMacro;
