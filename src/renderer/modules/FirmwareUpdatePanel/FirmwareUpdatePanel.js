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
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { FirmwareVersionStatus, FirmwareNeuronStatus } from "../FirmwareVersionStatus";
import { RegularButton } from "../../component/Button";
import WhatsNew from "../WhatsNew";

const Style = Styled.div`
.firmware-wrapper {
  max-width: 960px;   
  width: 100%;
  
  .firmware-row {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
  }
  .firmware-content {
    flex: 0 0 66%;
    background: ${({ theme }) => theme.styles.firmwareUpdatePanel.backgroundContent}; 
  }
  .firmware-sidebar {
    flex: 0 0 33%;
    background: ${({ theme }) => theme.styles.firmwareUpdatePanel.backgroundSidebar}; 
  }
  .firmware-content--inner {
    padding: 32px;
  }   

  .borderLeftTopRadius {
    border-top-left-radius: 14px;
  } 
  .borderRightTopRadius {
    border-top-right-radius: 14px;
  }
  .borderLeftBottomRadius {
    border-bottom-left-radius: 14px;
  } 
  .borderRightBottomRadius {
    border-bottom-right-radius: 14px;
  }
}

`;

const FirmwareUpdatePanel = ({
  versions,
  currentlyVersionRunning,
  latestVersionAvailable,
  onClick,
  advancedUsers,
  onClickToggleAdvanced,
  selectFirmware,
  firmwareFilename
}) => {
  // production
  const isUpdated = currentlyVersionRunning === latestVersionAvailable ? true : false;

  // development
  //const isUpdated = false;

  console.log("Versions: ", versions);
  console.log("currentlyVersionRunning: ", currentlyVersionRunning);
  console.log("latestVersionAvailable: ", latestVersionAvailable);

  return (
    <Style>
      <div className="firmware-wrapper home-firmware">
        <div className="firmware-row">
          <div className="firmware-content borderLeftTopRadius">
            <div className="firmware-content--inner">
              <Title
                text={isUpdated ? i18n.firmwareUpdate.texts.versionUpdatedTitle : i18n.firmwareUpdate.texts.versionOutdatedTitle}
                headingLevel={3}
                type={isUpdated ? "success" : "warning"}
              />
              <Callout content={i18n.firmwareUpdate.texts.calloutIntroText} className="mt-lg" size="md" />
            </div>
          </div>
          <div className="firmware-sidebar borderRightTopRadius">
            <FirmwareNeuronStatus isUpdated={isUpdated} />
          </div>
        </div>
        <div className="firmware-row">
          <div className="firmware-content borderLeftBottomRadius">
            <FirmwareVersionStatus
              currentlyVersionRunning={currentlyVersionRunning}
              latestVersionAvailable={latestVersionAvailable}
              isUpdated={isUpdated}
            />
          </div>
          <div className="firmware-sidebar borderRightBottomRadius">
            {!isUpdated && (
              <RegularButton
                className="flashingbutton nooutlined"
                style="primary"
                buttonText={i18n.firmwareUpdate.flashing.button}
                onClick={onClick}
              />
            )}
            <Dropdown className="dropdownAdvancedUsers">
              <Dropdown.Toggle className="toggler">Icon advanced</Dropdown.Toggle>
              <Dropdown.Menu className="dropdownMenu">
                <div
                  className={"dropdownMenuContent"}
                  dangerouslySetInnerHTML={{ __html: i18n.firmwareUpdate.texts.advUsersHTML }}
                />
                <RegularButton
                  className="flashingbutton nooutlined"
                  style="outline gradient"
                  buttonText={firmwareFilename == "" ? i18n.firmwareUpdate.custom : i18n.firmwareUpdate.rcustom}
                  onClick={selectFirmware}
                />
                {firmwareFilename}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {!isUpdated && <WhatsNew />}
      </div>
    </Style>
  );
};

export default FirmwareUpdatePanel;
