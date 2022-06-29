import React from "react";
import Styled from "styled-components";

import Modal from "react-bootstrap/Modal";
import i18n from "../../i18n";

import { RegularButton, ButtonConfig } from "../../component/Button";
import Title from "../../component/Title";
import {
  IconRecord,
  IconArrowInBoxDown,
  IconPauseXl,
  IconUndoRestart,
  IconStopWatch,
  IconStopWatchCrossed
} from "../../component/Icon";
import AnimatedTimelineRecording from "./AnimatedTimelineRecording";
const { ipcRenderer } = require("electron");

const Styles = Styled.div`

.tabButton {
  border-radius: 6px;
	font-size: 14px;
	font-weight: 600;
	padding: 16px 14px;
  color: ${({ theme }) => theme.styles.tabButton.color};
  background-color: ${({ theme }) => theme.styles.tabButton.background};
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  white-space: nowrap;
  svg {
    color: ${({ theme }) => theme.styles.tabButton.svgColor};
  }
  &:hover {
    color: ${({ theme }) => theme.styles.tabButton.colorHover};
    background-color: ${({ theme }) => theme.styles.tabButton.backgroundHover};
    svg {
      color: ${({ theme }) => theme.styles.tabButton.svgHover};
    }
  }
}

`;

export default class RecordMacroModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isRecording: false,
      isDelayActive: true,
      recorded: []
    };
    this.translator = {
      0x000e: 42,
      0x000f: 43,
      0x001c: 40,
      0x003a: 57,
      0x0e37: 70,
      0x0046: 71,
      0x0e45: 72,
      0x0001: 41,
      0x0039: 44,
      0x0e49: 75,
      0x0e51: 78,
      0x0e4f: 77,
      0x0e47: 74,
      0xe04b: 80,
      0xe048: 82,
      0xe04d: 79,
      0xe050: 81,
      0x0e52: 73,
      0x0e53: 76,
      0x0e5d: 101, // Menu key
      0x000b: 39,
      0x0002: 30,
      0x0003: 31,
      0x0004: 32,
      0x0005: 33,
      0x0006: 34,
      0x0007: 35,
      0x0008: 36,
      0x0009: 37,
      0x000a: 38,
      0x001e: 4,
      0x0030: 5,
      0x002e: 6,
      0x0020: 7,
      0x0012: 8,
      0x0021: 9,
      0x0022: 10,
      0x0023: 11,
      0x0017: 12,
      0x0024: 13,
      0x0025: 14,
      0x0026: 15,
      0x0032: 16,
      0x0031: 17,
      0x0018: 18,
      0x0019: 19,
      0x0010: 20,
      0x0013: 21,
      0x001f: 22,
      0x0014: 23,
      0x0016: 24,
      0x002f: 25,
      0x0011: 26,
      0x002d: 27,
      0x0015: 28,
      0x002c: 29,
      0x0052: 98,
      0x004f: 89,
      0x0050: 90,
      0x0051: 91,
      0x004b: 92,
      0x004c: 93,
      0x004d: 94,
      0x0047: 95,
      0x0048: 96,
      0x0049: 97,
      0x0037: 85,
      0x004e: 87,
      0x004a: 86,
      0x0053: 99,
      0x0e35: 84,
      0x0045: 83,
      0x003b: 58,
      0x003c: 59,
      0x003d: 60,
      0x003e: 61,
      0x003f: 62,
      0x0040: 63,
      0x0041: 64,
      0x0042: 65,
      0x0043: 66,
      0x0044: 67,
      0x0057: 68,
      0x0058: 69,
      0x005b: 104,
      0x005c: 105,
      0x005d: 106,
      0x0063: 107,
      0x0064: 108,
      0x0065: 109,
      0x0066: 110,
      0x0067: 111,
      0x0068: 112,
      0x0069: 113,
      0x006a: 114,
      0x006b: 115,
      0x0027: 51,
      0x000d: 46,
      0x0033: 54,
      0x000c: 45,
      0x0034: 55,
      0x0035: 56,
      0x0029: 53,
      0x001a: 47,
      0x002b: 49,
      0x001b: 48,
      0x0028: 52,
      0x001d: 224, // Left
      0x0e1d: 228,
      0x0038: 226, // Left
      0x0e38: 230,
      0x002a: 225, // Left
      0x0036: 229,
      0x0e5b: 227,
      0x0e5c: 231
    };
  }

  componentDidMount() {
    ipcRenderer.on("recorded-key-down", (event, response) => {
      console.log("Check key-down", response);
      let newRecorded = this.state.recorded;
      newRecorded.push({
        char: response.name,
        keycode: this.translator[response.event.keycode],
        action: 6,
        time: response.time,
        isMod: this.translator[response.event.keycode] >= 224 && this.translator[response.event.keycode] <= 231
      });
      this.setState({
        recorded: newRecorded
      });
    });
    ipcRenderer.on("recorded-key-up", (event, response) => {
      console.log("Check key-up", response);
      if (response.event.keycode === 29 && !response.event.ctrlKey) {
        return;
      }
      let newRecorded = this.state.recorded;
      newRecorded.push({
        char: response.name,
        keycode: this.translator[response.event.keycode],
        action: 7,
        time: response.time,
        isMod: this.translator[response.event.keycode] >= 224 && this.translator[response.event.keycode] <= 231
      });
      this.setState({
        recorded: newRecorded
      });
    });
    // ipcRenderer.on("recorded-mouse-move", (event, response) => {
    //   console.log(response);
    // });
    ipcRenderer.on("recorded-mouse-click", (event, response) => {
      console.log(response);
    });
    ipcRenderer.on("recorded-mouse-wheel", (event, response) => {
      console.log(response);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners("recorded-key-down");
    ipcRenderer.removeAllListeners("recorded-key-up");
    // ipcRenderer.removeAllListeners("recorded-mouse-move");
    ipcRenderer.removeAllListeners("recorded-mouse-click");
    ipcRenderer.removeAllListeners("recorded-mouse-wheel");
  }

  toggleShow = () => {
    this.setState({
      showModal: !this.state.showModal,
      recorded: []
    });
  };

  toggleIsRecording = () => {
    if (!this.state.isRecording) {
      ipcRenderer.send("start-recording", "");
    } else {
      ipcRenderer.send("stop-recording", "");
    }
    this.setState({
      isRecording: !this.state.isRecording
    });
  };

  undoRecording = () => {
    this.setState({
      recorded: []
    });
  };

  setDelayOn = () => {
    this.setState({
      isDelayActive: true
    });
  };
  setDelayOff = () => {
    this.setState({
      isDelayActive: false
    });
  };

  cleanRecorded = recorded => {
    console.log("Clean recorded", recorded);
    let newRecorded = [];
    let previous = 0;
    for (let i = 1; i < recorded.length; i++) {
      let p = i - 1;
      console.log(`pressed key: ${recorded[i].char}`, recorded[p], recorded[i]);
      if (recorded[p].isMod) {
        console.log(`Modifier detected: ${recorded[p].char}`);
        newRecorded.push(recorded[p]);
        continue;
      }
      if (recorded[p].keycode === recorded[i].keycode && recorded[p].action === 6 && recorded[i].action === 7) {
        console.log(
          `pressRelease joining ${recorded[i].char} as 1 with ${recorded[p].action} as p action and ${recorded[i].action} as i action`
        );
        recorded[p].action = 8;
        newRecorded.push(recorded[p]);
        i++;
        console.log("state of i", i);
        if (i >= recorded.length - 1) {
          newRecorded.push(recorded[recorded.length - 1]);
        }
        continue;
      }
      if (recorded[p].action === 7 && recorded[i].action === 6 && this.state.isDelayActive) {
        console.log(`Inserted Delay with ${recorded[i].time - recorded[p].time} ms`);
        newRecorded.push(JSON.parse(JSON.stringify(recorded[p])));
        recorded[p].action = 2;
        recorded[p].keycode = recorded[i].time - recorded[p].time;
        newRecorded.push(recorded[p]);
        continue;
      }
      console.log(`Added as end of interaction ${recorded[p].char} to the rest of the elems`);
      newRecorded.push(recorded[p]);
      if (i === recorded.length - 1) {
        newRecorded.push(recorded[i]);
      }
    }
    console.log("Checking cleaned", newRecorded);
    return newRecorded;
  };

  sendMacro = () => {
    const { recorded, isRecording } = this.state;
    if (isRecording) {
      ipcRenderer.send("stop-recording", "");
    }
    this.props.onAddRecorded(this.cleanRecorded(recorded));
    this.toggleShow();
  };

  render() {
    const { showModal, isRecording, isDelayActive, recorded } = this.state;
    console.log("rendering");
    return (
      <Styles>
        <RegularButton
          buttonText={i18n.editor.macros.recordMacro}
          style="tabButton mb-3"
          icoSVG={<IconRecord />}
          icoPosition="left"
          onClick={this.toggleShow}
        />
        <Modal
          size="lg"
          show={showModal}
          onHide={this.toggleShow}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal-recordMacro"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              {isRecording ? i18n.editor.macros.recordingMacro : i18n.editor.macros.recordMacro}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="recordMacroOptions">
              <Title text={i18n.editor.macros.delays} headingLevel={5} />
              <div className="recordMacroButtons">
                <ButtonConfig
                  icoSVG={<IconStopWatch />}
                  icoPosition="left"
                  buttonText={i18n.editor.macros.recordDelays}
                  style={`buttonConfigMinimal ${isDelayActive ? "config-active" : ""}`}
                  onClick={this.setDelayOn}
                  disabled={isRecording}
                />
                <ButtonConfig
                  icoSVG={<IconStopWatchCrossed />}
                  icoPosition="left"
                  buttonText={i18n.editor.macros.ignoreDelays}
                  style={`buttonConfigMinimal ${!isDelayActive ? "config-active" : ""}`}
                  onClick={this.setDelayOff}
                  disabled={isRecording}
                />
              </div>
            </div>
            <div className="timelineRecordTracking">
              {recorded.length === 0 ? (
                <div className="timelineRecordSequence">...</div>
              ) : (
                <div className={`timelineRecordSequence ${isRecording ? "isRecording" : "isPaused"}`}>
                  <div className="timelineRecordSequenceInner">
                    {recorded.map((item, index) => {
                      return item.char;
                    })}
                    {/* Lotem ipsum dolor aemet sit <div className="keySpecial">500 ms</div> waiting */}
                  </div>
                  <div className="timelinePointeText"></div>
                </div>
              )}

              <AnimatedTimelineRecording isRecording={isRecording} />
            </div>
            <div className="recordMacrosButton">
              {recorded.length > 0 ? (
                <ButtonConfig
                  tooltip={i18n.editor.macros.recordingDiscard}
                  icoSVG={<IconUndoRestart />}
                  style={`undoRecording`}
                  onClick={this.undoRecording}
                />
              ) : (
                ""
              )}
              <RegularButton
                buttonText={recorded.length === 0 ? i18n.editor.macros.startRecord : isRecording ? "Pause icon" : "Resume"}
                icoSVG={<IconPauseXl />}
                style={`recordButton ${isRecording ? "isRecording" : ""} ${
                  recorded.length > 0 && !isRecording ? "isResume" : ""
                }`}
                onClick={this.toggleIsRecording}
              />
            </div>
            <div className="tabSaveButton">
              <RegularButton
                buttonText={i18n.editor.macros.textTabs.buttonText}
                style="outline gradient"
                icoSVG={<IconArrowInBoxDown />}
                icoPosition="right"
                disabled={recorded.length === 0 || isRecording ? true : false}
                onClick={this.sendMacro}
              />
            </div>
            <p className="recordingMessage">{i18n.editor.macros.recordingMessage}</p>
          </Modal.Body>
        </Modal>
      </Styles>
    );
  }
}
