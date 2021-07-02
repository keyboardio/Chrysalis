import React, { Component } from "react";
// import { withStyles } from "@material-ui/core/styles";
// import {
//   MenuItem,
//   TextField,
//   FormControl,
//   IconButton,
//   ListItemText
// } from "@material-ui/core";
// import PublishRounded from "@material-ui/icons/PublishRounded";
import Styled from "styled-components";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";
import { MdPublish } from "react-icons/md";
import i18n from "../../i18n";

const Styles = Styled.div`
.tool-tabs {
}
.margin {
  padding-top: 1rem;
}
.flex {
  display: flex;
}
.iconbutton {
  width: auto;
  height: 100%;
  margin-top: 0;
}
.textField {
  min-width: 200px;
  padding: 0px;
}
.menuitem {
  display: flex;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.dropdown-menu {
  height: 300px;
  overflow-y: scroll;
}
`;

class MacroTabSpecial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyCode: 17492,
      action: 5
    };
    this.keymapDB = props.keymapDB;
    this.updateKeyCode = this.updateKeyCode.bind(this);
    this.updateAction = this.updateAction.bind(this);
  }

  updateKeyCode(key) {
    this.setState({ keyCode: parseInt(key) });
  }

  updateAction(act) {
    this.setState({ action: parseInt(act) });
    this.forceUpdate();
  }

  render() {
    const { actionTypes, onAddSpecial } = this.props;
    const { keyCode, action } = this.state;
    let keyvalues = this.keymapDB.allCodes
      .slice(11, 14)
      .map(group => group.keys)
      .flat();
    keyvalues = keyvalues.concat(this.keymapDB.allCodes[16].keys);
    const keys = (
      <div>
        <Dropdown
          key={action + keyCode}
          id="Select Function"
          label={i18n.editor.macros.selectFunction}
          value={keyCode}
          size="small"
          rows={10}
          className={"textField"}
          onSelect={this.updateKeyCode}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {keyvalues.map(item => {
              if (item.code === this.state.keyCode) {
                return item.labels.top + " " + item.labels.primary;
              }
            })}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {keyvalues.map((item, id) => {
              if (
                (item.labels.top === "MACRO" &&
                  parseInt(item.labels.primary) >= this.props.number) ||
                (item.labels.top === "MACRO" &&
                  parseInt(item.labels.primary) === this.props.selected)
              ) {
                return;
              }
              return (
                <Dropdown.Item eventKey={item.code} key={`item-${id}`}>
                  <div className={"menuitem"}>
                    <p>{item.labels.top + " " + item.labels.primary}</p>
                  </div>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
    const actions = (
      <div>
        <Dropdown
          key={action + keyCode}
          id="Select Action"
          label={i18n.editor.macros.selectAction}
          value={action}
          size="small"
          className={"textField"}
          onSelect={this.updateAction}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {actionTypes.map((item, id) => {
              if (id === this.state.action) {
                return item.name;
              }
            })}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {actionTypes.map((item, id) => {
              if (id > 2 && id < 6) {
                return (
                  <Dropdown.Item eventKey={id} key={`item-${id}`}>
                    <div className={"menuitem"}>
                      {item.smallIcon}
                      <p>{item.name}</p>
                    </div>
                  </Dropdown.Item>
                );
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );

    const button = (
      <Button
        onClick={() => {
          switch (action) {
            case 3:
            case 4:
            case 5:
              onAddSpecial(keyCode, action);
              break;
            default:
              break;
          }
        }}
        className="iconbutton"
      >
        <MdPublish />
      </Button>
    );

    return (
      <Styles>
        <Row>
          <Col>{actions}</Col>
          <Col className="center">{keys}</Col>
          <Col className="right">{button}</Col>
        </Row>
      </Styles>
    );
  }
}

export default MacroTabSpecial;
