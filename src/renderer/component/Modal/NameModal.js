import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { RegularButton } from "../Button";

export default class NameModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name
    };
  }

  render() {
    const { show, toggleShow, handleSave, modalTitle, labelInput } = this.props;
    return (
      <Modal size="lg" show={show} onHide={toggleShow} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>{labelInput}</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <RegularButton buttonText={"Discard changes"} style="outline" size="sm" onClick={toggleShow} />
          <RegularButton
            buttonText={"Save changes"}
            style="outline gradient"
            size="sm"
            onClick={event => handleSave(this.state.name)}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
