import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

import SaveChangesButton from "../../components/SaveChangesButton";

import i18n from "../../i18n";
class ColorSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testMode: false,
      balance: props.balance,
      oldBalance: props.balance,
      RedColorB: 255 - props.balance.r,
      GreenColorB: 255 - props.balance.g,
      BlueColorB: 255 - props.balance.b,
      ledIdleTimeLimit: 0,
      working: false,
      modified: false,
      modifications: false
    };
  }

  componentWillUnmount() {
    if (this.state.testMode === true) {
      this.props.stopTestBalance();
    }
  }
  setBrightness = async () => {
    let newBalance = this.state.balance;
    if (this.state.testMode === true && this.state.modified === true) {
      this.setState({
        working: true
      });
      newBalance = {
        r: 255 - this.state.RedColorB,
        g: 255 - this.state.GreenColorB,
        b: 255 - this.state.BlueColorB
      };
      await this.props.testBalance(newBalance);
      this.setState({
        balance: newBalance,
        working: false,
        modified: false,
        modifications: true
      });
    }
  };
  setTestMode = async e => {
    let check = e.target.checked;
    this.setState({
      working: true
    });
    if (e.target.checked === true) {
      this.setState({ oldBalance: this.state.balance });
      await this.props.startTestBalance();
      let newBalance = {
        r: 255 - this.state.RedColorB,
        g: 255 - this.state.GreenColorB,
        b: 255 - this.state.BlueColorB
      };
      await this.props.testBalance(newBalance);
    } else {
      this.setState({
        balance: this.state.oldBalance,
        RedColorB: 255 - this.state.oldBalance.r,
        GreenColorB: 255 - this.state.oldBalance.g,
        BlueColorB: 255 - this.state.oldBalance.b
      });
      await this.props.stopTestBalance();
    }
    this.setState({
      testMode: check,
      working: false
    });
  };
  render() {
    const redColor = (
      <Form.Control
        type="range"
        max={255}
        min={210}
        disabled={!this.state.testMode}
        value={this.state.RedColorB}
        step={3}
        onChange={(e, v) => {
          this.setState({ RedColorB: v, modified: true });
        }}
      />
    );
    const greenColor = (
      <Form.Control
        type="range"
        max={255}
        min={210}
        disabled={!this.state.testMode}
        value={this.state.GreenColorB}
        step={3}
        onChange={(e, v) => {
          this.setState({ GreenColorB: v, modified: true });
        }}
      />
    );
    const blueColor = (
      <Form.Control
        type="range"
        max={255}
        min={210}
        disabled={!this.state.testMode}
        value={this.state.BlueColorB}
        step={3}
        onChange={(e, v) => {
          this.setState({ BlueColorB: v, modified: true });
        }}
      />
    );
    const testSwitch = (
      <Form.Check
        type="switch"
        checked={this.state.testMode}
        disabled={this.state.working}
        value={false}
        onClick={this.setTestMode}
      />
    );
    const applyButton = (
      <Button
        variant="contained"
        color="primary"
        disabled={
          this.state.working || !this.state.testMode || !this.state.modified
        }
        onClick={this.setBrightness}
      >
        {i18n.keyboardSettings.colorSettings.visualizebutton}
      </Button>
    );
    return (
      <React.Fragment>
        {this.state.working && (
          <Spinner className="spinner-border text-danger" role="status" />
        )}
        <Card>
          <Card.Header className="sectionTitle">
            {i18n.keyboardSettings.colorSettings.title}
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="Test">
                <Form.Label>
                  {this.state.testMode
                    ? i18n.keyboardSettings.colorSettings.test.quit
                    : i18n.keyboardSettings.colorSettings.test.enter}
                </Form.Label>
                {testSwitch}
              </Form.Group>
              <Form.Group controlId="Red">
                <Form.Label>
                  {i18n.keyboardSettings.colorSettings.red +
                    ` - ${((this.state.RedColorB / 255) * 100).toFixed(1)}%`}
                </Form.Label>
                {redColor}
              </Form.Group>
              <Form.Group controlId="Test">
                <Form.Label>
                  {i18n.keyboardSettings.colorSettings.green +
                    ` - ${((this.state.GreenColorB / 255) * 100).toFixed(1)}%`}
                </Form.Label>
                {greenColor}
              </Form.Group>
              <Form.Group controlId="Test">
                <Form.Label>
                  {i18n.keyboardSettings.colorSettings.blue +
                    ` - ${((this.state.BlueColorB / 255) * 100).toFixed(1)}%`}
                </Form.Label>
                {blueColor}
              </Form.Group>
              <Form.Group>{applyButton}</Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <span />
            <SaveChangesButton
              onClick={() => {
                this.setState({ oldBalance: this.state.balance });
                this.props.setBalance(this.state.balance);
              }}
              disabled={
                this.state.working ||
                !this.state.testMode ||
                !this.state.modifications
              }
            >
              {i18n.components.save.saveChanges}
            </SaveChangesButton>
          </Card.Footer>
        </Card>
      </React.Fragment>
    );
  }
}

export default ColorSettings;
