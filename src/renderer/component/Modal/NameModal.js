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
    const { show, toggleShow, handleSave } = this.props;
    return (
      <Modal size="lg" show={show} onHide={toggleShow} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Nueron name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <RegularButton buttonText={"Discard changes"} style="outline" onClick={toggleShow} />
          <RegularButton buttonText={"Save changes"} style="primary" onClick={event => handleSave(this.state.name)} />
        </Modal.Footer>
      </Modal>
    );
  }
}
