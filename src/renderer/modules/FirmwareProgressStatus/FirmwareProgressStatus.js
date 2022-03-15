// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
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
import ReactDOM from "react-dom";
import Styled from "styled-components";
import i18n from "../../i18n";
import ProgressBar from "react-bootstrap/ProgressBar";

import Title from "../../component/Title";

import videoFirmwareUpdate from "../../../../static/base/update-firmware.mp4";

const Style = Styled.div`     
width: 100%;
.process-header {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  height: 260px;
  .img-center {
    margin: auto;
    max-width: 162px;
    border-radius:16px;
    display: block;
    align-self: center;
  } 
  .process-image {
    display: flex;
    flex: 0 0 50%;
    height: inherit;
    background-color: rgba(196, 201, 213, 0.05);
    border-top-left-radius: 16px;
  }
  .process-neuron {
    display: flex;
    flex: 0 0 50%;
    height: inherit;
    background-color: ${({ theme }) => theme.colors.gray800};
    border-top-right-radius: 16px;
  }
}
.processRaise {
  position: relative;
  canvas {
    max-width: 100%;
    background-position: right bottom;
    background-repeat: no-repeat;
    background-image: url(${({ theme }) => theme.styles.firmwareUpdateProcess.raiseSVG});
  }
  .status-icon {
    position: absolute;
    top: 61px;
    left: 85px;
  }
}
.process-footer {
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray800}; 
  border-radius: 0px 0px 16px 16px;
  text-align: center;
}
.blob {
  background: #33d9b2;
  box-shadow: 0 0 0 0 #33d9b2;
  animation: pulse-green 2s infinite;
  border-radius: 50%;
  margin: 10px;
  height: 8px;
  width: 8px;
  transform: scale(1);
}

@keyframes pulse-green {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 42px rgba(51, 217, 178, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
  }
}
`;

const FirmwareProgressStatus = ({ fakeCountdown, flashProgress }) => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    videoRef.current.addEventListener(
      "ended",
      function () {
        videoRef.current.currentTime = 3;
        videoRef.current.play();
      },
      false
    );
  }, []);

  return (
    <Style>
      <div className="mainProcessWrapper">
        <div className="process-row process-header">
          <div className="process-col process-image">
            <video ref={videoRef} width={520} height={520} autoPlay={`true`} className="img-center img-fluid">
              <source src={videoFirmwareUpdate} type="video/mp4" />
            </video>
          </div>
          <div className="process-col process-neuron">
            {fakeCountdown === 1 ? (
              <div className="processRaise">
                <div className="status-icon">
                  <div className="blob green"></div>
                </div>
                <canvas className="" width={340} height={259}></canvas>
              </div>
            ) : (
              <div className="updatingRaise">{fakeCountdown}</div>
            )}
          </div>
        </div>
        <div className="process-row">
          <ProgressBar>
            <ProgressBar now={flashProgress} />
          </ProgressBar>
        </div>
        <div className="process-row process-footer">
          {fakeCountdown === 1 ? <Title text={i18n.firmwareUpdate.texts.progressCardStatus1} headingLevel={3} /> : ""}
          {fakeCountdown === 2 ? <Title text={i18n.firmwareUpdate.texts.progressCardStatus2} headingLevel={3} /> : ""}
          {fakeCountdown > 2 ? <Title text={i18n.firmwareUpdate.texts.progressCardStatus3} headingLevel={3} /> : ""}

          {fakeCountdown === 1 ? (
            <Title text={i18n.firmwareUpdate.texts.flashCardTitle2} headingLevel={6} />
          ) : (
            <Title
              text={
                flashProgress <= 15
                  ? i18n.firmwareUpdate.texts.progressCardBar1
                  : flashProgress <= 29
                  ? i18n.firmwareUpdate.texts.progressCardBar2
                  : flashProgress <= 69
                  ? i18n.firmwareUpdate.texts.progressCardBar3
                  : i18n.firmwareUpdate.texts.progressCardBar4
              }
              headingLevel={6}
            />
          )}
        </div>
      </div>
    </Style>
  );
};

export default FirmwareProgressStatus;
