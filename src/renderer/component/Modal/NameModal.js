import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import i18n from "../../i18n";

import { RegularButton } from "../Button";

export default class NameModal extends React.Component {
  constructor(props) {
    super(props);
    this.inputText = React.createRef();
    this.state = {
      name: props.name
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props != previousProps) {
      // console.log("PROBLEM", this.props.name, previousProps.name);
      this.setState({
        name: this.props.name
      });
    }
  }

  render() {
    const { show, toggleShow, handleSave, modalTitle, labelInput, id } = this.props;
    return (
      <Modal size="lg" show={show} onHide={toggleShow} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>{labelInput}</Form.Label>
          <Form.Control
            type="text"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            ref={this.inputText}
          />
        </Modal.Body>
        <Modal.Footer>
          <RegularButton buttonText={i18n.app.cancelPending.button} style="outline" size="sm" onClick={toggleShow} />
          <RegularButton
            buttonText={i18n.components.save.button}
            style="outline gradient"
            size="sm"
            onClick={event => handleSave(this.state.name)}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
