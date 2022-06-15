import React, { Component } from "react";

import Styled, { withTheme } from "styled-components";

import Dropdown from "react-bootstrap/Dropdown";
import i18n from "../../i18n";

import Title from "../../component/Title";
import { ButtonConfig } from "../../component/Button";
import { MacroKeyModal } from "../../component/Modal";

import {
  IconClone,
  IconDragAndDrop,
  IconThreeDots,
  IconPressSm,
  IconReleaseSm,
  IconPressAndReleaseSm,
  IconDelete,
  IconStopWatchSm
} from "../../component/Icon";
import { FaLinux } from "react-icons/fa";
import { AiFillWindows, AiFillApple } from "react-icons/ai";

const Styles = Styled.div`
.chip {
  font-weight: 600;
  margin: 0;
  padding: 6px 0 6px 6px;
  background-color: transparent;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 74px;
  overflow: hidden;
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
      backgroundColor: this.props.theme.styles.macroKey.backgroundColorDrag,
      backgroundImage: this.props.theme.styles.macroKey.backgroundDrag,
      backgroundSize: "56.57px 56.57px",
      borderRadius: "6px",
      boxShadow: this.props.theme.styles.macroKey.boxShadowOnDrag
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
    const { provided, snapshot, item, modifiers, addModifier, actionTypes, updateAction } = this.props;
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
                  <Dropdown label={i18n.editor.macros.insertModifiers} value="" size="small" className={"keyMacroOptions"}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" drop="up" align="end">
                      <IconThreeDots />
                    </Dropdown.Toggle>
                    <MacroKeyModal>
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

                          <div className="keyFunctions">
                            <Title headingLevel={5} text="Edit function" />
                            <div className="keyFunctionsButtons">
                              <ButtonConfig
                                buttonText={"Press"}
                                icoPosition="left"
                                icoSVG={<IconPressSm />}
                                selected={actionTypes[item.action].name == "Key Press" ? true : false}
                                disabled={item.action == 2 ? true : false}
                                onClick={() => updateAction(item.id, 6)}
                              />
                              <ButtonConfig
                                buttonText={"Release"}
                                icoPosition="left"
                                icoSVG={<IconReleaseSm />}
                                selected={actionTypes[item.action].name == "Key Release" ? true : false}
                                disabled={item.action == 2 ? true : false}
                                onClick={() => updateAction(item.id, 7)}
                              />
                              <ButtonConfig
                                buttonText={"Press & Release"}
                                icoPosition="left"
                                icoSVG={<IconPressAndReleaseSm />}
                                selected={actionTypes[item.action].name == "Key Press & Rel." ? true : false}
                                disabled={item.action == 2 ? true : false}
                                onClick={() => updateAction(item.id, 8)}
                              />
                            </div>
                          </div>

                          <div className="keyModifiers">
                            <Title headingLevel={4} text="Add modifier" />
                            <div className="keyModifiersButtons">
                              {modifiers.map((elem, id) => {
                                switch (elem.name) {
                                  case "LEFT SHIFT":
                                    return (
                                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                        <ButtonConfig
                                          buttonText="L. Shift"
                                          onClick={e => {
                                            addModifier(item.id, id);
                                          }}
                                        />
                                      </Dropdown.Item>
                                    );
                                  case "RIGHT SHIFT":
                                    return (
                                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                        <ButtonConfig
                                          buttonText="R. Shift"
                                          onClick={e => {
                                            addModifier(item.id, id);
                                          }}
                                        />
                                      </Dropdown.Item>
                                    );
                                  case "LEFT CTRL":
                                    return (
                                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                        <ButtonConfig
                                          buttonText="L. Ctrl"
                                          onClick={e => {
                                            addModifier(item.id, id);
                                          }}
                                        />
                                      </Dropdown.Item>
                                    );
                                  case "RIGHT CTRL":
                                    return (
                                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                        <ButtonConfig
                                          buttonText="R. Ctrl"
                                          onClick={e => {
                                            addModifier(item.id, id);
                                          }}
                                        />
                                      </Dropdown.Item>
                                    );
                                  case "LEFT ALT":
                                    return (
                                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                        <ButtonConfig
                                          buttonText="Alt"
                                          onClick={e => {
                                            addModifier(item.id, id);
                                          }}
                                        />
                                      </Dropdown.Item>
                                    );
                                  case "RIGHT ALT":
                                    return (
                                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                        <ButtonConfig
                                          buttonText="Alt Gr."
                                          onClick={e => {
                                            addModifier(item.id, id);
                                          }}
                                        />
                                      </Dropdown.Item>
                                    );
                                  case "LEFT GUI":
                                    return (
                                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                        <ButtonConfig
                                          buttonText="L. OS"
                                          onClick={e => {
                                            addModifier(item.id, id);
                                          }}
                                        />
                                      </Dropdown.Item>
                                    );
                                  case "RIGHT GUI":
                                    return (
                                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="unstyled">
                                        <ButtonConfig
                                          buttonText="R. OS"
                                          onClick={e => {
                                            addModifier(item.id, id);
                                          }}
                                        />
                                      </Dropdown.Item>
                                    );

                                  default:
                                    return "";
                                }
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="keyMacroItemOptions">
                          <Dropdown.Item key={`item-clone`} className="compact">
                            <div
                              onClick={() => {
                                this.props.onCloneRow(item.id);
                              }}
                              className="dropdownInner"
                            >
                              <div className="dropdownIcon">
                                <IconClone />
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
                    </MacroKeyModal>
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
                  ) : actionTypes[item.action].name == "Delay" ? (
                    <IconStopWatchSm />
                  ) : (
                    ""
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

export default withTheme(KeyMacro);
