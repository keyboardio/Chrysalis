import PropTypes from "prop-types";
import React, { Component } from "react";
import i18n from "../../i18n";

// React Bootstrap Components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Own Components
import Title from "../../component/Title";
import { NeuronSelector } from "../../component/Select";
import NeuronData from "../../modules/NeuronData";

// Icons Imports
import { IconNeuronManager } from "../../component/Icon";

export default class NeuronSettings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { neurons, selectedNeuron, selectNeuron, updateNeuronName, deleteNeuron } = this.props;
    return (
      <Card className="overflowFix card-preferences mt-4">
        <Card.Title>
          <Title text={i18n.keyboardSettings.neuronManager.header} headingLevel={3} svgICO={<IconNeuronManager />} />
        </Card.Title>
        <Card.Body className="py-0">
          <Form.Group controlId="backupFolder" className="mb-3">
            <NeuronSelector
              onSelect={selectNeuron}
              itemList={neurons}
              selectedItem={selectedNeuron}
              updateItem={updateNeuronName}
              deleteItem={deleteNeuron}
              subtitle={i18n.keyboardSettings.neuronManager.neuronLabel}
            />
            <Row className="mb-4 mt-4">
              <Col>
                <NeuronData neurons={neurons} selectedNeuron={selectedNeuron} />
              </Col>
            </Row>
          </Form.Group>
        </Card.Body>
      </Card>
    );
  }
}

NeuronSettings.propTypes = {
  neurons: PropTypes.array.isRequired,
  selectedNeuron: PropTypes.number.isRequired,
  selectNeuron: PropTypes.func.isRequired,
  updateNeuronName: PropTypes.func.isRequired,
  deleteNeuron: PropTypes.func.isRequired
};
