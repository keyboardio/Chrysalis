import React, { Component } from "react";

import Styled from "styled-components";

import Dropdown from "react-bootstrap/Dropdown";

import { MdClose } from "react-icons/md";
import i18n from "../../i18n";

import { IconDragAndDrop, IconThreeDots } from "../../component/Icon";

const Styles = Styled.div`
.chip {
  font-weight: 600;
}
.listitem {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-right: 80px;
}
.actionicon {

}


.keyMacro {
    border-radius: 4px;
    background-color:  ${({ theme }) => theme.styles.macroKey.background};
    padding: 3px;
    width: 100px;
    margin: 4px 2px;
    .headerDrag {
        border-radius: 4px 4px 0px 0px;
        background-color:  ${({ theme }) => theme.styles.macroKey.backgroundHeader};
        border-bottom: 1px solid ${({ theme }) => theme.styles.macroKey.borderColor}; 
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 6px;
    }
    .bodyDrag {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }
    .dropdown-toggle.btn.btn-primary {
        padding: 0;
        background-color: transparent;
        margin: 0;
        border: none;
        &:after {
            content: none;
        }
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

    return (
      <Styles>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <div className="keyMacro">
            <div className="headerDrag">
              <div className="dragable">
                <IconDragAndDrop />
              </div>
              <div className="moreOptions">
                <Dropdown
                  id="insert-modifiers"
                  label={i18n.editor.macros.insertModifiers}
                  value=""
                  size="small"
                  className={"keyMacroOptions"}
                  onSelect={e => {
                    addModifier(item.id, e);
                  }}
                >
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    <IconThreeDots />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {modifiers.map((item, id) => (
                      <Dropdown.Item eventKey={id} key={`item-${id}`} className="compact">
                        <span className="compact">{item.name}</span>
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item key={`item-delete`} className="compact">
                      <div
                        onClick={() => {
                          this.props.onDeleteRow(item.id);
                        }}
                      >
                        <MdClose /> Delete
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="bodyDrag">
              <p
                className="chip"
                style={{
                  backgroundColor: item.color,
                  borderColor: item.color,
                  // HACK allow the text to be visible on darkTheme
                  // without completely rewriting the code which assigns the background colors
                  color: "#000"
                }}
              >
                {item.symbol}
              </p>
              <div className="actionicon">{actionTypes[item.action].icon}</div>
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default KeyMacro;
