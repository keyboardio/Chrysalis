import React, { Component } from "react";

import Styled from "styled-components";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ListGroup from "react-bootstrap/ListGroup";
import { MdContentCopy, MdPlaylistAdd, MdDeleteForever } from "react-icons/md";

import i18n from "../../i18n";

const Styles = Styled.div`
.list {
  display: block;
  height: 515px;
  overflow: auto;
  background-color: ${({ theme }) => theme.card.background};
}
.selected {
  background-color: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.text};
}
.notSelected {
  background-color: ${({ theme }) => theme.colors.body};
  cursor: pointer;
  &:hover: {
    background: ${({ theme }) => theme.colors.button.disable};
  }
}
.extrapadding {
  paddingLeft: 10px;
  paddingTop: 10px;
  paddingBottom: 10px;
}
`;

class MacroSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSelectMacro(id) {
    this.props.updateSelected(id);
  }

  render() {
    const { macros, selected } = this.props;
    const highlight = macros.map((item, index) => {
      if (index === selected) {
        return "selected";
      } else {
        return "notSelected";
      }
    });
    return (
      <Styles>
        <ListGroup className="list">
          {macros.length !== 0 ? (
            macros.map((item, index) => {
              if (item !== undefined) {
                return (
                  <div key={index}>
                    <ListGroup.Item
                      className={highlight[index]}
                      onClick={() => {
                        this.onSelectMacro(index);
                      }}
                    >
                      <Row>
                        <Col xs={1}>
                          <span>{index}</span>
                        </Col>
                        <Col xs={3}>
                          <p className="extrapadding">{item.name}</p>
                        </Col>
                        <Col xs={6}>
                          <p className="extrapadding">{item.macro}</p>
                        </Col>
                        <Col xs={1}>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                              <Tooltip id="button-tooltip">
                                {i18n.editor.macros.copy}
                              </Tooltip>
                            }
                          >
                            <Button
                              disabled={this.props.disableAdd}
                              onClick={() => {
                                this.props.duplicateMacro(index);
                              }}
                            >
                              <span className="button-icon">
                                <MdContentCopy />
                              </span>
                            </Button>
                          </OverlayTrigger>
                        </Col>
                        <Col xs={1}>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                              <Tooltip id="button-tooltip">
                                {i18n.editor.macros.delete}
                              </Tooltip>
                            }
                          >
                            <Button
                              onClick={() => {
                                this.props.deleteMacro(index);
                              }}
                            >
                              <MdDeleteForever fontSize="small" />
                            </Button>
                          </OverlayTrigger>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <hr />
                  </div>
                );
              } else {
                return;
              }
            })
          ) : (
            <React.Fragment />
          )}
          <ListGroup.Item disabled={this.props.disableAdd}>
            {/* <Avatar>N</Avatar>
            <ListItemText primary="Add new Macro" /> */}
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip">{i18n.editor.macros.add}</Tooltip>
              }
            >
              <Button onClick={this.props.addMacro}>
                <MdPlaylistAdd />
              </Button>
            </OverlayTrigger>
          </ListGroup.Item>
        </ListGroup>
      </Styles>
    );
  }
}

export default MacroSelector;
