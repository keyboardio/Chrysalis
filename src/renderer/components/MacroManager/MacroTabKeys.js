import React, { Component } from "react";

// import { withStyles } from "@material-ui/core/styles";
// import {
//   MenuItem,
//   TextField,
//   FormControl,
//   IconButton,
//   ListItemText,
//   InputAdornment
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
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

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
.avatar {
  padding-top: 4px;
  padding-bottom: 4px;
  color: lightgrey;
}
.dropdown-menu {
  height: 300px;
  overflow-y: scroll;
}
`;

class MacroTabKeys extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyCode: 4,
      action: 8,
      delay: 100
    };
    this.keymapDB = props.keymapDB;
    this.updateKeyCode = this.updateKeyCode.bind(this);
    this.updateAction = this.updateAction.bind(this);
  }

  updateKeyCode(key) {
    console.log(key);
    this.setState({ keyCode: parseInt(key) });
  }

  updateAction(act) {
    this.setState({ action: parseInt(act) });
    this.forceUpdate();
  }

  render() {
    const { actionTypes, onAddSymbol, onAddDelay } = this.props;
    const { keyCode, action, delay } = this.state;
    const keyvalues = this.keymapDB.allCodes
      .slice(0, 9)
      .map(group => group.keys)
      .flat();
    let groups = this.keymapDB.allCodes
      .slice(0, 9)
      .map((group, i) => {
        return { index: i, key: group.keys, name: group.groupName };
      })
      .flat();
    let aux = [];
    for (let index = 0; index < groups.length; index++) {
      aux.push(Array(groups[index].key.length).fill(groups[index].name));
    }
    groups = aux.flat();
    const keys = (
      <div>
        <Dropdown
          key={action + keyCode}
          id="Select Key"
          label={i18n.editor.macros.selectKey}
          value={keyCode}
          size="small"
          rows={10}
          className={"textField"}
          onSelect={this.updateKeyCode}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {keyvalues.map((item, id) => {
              if (item.code === this.state.keyCode) {
                return groups[id] + " " + item.labels.primary;
              }
            })}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {keyvalues.map((item, id) => (
              <Dropdown.Item eventKey={item.code} key={`item-${id}`}>
                <div className={"menuitem"}>
                  <span className={"avatar"}>
                    {/* //TODO: lets see if we can make this a little nicer? */}
                    {groups[id]}
                  </span>
                  <p>{item.labels.primary}</p>
                </div>
              </Dropdown.Item>
            ))}
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
              if ((id > 1 && id < 3) || (id > 5 && id < 9)) {
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

    const delayFill = (
      <Form.Control
        placeholder={i18n.editor.macros.Delay}
        type="number"
        className={"textField"}
        value={delay}
        onChange={e => {
          if (e.target.value > 65536) {
            this.setState({ delay: 65536 });
          } else {
            this.setState({ delay: e.target.value });
          }
        }}
      />
    );

    const button = (
      <Button
        onClick={() => {
          switch (action) {
            case 2:
              onAddDelay(delay, action);
              break;
            case 6:
            case 7:
            case 8:
              onAddSymbol(keyCode, action);
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
          <Col className="center"> {action <= 2 ? delayFill : keys}</Col>
          <Col className="right">{button}</Col>
        </Row>
      </Styles>
    );
  }
}

export default MacroTabKeys;
