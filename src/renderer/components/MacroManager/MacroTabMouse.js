import React, { Component } from "react";

import Styled from "styled-components";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Form";
import Form from "react-bootstrap/Form";
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

// const styles = theme => ({
//   root: {
//     placeContent: "space-between",
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   avatar: {
//     paddingTop: "4px",
//     paddingBottom: "4px"
//   }
// });

class MacroTabMouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyCode: 20545,
      action: 3
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
    const keyvalues = this.keymapDB.allCodes
      .slice(18, 20)
      .map(group => group.keys)
      .flat();
    const keys = (
      <div>
        <Dropdown
          key={action + keyCode}
          id="Select Mouse Function"
          label={i18n.editor.macros.selectMouseFunction}
          value={keyCode}
          size="small"
          rows={10}
          className={"textField"}
          onSelect={this.updateKeyCode}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {keyvalues.map(item => {
              if (item.code === this.state.keyCode) {
                return item.labels.top + " " + item.labels.primary;
              }
            })}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {keyvalues.map((item, id) => {
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

export default MacroTabMouse;
