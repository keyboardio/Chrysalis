import React from "react";
import Styled from "styled-components";

import Modal from "react-bootstrap/Modal";
import i18n from "../../i18n";

import { RegularButton } from "../Button";
import { IconRecord } from "../Icon";

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
      showModal: false
    };
  }

  toggleShow = () => {
    this.setState({
      showModal: !this.state.showModal
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
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Record macro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Compontent switch Add delay</p>
            <div className="timelineRecordTracking">
              <div className="timelineRecordSequence">Lotem ipsum dolor aemet sit</div>
            </div>
            <div className="recordMacrosButton">
              <RegularButton buttonText="Undo" style="outline gradient" size="sm" onClick={this.toggleShow} />
              <RegularButton buttonText="Start record" style="outline gradient" size="sm" onClick={this.toggleShow} />
            </div>
            <RegularButton
              buttonText={i18n.components.save.button}
              style="outline gradient"
              size="sm"
              onClick={this.toggleShow}
            />
            <p className="text-center">
              Did you make a mistake? Dont worry, you can edit the created sequence after adding the recording to the timeline.
            </p>
          </Modal.Body>
        </Modal>
      </Styles>
    );
  }
}
