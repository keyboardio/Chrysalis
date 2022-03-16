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
import videoFirmwareUpdateReleaseKey from "../../../../static/base/release-key.mp4";
import { IconCheckmarkSm } from "../../component/Icon";

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
    position: relative; 
    .img-center {
      width: 162px;     
      position: absolute;
    }
  }
  .process-neuron {
    display: flex;
    flex: 0 0 50%;
    height: inherit;
    background-color: ${({ theme }) => theme.colors.gray800};
    border-top-right-radius: 16px;
  }
  .videoWrapper{
    position: relative;
    left: 50%;
    top: 50%;
    width: 162px; 
    height: 162px;
    transform: translate3d(-50%, -50%, 0);
  }
  .videoInner{
    position: relative;
    width: 162px; 
    height: 162px;
  } 
  .firmwareCheck {  
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    width: 74px;
    height: 74px;
    line-height: 69px;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(0, 206, 201, 0.8);   
    transform-origin: center center;
    transform: scale(0) translate3d(-50%, -50%, 0);
    opacity: 0;
    svg {
      transform: scale(1.5);
    }
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
  h3 {
    color: ${({ theme }) => theme.colors.brandSuccess}; 
  }
  h6 {
    font-weight: 400;
    letter-spacing:0;
    font-size: 15px;
  }
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
  const videoIntro = React.useRef(null);
  const videoRelease = React.useRef(null);
  const checkSuccess = React.useRef(null);

  React.useEffect(() => {
    if (fakeCountdown === 1) {
      videoIntro.current.addEventListener(
        "ended",
        function () {
          videoIntro.current.currentTime = 3;
          videoIntro.current.play();
        },
        false
      );
      videoRelease.current.pause();
    }
    if (fakeCountdown === 2) {
      videoIntro.current.classList.add("animOut");
      videoRelease.current.classList.add("animIn");
    }
    if (fakeCountdown === 3) {
      videoRelease.current.play();
    }
    if (fakeCountdown > 3) {
      checkSuccess.current.classList.add("animInCheck");
    }
  }, [fakeCountdown]);

  return (
    <Style>
      <div className="mainProcessWrapper">
        <div className="process-row process-header">
          <div className="process-col process-image">
            <div className="videoWrapper">
              <div className="videoInner">
                <div className="firmwareCheck animWaiting" ref={checkSuccess}>
                  <IconCheckmarkSm />
                </div>
                <video ref={videoIntro} width={520} height={520} autoPlay={`true`} className="img-center img-fluid animIn">
                  <source src={videoFirmwareUpdate} type="video/mp4" />
                </video>
                <video
                  ref={videoRelease}
                  width={520}
                  height={520}
                  autoPlay={`false`}
                  className="img-center img-fluid animWaiting"
                >
                  <source src={videoFirmwareUpdateReleaseKey} type="video/mp4" />
                </video>
              </div>
            </div>
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
