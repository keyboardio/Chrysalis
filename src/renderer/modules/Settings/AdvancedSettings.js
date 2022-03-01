import PropTypes from "prop-types";
import React, { Component } from "react";
import i18n from "../../i18n";
import Focus from "../../../api/focus";

// React Bootstrap Components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Own Components
import Title from "../../component/Title";
import { RegularButton } from "../../component/Button";
import ConfirmationDialog from "../../components/ConfirmationDialog";

// Icons Imports
import { IconChip } from "../../component/Icon";

export default class AdvancedSettings extends Component {
  render() {
    const { devToolsSwitch, verboseSwitch } = this.props;
    return (
      <Card className="overflowFix card-preferences mt-4">
        <Card.Title>
          <Title text={i18n.preferences.advanced} headingLevel={3} svgICO={<IconChip />} />
        </Card.Title>
        <Card.Body className="pb-0">
          <Row>
            <Col xs={6}>
              <Form.Group controlId="DevTools" className="switchHolder">
                <Form.Label>{i18n.preferences.devtools}</Form.Label>
                {devToolsSwitch}
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="Verbose" className="switchHolder">
                <Form.Label>{i18n.preferences.verboseFocus}</Form.Label>
                {verboseSwitch}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mt-4">
              <Title headingLevel={6} text={i18n.keyboardSettings.resetEEPROM.title} />
            </Col>
            <Col xs={12}>{this.props.connected && <AdvancedKeyboardSettings />}</Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

class AdvancedKeyboardSettings extends React.Component {
  state = {
    EEPROMClearConfirmationOpen: false
  };

  clearEEPROM = async () => {
    const focus = new Focus();

    await this.setState({ working: true });
    this.closeEEPROMClearConfirmation();

    let eeprom = await focus.command("eeprom.contents");
    eeprom = eeprom
      .split(" ")
      .filter(v => v.length > 0)
      .map(() => 255)
      .join(" ");
    await focus.command("eeprom.contents", eeprom);
    this.setState({ working: false });
  };
  openEEPROMClearConfirmation = () => {
    this.setState({ EEPROMClearConfirmationOpen: true });
  };
  closeEEPROMClearConfirmation = () => {
    this.setState({ EEPROMClearConfirmationOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <RegularButton
          buttonText={i18n.keyboardSettings.resetEEPROM.button}
          style="short danger"
          onClick={this.openEEPROMClearConfirmation}
          disabled={this.state.working}
        />
        <ConfirmationDialog
          title={i18n.keyboardSettings.resetEEPROM.dialogTitle}
          open={this.state.EEPROMClearConfirmationOpen}
          onConfirm={this.clearEEPROM}
          onCancel={this.closeEEPROMClearConfirmation}
        >
          {i18n.keyboardSettings.resetEEPROM.dialogContents}
        </ConfirmationDialog>
      </React.Fragment>
    );
  }
}

AdvancedSettings.propTypes = {
  devToolsSwitch: PropTypes.object.isRequired,
  verboseSwitch: PropTypes.object.isRequired,
  connected: PropTypes.bool.isRequired
};
