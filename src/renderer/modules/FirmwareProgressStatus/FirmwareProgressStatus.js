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
import PropTypes from "prop-types";
import Styled from "styled-components";
import i18n from "../../i18n";
import ProgressBar from "react-bootstrap/ProgressBar";

import Title from "../../component/Title";
import { FirmwareImageHelp } from "../FirmwareImageHelp";

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
    background-color: ${({ theme }) => theme.styles.firmwareUpdateProcess.processImageBackground};
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
    background-color: ${({ theme }) => theme.styles.firmwareUpdateProcess.processNeuronBackground};
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
    color: white;
    svg {
      transform: scale(1.5);
    }
  }
}
.process-footer {
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.styles.firmwareUpdateProcess.processFooterBackground}; 
  border-radius: 0px 0px 16px 16px;
  text-align: center;
  h3 {
    color: ${({ theme }) => theme.colors.brandSuccess}; 
  }
  h6 {
    font-weight: 395;
    letter-spacing:0;
    font-size: 15px;
  }
}
.blob {
  background: #33d9b2;
  box-shadow: 0 0 0 0 #33d9b2;
  border-radius: 50%;
  margin: 10px;
  height: 8px;
  width: 8px;
  transform: scale(1);

  //animation: pulse-green 2s infinite;
  transform: scale(1);
  box-shadow: 0 0 0 32px rgba(51, 217, 178, 0.15);
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

/**
 * This FirmwareProgressStatus function returns a card with text and images that reacts according the process update
 * The object will accept the following parameters
 *
 * @param {number} countdown - A number that represents the actual step on the firmware update process.
 * @param {number} flashProgress - The value used to render the progress bar.
 * @returns {<FirmwareProgressStatus>} FirmwareProgressStatus component.
 */

const FirmwareProgressStatus = ({ countdown, flashProgress }) => {
  return (
    <Style>
      <div className="mainProcessWrapper">
        <FirmwareImageHelp countdown={countdown} />
        <div className="process-row">
          <ProgressBar>
            <ProgressBar striped animated now={flashProgress} />
          </ProgressBar>
        </div>
        <div className="process-row process-footer">
          {countdown === 1 ? (
            <Title text={i18n.firmwareUpdate.texts.flashCardTitle1} headingLevel={3} />
          ) : countdown === 2 ? (
            <Title text={i18n.firmwareUpdate.texts.progressCardStatus1} headingLevel={3} />
          ) : countdown === 3 ? (
            <Title text={i18n.firmwareUpdate.texts.progressCardStatus3} headingLevel={3} />
          ) : countdown === 4 ? (
            <Title text={i18n.firmwareUpdate.texts.firmwareUpdatedTitle} headingLevel={3} />
          ) : (
            ""
          )}

          {countdown === 1 ? (
            <Title text={i18n.firmwareUpdate.texts.flashCardTitle2} headingLevel={6} />
          ) : countdown === 4 ? (
            <Title text={i18n.firmwareUpdate.texts.firmwareUpdatedMessage} headingLevel={6} />
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

FirmwareProgressStatus.propTypes = {
  countdown: PropTypes.number.isRequired,
  flashProgress: PropTypes.number
};

export default FirmwareProgressStatus;
