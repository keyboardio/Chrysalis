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
import Styled from "styled-components";

import videoFirmwareUpdate from "../../../../static/base/update-firmware.mp4";
import videoFirmwareUpdateReleaseKey from "../../../../static/base/release-key.mp4";
import { IconCheckmarkSm } from "../../component/Icon";

const Style = Styled.div`   

`;

const FirmwareImageHelp = ({ countdown }) => {
  const videoIntro = React.useRef(null);
  const videoRelease = React.useRef(null);
  const checkSuccess = React.useRef(null);

  React.useEffect(() => {
    if (countdown === 1) {
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
    if (countdown === 2) {
      videoIntro.current.classList.add("animOut");
      videoRelease.current.classList.add("animIn");
    }
    if (countdown === 3) {
      videoRelease.current.play();
    }
    if (countdown > 3) {
      checkSuccess.current.classList.add("animInCheck");
    }
  }, [countdown]);
  return (
    <Style>
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
              <video ref={videoRelease} width={520} height={520} autoPlay={`false`} className="img-center img-fluid animWaiting">
                <source src={videoFirmwareUpdateReleaseKey} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="process-col process-neuron">
          {countdown === 1 ? (
            <div className="processRaise">
              <div className="status-icon">
                <div className="blob green"></div>
              </div>
              <canvas className="" width={340} height={259}></canvas>
            </div>
          ) : (
            <div className="updatingRaise">{countdown}</div>
          )}
        </div>
      </div>
    </Style>
  );
};

export default FirmwareImageHelp;
