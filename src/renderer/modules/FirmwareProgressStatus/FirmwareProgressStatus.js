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
import i18n from "../../i18n";
import ProgressBar from "react-bootstrap/ProgressBar";

import Title from "../../component/Title";

import PressKeyImageSource from "../../../../static/base/update-keep-holding-firmware--once.gif";

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
.process-footer {
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray800}; 
  border-radius: 0px 0px 16px 16px;
  text-align: center;
}
`;

const FirmwareProgressStatus = ({ flashProgress }) => {
  return (
    <Style>
      <div className="mainProcessWrapper">
        <div className="process-row process-header">
          <div className="process-col process-image">
            <img src={PressKeyImageSource} className="img-center img-fluid" />
          </div>
          <div className="process-col process-neuron"></div>
        </div>
        <div className="process-row">
          <ProgressBar>
            <ProgressBar now={flashProgress} />
          </ProgressBar>
        </div>
        <div className="process-row process-footer">
          <Title text="Hold the key" headingLevel={3} />
          <Title text="1. Preparing layers" headingLevel={6} />
        </div>
      </div>
    </Style>
  );
};

export default FirmwareProgressStatus;
