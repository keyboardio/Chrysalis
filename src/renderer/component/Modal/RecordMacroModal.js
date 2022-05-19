import React from "react";
import Styled from "styled-components";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import i18n from "../../i18n";

import { RegularButton } from "../Button";

const Styles = Styled.div`
`;

export default class RecordMacroModal extends React.Component {
  constructor(props) {
    super(props);
    this.inputText = React.createRef();
    this.state = {
      showModal: false
    };
  }

  toggleShow = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  // componentDidUpdate(previousProps, previousState) {
  //   if (this.props != previousProps) {
  //     // console.log("PROBLEM", this.props.name, previousProps.name);
  //     this.setState({
  //       name: this.props.name
  //     });
  //   }
  // }

  render() {
    return (
      <Styles>
        <RegularButton
          buttonText={i18n.editor.macros.recordMacro}
          size="sm"
          style="outline-sm"
          icoPosition="right"
          onClick={this.toggleShow}
        />
        <Modal
          size="lg"
          show={this.state.showModal}
          onHide={this.toggleShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Record macro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegularButton
              buttonText={i18n.components.save.button}
              style="outline gradient"
              size="sm"
              onClick={this.toggleShow}
            />
            <p className="text-center">This house allows you to fail!</p>
          </Modal.Body>
        </Modal>
      </Styles>
    );
  }
}
