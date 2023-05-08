import PropTypes from "prop-types";
import React, { Component } from "react";
import i18n from "../../i18n";
import Focus from "../../../api/focus";
import Keymap from "../../../api/keymap";

// React Bootstrap Components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Own Components
import Title from "../../component/Title";
import { Select } from "../../component/Select";
import { ToggleButtons } from "../../component/ToggleButtons";

// Icons Imports
import { IconWrench, IconSun, IconMoon, IconScreen } from "../../component/Icon";

// Flags imports
import frenchF from "../../../../static/flags/france.png";
import germanF from "../../../../static/flags/germany.png";
import japaneseF from "../../../../static/flags/japan.png";
import spanishF from "../../../../static/flags/spain.png";
import englishUSUKF from "../../../../static/flags/english.png";
import danishF from "../../../../static/flags/denmark.png";
import swedishF from "../../../../static/flags/sweden.png";
import icelandicF from "../../../../static/flags/iceland.png";
import norwegianF from "../../../../static/flags/norway.png";

const Store = require("electron-store");
const store = new Store();

export default class GeneralSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: ""
    };
  }

  async componentDidMount() {
    this.setState({
      selectedLanguage: store.get("settings.language")
    });
  }

  changeLanguage = language => {
    this.setState({ selectedLanguage: language });
    store.set("settings.language", `${language}`);

    let focus = new Focus();
    if (!focus.closed) {
      let deviceLang = { ...focus.device, language: true };
      focus.commands.keymap = new Keymap(deviceLang);
    }
  };

  render() {
    const { selectDarkMode, darkMode, neurons, selectedNeuron, connected, defaultLayer, selectDefaultLayer } = this.props;
    const { selectedLanguage } = this.state;
    let layersNames = neurons[selectedNeuron].layers;
    let flags = [englishUSUKF, spanishF, germanF, frenchF, swedishF, danishF, norwegianF, icelandicF, japaneseF];
    let language = ["english", "spanish", "german", "french", "swedish", "danish", "norwegian", "icelandic", "japanese"];
    language = language.map((item, index) => {
      return { text: item, value: item, icon: flags[index], index };
    });

    layersNames = layersNames.map((item, index) => {
      return { text: item.name != "" ? item.name : `Layer ${index + 1}`, value: index, index };
    });
    layersNames.push({ text: i18n.keyboardSettings.keymap.noDefault, value: 126, index: 126 });

    let layoutsModes = [
      {
        name: "System",
        value: "system",
        icon: <IconScreen />,
        index: 0
      },
      {
        name: "Dark",
        value: "dark",
        icon: <IconMoon />,
        index: 1
      },
      {
        name: "Light",
        value: "light",
        icon: <IconSun />,
        index: 2
      }
    ];

    return (
      <Card className="overflowFix card-preferences mt-4">
        <Card.Title>
          <Title text={i18n.keyboardSettings.keymap.title} headingLevel={3} svgICO={<IconWrench />} />
        </Card.Title>
        <Card.Body>
          <Form>
            <Row>
              <Col lg={6} md={12}>
                <Form.Group controlId="selectLanguage" className="mb-3">
                  <Form.Label>{i18n.preferences.language}</Form.Label>
                  <Select onSelect={this.changeLanguage} value={selectedLanguage} listElements={language} />
                </Form.Group>
              </Col>
              <Col lg={6} md={12}>
                <Form.Group controlId="defaultLayer" className="mb-3">
                  <Form.Label>{i18n.keyboardSettings.keymap.defaultLayer}</Form.Label>
                  <Select onSelect={selectDefaultLayer} value={defaultLayer} listElements={layersNames} disabled={!connected} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group controlId="DarkMode" className="m-0">
                  <Form.Label>{i18n.preferences.darkMode.label}</Form.Label>
                  <ToggleButtons
                    selectDarkMode={selectDarkMode}
                    value={darkMode}
                    listElements={layoutsModes}
                    style={"flex"}
                    size={"sm"}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

GeneralSettings.propTypes = {
  selectDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.string.isRequired,
  neurons: PropTypes.array.isRequired,
  selectedNeuron: PropTypes.number.isRequired,
  connected: PropTypes.bool.isRequired
};
