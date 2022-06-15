// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2020  DygmaLab SE.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import Styled from "styled-components";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Spinner from "react-bootstrap/Spinner";

import Slider from "react-rangeslider";

import Focus from "../../../api/focus";
import Backup from "../../../api/backup";

import i18n from "../../i18n";

import Title from "../../component/Title";
import { Select } from "../../component/Select";
import { RegularButton } from "../../component/Button";
import ToggleButtons from "../../component/ToggleButtons";

import { IconFlashlight, IconTypo, IconChip, IconMouse } from "../../component/Icon";

import { MdDeleteForever, MdSave } from "react-icons/md";
import { BsType, BsBrightnessHigh } from "react-icons/bs";
import { BiMouse, BiCodeAlt, BiWrench, BiChip } from "react-icons/bi";
import { isArray } from "lodash";
import BackupFolderConfigurator from "../BackupFolderConfigurator";

const Store = require("electron-store");
const store = new Store();

const Styles = Styled.div`
  
  .slider{
    width: 100%;
  }
  .greytext{
    color: ${({ theme }) => theme.colors.button.background};
  }
  .dropdownMenu{
    position: absolute;
  }
  .overflowFix{
    overflow: inherit;
  }
  .overflowFix::-webkit-scrollbar {
    display: none;
  }
  .dygmaLogo {
    height: 26px;
    width: 26px;
    margin-right 0.5em;
  }
  .fullWidth {
    button {
      width: -webkit-fill-available;
    }
  }
  .va3fix {
    vertical-align: -3px;
  }
  .va2fix {
    vertical-align: -2px;
  }
  .va1fix {
    vertical-align: -1px;
  }
  .backupbuttons {
    margin: 0;
    padding: 0.44em;
    width: -webkit-fill-available;
  }
  .devfix {
    display: flex;
    justify-content: space-evenly;
  }
  .modinfo {
    font-size: 1rem;
    margin-left: 0.3em;
    color: ${({ theme }) => theme.colors.tipIcon};
  }
  .save-holder {
    position: fixed;
    height: 40px;
    bottom: 40px;
    right: 40px;
  }
  .select-icon {
    position: absolute;
    left: 8px;
    top: 13px;
    background-color: ${({ theme }) => theme.colors.button.deselected};
    border: 2px solid ${({ theme }) => theme.colors.button.deselected};
    color: ${({ theme }) => theme.colors.button.text};
    font-size: 1.3em;
    border-radius: 4px;
  }
  .delete-icon {
    font-size: 1.5rem;
    vertical-align: text-top;
  }
  .align-left {
    float: right;
    margin-top: 6px;
  }
  .neuronToggler{
    text-align: left;
    line-height: 1.8em;
    letter-spacing: 0.02em;
    button.btn.btn-error {
      line-height: 1.8em;
      float: right;
      :hover {
        background-color: #c75454;
      }
    }
  }
  .neuronName{
    .nTitle span{
      line-height: 2.8rem;
      white-space: nowrap;
    }
    .nControl input{
      margin-top: 5px;
      line-height: 2.3rem;
    }
    .nButton button{
    line-height: 1.7rem;
    }
  }
  .neuron-lh{
    line-height: 2.4rem;
  }
  .deleteButton {
    min-width: 100%;
    :hover {
      color: inherit;
    }
  }
  .successButton {
    min-width: 100%;
  }
  .accSpan {
    cursor: pointer;
  }
`;

const TooltipStyle = Styled.div`
text-align: left;
.ttip-p {
  margin: 0;
}
.ttip-h {
  margin: 0;
  font-size: 1.3em;
}
`;

class KeyboardSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.kbData;
  }
  delay = ms => new Promise(res => setTimeout(res, ms));

  componentDidUpdate = previousProps => {
    if (this.props.kbData != previousProps.kbData) {
      this.setState({ ...this.props.kbData });
    }
  };

  setOnlyCustom = event => {
    const checked = event.target.checked;
    this.setState(
      state => ({
        modified: true,
        keymap: {
          custom: state.keymap.custom,
          default: state.keymap.default,
          onlyCustom: checked
        }
      }),
      this.props.setKbData(this.state)
    );
  };

  selectIdleLEDTime = value => {
    this.setState(
      state => ({
        ledIdleTimeLimit: value * 60,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  setShowDefaults = event => {
    this.setState(
      state => ({
        showDefaults: event.target.checked,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  setBrightness = value => {
    this.setState(
      state => ({
        ledBrightness: (value * 255) / 100,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };
  setHoldTimeout = value => {
    this.setState(
      state => ({
        qukeysHoldTimeout: value,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  setOverlapThreshold = value => {
    this.setState(
      state => ({
        qukeysOverlapThreshold: value,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  setSuperTimeout = value => {
    this.setState(
      state => ({
        SuperTimeout: value,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  // setSuperRepeat = event => {
  //   const value = event.target.value;
  //   this.setState(state => ({
  //     SuperRepeat: value,
  //     modified: true
  //   }),
  // this.props.setKbData(this.state));
  // };

  // setSuperWaitfor = event => {
  //   const value = event.target.value;
  //   this.setState(event => ({
  //     SuperWaitfor: value,
  //     modified: true
  //   }),
  // this.props.setKbData(this.state));
  // };

  setSuperHoldstart = value => {
    this.setState(
      event => ({
        SuperHoldstart: value,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  // setTyping = event => {
  //   const value = (100 - event.target.value) * 10;
  //   this.setState(event=>({
  //     SuperTimeout: value,
  //     SuperHoldstart: value - 20,
  //     qukeysHoldTimeout: value - 20,
  //     modified: true
  //   }),
  // this.props.setKbData(this.state));
  // };

  setTyping = value => {
    const valueTyping = (100 - value) * 10;
    this.setState(
      state => ({
        SuperTimeout: valueTyping,
        SuperHoldstart: valueTyping - 20,
        qukeysHoldTimeout: valueTyping - 20,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  setChording = value => {
    this.setState(
      state => ({
        qukeysOverlapThreshold: value,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  // setSuperOverlapThreshold = event => {
  //   const value = event.target.value;

  //   this.setState(state=>({
  //     SuperOverlapThreshold: value,
  //     modified: true
  //   }),
  // this.props.setKbData(this.state));
  // };

  setSpeed = value => {
    this.setState(
      state => ({
        mouseSpeed: parseInt(value),
        mouseSpeedDelay: 10,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  // setSpeedDelay = event => {
  //   const value = event.target.value;

  //   this.setState(state=>({
  //     mouseSpeedDelay: value,
  //     modified: true
  //   }),
  // this.props.setKbData(this.state));
  // };

  setAccelSpeed = value => {
    this.setState(
      state => ({
        mouseAccelSpeed: parseInt(value),
        mouseAccelDelay: 600,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  // setAccelDelay = event => {
  //   const value =  ;

  //   this.setState(state =>{
  //     mouseAccelDelay: val(ue,
  //     modified: true
  //   }),
  // this.props.setKbData(this.state));
  // };

  // setWheelSpeed = event => {
  //   const value = event.target.value;

  //   this.setState(state=>({
  //     mouseWheelSpeed: value,
  //     mouseWheelDelay: 100,
  //     modified: true
  //   }),
  // this.props.setKbData(this.state));
  // };
  setWheelSpeed = value => {
    this.setState(
      state => ({
        mouseWheelSpeed: value,
        mouseWheelDelay: 100,
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  // setWheelDelay = event => {
  //   const value = event.target.value;

  //   this.setState(state=>({
  //     mouseWheelDelay: value,
  //     modified: true
  //   }),
  // this.props.setKbData(this.state));
  // };

  setSpeedLimit = value => {
    this.setState(
      state => ({
        mouseSpeedLimit: parseInt(value),
        modified: true
      }),
      this.props.setKbData(this.state)
    );
  };

  renderTooltip(tooltips) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <TooltipStyle>
          {tooltips.map((tip, i) => {
            return (
              <React.Fragment key={`Tip-${i}`}>
                {i % 2 == 1 || !isNaN(tip[0]) || tip[0] == "-" ? (
                  <p className="ttip-p">{tip}</p>
                ) : (
                  <React.Fragment>
                    {i == 0 ? "" : <br></br>}
                    <h5 className="ttip-h">{tip}</h5>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </TooltipStyle>
      </Tooltip>
    );
  }

  render() {
    const {
      keymap,
      modified,
      showDefaults,
      ledBrightness,
      ledIdleTimeLimit,
      qukeysHoldTimeout,
      qukeysOverlapThreshold,
      SuperTimeout,
      // SuperRepeat,
      // SuperWaitfor,
      SuperHoldstart,
      SuperOverlapThreshold,
      mouseSpeed,
      // mouseSpeedDelay,
      mouseAccelSpeed,
      // mouseAccelDelay,
      mouseWheelSpeed,
      // mouseWheelDelay,
      mouseSpeedLimit
    } = this.state;

    const mSpeed = (
      <Row>
        <Col xs={2} md={1} className="p-0 text-center align-self-center">
          <span className="tagsfix">Slow</span>
        </Col>
        <Col xs={8} md={10} className="px-2">
          <Slider min={0} max={127} value={mouseSpeed} onChange={this.setSpeed} />
        </Col>
        <Col xs={2} md={1} className="p-0 text-center align-self-center">
          <span className="tagsfix">Fast</span>
        </Col>
      </Row>
    );

    const mAccelS = (
      <Row>
        <Col xs={2} md={1} className="p-0 text-center align-self-center">
          <span className="tagsfix">Slow</span>
        </Col>
        <Col xs={8} md={10} className="px-2">
          <Slider min={0} max={254} value={mouseAccelSpeed} onChange={this.setAccelSpeed} />
        </Col>
        <Col xs={2} md={1} className="p-0 text-center align-self-center">
          <span className="tagsfix">Fast</span>
        </Col>
      </Row>
    );
    // const maccelD = (
    //   <RangeSlider
    //     min={0}
    //     max={1000}
    //     value={mouseAccelDelay}
    //     className="slider"
    //     onChange={this.setAccelDelay}
    //     marks={[{ value: 64, label: i18n.keyboardSettings.defaultLabel }]}
    //   />
    // );
    const mWheelS = (
      <Row>
        <Col xs={2} md={1} className="p-0 text-center align-self-center">
          <span className="tagsfix">Slow</span>
        </Col>
        <Col xs={8} md={10} className="px-2">
          <Slider min={1} max={15} value={mouseWheelSpeed} onChange={this.setWheelSpeed} />
        </Col>
        <Col xs={2} md={1} className="p-0 text-center align-self-center">
          <span className="tagsfix">Fast</span>
        </Col>
      </Row>
    );
    // const mWheelD = (
    //   <RangeSlider
    //     min={0}
    //     max={1000}
    //     value={mouseWheelDelay}
    //     className="slider"
    //     onChange={this.setWheelDelay}
    //     marks={[{ value: 200, label: i18n.keyboardSettings.defaultLabel }]}
    //   />
    // );
    const mSpeedL = (
      <Row>
        <Col xs={2} md={1} className="p-0 text-center align-self-center">
          <span className="tagsfix">Slow</span>
        </Col>
        <Col xs={8} md={10} className="px-2">
          <Slider min={0} max={255} value={mouseSpeedLimit} onChange={this.setSpeedLimit} />
        </Col>
        <Col xs={2} md={1} className="p-0 text-center align-self-center">
          <span className="tagsfix">Fast</span>
        </Col>
      </Row>
    );

    return (
      <Styles>
        {this.props.connected && (
          <React.Fragment>
            <Card className="overflowFix card-preferences mt-4">
              <Card.Title>
                <Title text={i18n.keyboardSettings.led.title} headingLevel={3} svgICO={<IconFlashlight />} />
              </Card.Title>
              <Card.Body>
                {ledIdleTimeLimit >= 0 && (
                  <Form.Group controlId="idleTimeLimit" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>{i18n.keyboardSettings.led.idleTimeLimit}</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">Off</span>
                      </Col>
                      <Col xs={8} md={10} className="px-2">
                        <Slider min={0} max={60} step={1} value={ledIdleTimeLimit / 60} onChange={this.selectIdleLEDTime} />
                      </Col>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">60min</span>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {ledBrightness >= 0 && (
                  <Form.Group controlId="brightnessControl" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>{i18n.keyboardSettings.led.brightness}</Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">None</span>
                      </Col>
                      <Col xs={8} md={10} className="px-2">
                        <Slider
                          min={0}
                          max={100}
                          step={5}
                          value={Math.round((ledBrightness * 100) / 255)}
                          onChange={this.setBrightness}
                        />
                      </Col>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">Max</span>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
            <Card className="overflowFix card-preferences mt-4">
              <Card.Title>
                <Title text={i18n.keyboardSettings.superkeys.title} headingLevel={3} svgICO={<IconTypo />} />
              </Card.Title>
              <Card.Body>
                {qukeysOverlapThreshold >= 0 && (
                  <Form.Group controlId="QukeysOverlap" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>
                          <Title
                            text={i18n.keyboardSettings.qukeys.overlapThreshold}
                            headingLevel={6}
                            tooltip={`<h5 class="text-left">${i18n.keyboardSettings.qukeys.overlapThresholdTip1}</h5><ul><li class="text-left">${i18n.keyboardSettings.qukeys.overlapThresholdTip2}</li><li class="text-left">${i18n.keyboardSettings.qukeys.overlapThresholdTip3}</li></ul>`}
                            tooltipPlacement="bottom"
                            tooltipSize="wide"
                          />
                        </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">Less</span>
                      </Col>
                      <Col xs={8} md={10} className="px-2">
                        <Slider min={0} max={100} value={qukeysOverlapThreshold} onChange={this.setOverlapThreshold} />
                      </Col>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">More</span>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {qukeysHoldTimeout >= 0 && (
                  <Form.Group controlId="QukeysOverlap" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>
                          <Title
                            text={i18n.keyboardSettings.qukeys.holdTimeout}
                            headingLevel={6}
                            tooltip={`<h5 class="text-left">${i18n.keyboardSettings.qukeys.holdTimeoutTip1}</h5><ul><li class="text-left">${i18n.keyboardSettings.qukeys.holdTimeoutTip2}</li><li class="text-left">${i18n.keyboardSettings.qukeys.holdTimeoutTip3}</li></ul>`}
                            tooltipPlacement="bottom"
                            tooltipSize="wide"
                          />
                        </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">Less</span>
                      </Col>
                      <Col xs={8} md={10} className="px-2">
                        <Slider min={1} max={255} value={qukeysHoldTimeout} onChange={this.setHoldTimeout} />
                      </Col>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">More</span>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {SuperTimeout >= 0 && (
                  <Form.Group controlId="superTimeout" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>
                          <Title
                            text={i18n.keyboardSettings.superkeys.timeout}
                            headingLevel={6}
                            tooltip={`<h5 class="text-left">${i18n.keyboardSettings.superkeys.timeoutTip1}</h5><ul><li class="text-left">${i18n.keyboardSettings.superkeys.timeoutTip2}</li><li class="text-left">${i18n.keyboardSettings.superkeys.timeoutTip3}</li></ul>`}
                            tooltipPlacement="bottom"
                            tooltipSize="wide"
                          />
                        </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">Less</span>
                      </Col>
                      <Col xs={8} md={10} className="px-2">
                        <Slider min={1} max={500} value={SuperTimeout} onChange={this.setSuperTimeout} />
                      </Col>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">More</span>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {SuperHoldstart >= 0 && (
                  <Form.Group controlId="superHoldstart" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>
                          <Title
                            text={i18n.keyboardSettings.superkeys.holdstart}
                            headingLevel={6}
                            tooltip={`<h5 class="text-left">${i18n.keyboardSettings.superkeys.chordingTip1}</h5><ul><li class="text-left">${i18n.keyboardSettings.superkeys.chordingTip2}</li><li class="text-left">${i18n.keyboardSettings.superkeys.chordingTip3}</li></ul>`}
                            tooltipPlacement="bottom"
                            tooltipSize="wide"
                          />
                        </Form.Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">Less</span>
                      </Col>
                      <Col xs={8} md={10} className="px-2">
                        <Slider min={1} max={500} value={SuperHoldstart} onChange={this.setSuperHoldstart} />
                      </Col>
                      <Col xs={2} md={1} className="p-0 text-center align-self-center">
                        <span className="tagsfix">More</span>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
            <Card className="overflowFix card-preferences mt-4">
              <Card.Title>
                <Title text={i18n.keyboardSettings.mouse.title} headingLevel={3} svgICO={<IconMouse />} />
              </Card.Title>
              <Card.Body className="pb-0">
                {mouseSpeed >= 0 && (
                  <Form.Group controlId="mouseSpeed" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>{i18n.keyboardSettings.mouse.speed}</Form.Label>
                      </Col>
                    </Row>
                    {mSpeed}
                  </Form.Group>
                )}
                {mouseAccelSpeed >= 0 && (
                  <Form.Group controlId="mousemAccelS" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>{i18n.keyboardSettings.mouse.accelSpeed}</Form.Label>
                      </Col>
                    </Row>
                    {mAccelS}
                  </Form.Group>
                )}
                {mouseSpeedLimit >= 0 && (
                  <Form.Group controlId="mouseSpeedL" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>{i18n.keyboardSettings.mouse.speedLimit}</Form.Label>
                      </Col>
                    </Row>
                    {mSpeedL}
                  </Form.Group>
                )}
                {mouseWheelSpeed >= 0 && (
                  <Form.Group controlId="mousemWheelS" className="formGroup">
                    <Row>
                      <Col>
                        <Form.Label>{i18n.keyboardSettings.mouse.wheelSpeed}</Form.Label>
                      </Col>
                    </Row>
                    {mWheelS}
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
          </React.Fragment>
        )}
      </Styles>
    );
  }
}

export { KeyboardSettings };
