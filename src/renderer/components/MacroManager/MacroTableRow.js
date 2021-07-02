import React, { Component } from "react";

// import { withStyles } from "@material-ui/core/styles";
// import {
//   MenuItem,
//   TextField,
//   FormControl,
//   Chip,
//   Divider,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   ListItemSecondaryAction
// } from "@material-ui/core";
// import { Close, DragIndicator } from "@material-ui/icons";
import Styled from "styled-components";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import { MdClose, MdDragHandle } from "react-icons/md";
import i18n from "../../i18n";

const Styles = Styled.div`
.chip {
  border-radius: 40px;
  min-width: 150px;
  margin-left: 2rem;
  margin-right: 2rem;
  font-size: larger;
  text-align: center;
}
.listitem {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-right: 80px;
}
.select {
  inline-size: -webkit-fill-available;
  max-width: 160px;
  margin-left: auto;
}
.compact {
  margin: 0px;
  padding: 0px;
}
`;

class MacroTableRow extends Component {
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
    const {
      provided,
      snapshot,
      item,
      modifiers,
      addModifier,
      actionTypes
    } = this.props;

    return (
      <Styles>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={this.getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <ListGroup.Item className="listitem">
            <div>
              <MdDragHandle />
            </div>
            <div
              style={{
                borderRadius: "100px"
              }}
            >
              {actionTypes[item.action].icon}
            </div>
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
            <div className="select">
              <Dropdown
                id="insert-modifiers"
                label={i18n.editor.macros.insertModifiers}
                value=""
                size="small"
                className={"textField"}
                onSelect={e => {
                  addModifier(item.id, e);
                }}
              >
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Add Modifier
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {modifiers.map((item, id) => (
                    <Dropdown.Item
                      eventKey={id}
                      key={`item-${id}`}
                      className="compact"
                    >
                      <span className="compact">{item.name}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <Button
                onClick={() => {
                  this.props.onDeleteRow(item.id);
                }}
              >
                <MdClose />
              </Button>
            </div>
          </ListGroup.Item>
          <hr />
        </div>
      </Styles>
    );
  }
}

export default MacroTableRow;
