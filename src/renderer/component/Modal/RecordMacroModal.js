import React from "react";
import Styled from "styled-components";

import Modal from "react-bootstrap/Modal";
import i18n from "../../i18n";

import { RegularButton, ButtonConfig } from "../Button";
import Title from "../Title";
import { IconRecord, IconArrowInBoxDown, IconPauseXl, IconUndoRestart, IconStopWatch, IconStopWatchCrossed } from "../Icon";
import AnimatedTimelineRecording from "../../modules/Macros/AnimatedTimelineRecording";

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
    this.inputText = React.createRef();
    this.state = {
      showModal: false,
      cleanRecord: true,
      isRecording: false,
      isDelayActive: true
    };
  }

  toggleShow = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  toggleIsRecording = () => {
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

  // componentDidUpdate(previousProps, previousState) {
  //   if (this.props != previousProps) {
  //     // console.log("PROBLEM", this.props.name, previousProps.name);
  //     this.setState({
  //       name: this.props.name
  //     });
  //   }
  // }

  render() {
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
          show={this.state.showModal}
          onHide={this.toggleShow}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal-recordMacro"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              {this.state.isRecording ? i18n.editor.macros.recordingMacro : i18n.editor.macros.recordMacro}
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
                  style={`buttonConfigMinimal ${this.state.isDelayActive ? "config-active" : ""}`}
                  onClick={this.setDelayOn}
                  disabled={this.state.isRecording}
                />
                <ButtonConfig
                  icoSVG={<IconStopWatchCrossed />}
                  icoPosition="left"
                  buttonText={i18n.editor.macros.ignoreDelays}
                  style={`buttonConfigMinimal ${!this.state.isDelayActive ? "config-active" : ""}`}
                  onClick={this.setDelayOff}
                  disabled={this.state.isRecording}
                />
              </div>
            </div>
            <div className="timelineRecordTracking">
              {this.state.cleanRecord ? (
                <div className="timelineRecordSequence">...</div>
              ) : (
                <div className={`timelineRecordSequence ${this.state.isRecording ? "isRecording" : "isPaused"}`}>
                  <div className="timelineRecordSequenceInner">
                    Lotem ipsum dolor aemet sit <div className="keySpecial">500 ms</div> waiting
                  </div>
                  <div className="timelinePointeText"></div>
                </div>
              )}

              <AnimatedTimelineRecording isRecording={this.state.isRecording} />
            </div>
            <div className="recordMacrosButton">
              {!this.state.cleanRecord ? (
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
                buttonText={
                  this.state.cleanRecord ? i18n.editor.macros.startRecord : this.state.isRecording ? "Pause icon" : "Resume"
                }
                icoSVG={<IconPauseXl />}
                style={`recordButton ${this.state.isRecording ? "isRecording" : ""} ${
                  !this.state.cleanRecord && !this.state.isRecording ? "isResume" : ""
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
                disabled={this.state.cleanRecord || this.state.isRecording ? true : false}
              />
            </div>
            <p className="recordingMessage">{i18n.editor.macros.recordingMessage}</p>
          </Modal.Body>
        </Modal>
      </Styles>
    );
  }
}
