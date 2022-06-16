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
      cleanRecord: true,
      isRecording: false,
      isDelayActive: true,
      recorded: []
    };
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT!!!!!");
    ipcRenderer.on("recorded-key-down", (event, response) => {
      console.log("Check key-down", response);
      let newRecorded = this.state.recorded;
      newRecorded.push({ char: response.name, action: 6, time: response.time });
      this.setState({
        recorded: newRecorded
      });
    });
    ipcRenderer.on("recorded-key-up", (event, response) => {
      console.log("Check key-up", response);
      let newRecorded = this.state.recorded;
      newRecorded.push({ char: response.name, action: 7, time: response.time });
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
    console.log("COMPONENT WILL UNMOUNT!!!!!");
    ipcRenderer.removeAllListeners("recorded-key-down");
    ipcRenderer.removeAllListeners("recorded-key-up");
    // ipcRenderer.removeAllListeners("recorded-mouse-move");
    ipcRenderer.removeAllListeners("recorded-mouse-click");
    ipcRenderer.removeAllListeners("recorded-mouse-wheel");
  }

  toggleShow = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  toggleIsRecording = () => {
    if (!this.state.isRecording) {
      ipcRenderer.send("start-recording", "");
    } else {
      ipcRenderer.send("stop-recording", "");
    }
    this.setState({
      isRecording: !this.state.isRecording,
      cleanRecord: false
    });
  };

  undoRecording = () => {
    this.setState({
      isRecording: false,
      cleanRecord: true
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

  render() {
    const { showModal, isRecording, cleanRecord, isDelayActive, recorded } = this.state;
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
              {cleanRecord ? (
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
              {!cleanRecord ? (
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
                buttonText={cleanRecord ? i18n.editor.macros.startRecord : isRecording ? "Pause icon" : "Resume"}
                icoSVG={<IconPauseXl />}
                style={`recordButton ${isRecording ? "isRecording" : ""} ${!cleanRecord && !isRecording ? "isResume" : ""}`}
                onClick={this.toggleIsRecording}
              />
            </div>
            <div className="tabSaveButton">
              <RegularButton
                buttonText={i18n.editor.macros.textTabs.buttonText}
                style="outline gradient"
                icoSVG={<IconArrowInBoxDown />}
                icoPosition="right"
                disabled={cleanRecord || isRecording ? true : false}
              />
            </div>
            <p className="recordingMessage">{i18n.editor.macros.recordingMessage}</p>
          </Modal.Body>
        </Modal>
      </Styles>
    );
  }
}
