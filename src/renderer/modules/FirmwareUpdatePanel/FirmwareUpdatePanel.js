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
import Dropdown from "react-bootstrap/Dropdown";
import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { FirmwareVersionStatus, FirmwareNeuronStatus } from "../FirmwareVersionStatus";
import { RegularButton } from "../../component/Button";
import WhatsNew from "../WhatsNew";

import { IconMoreVertical } from "../../component/Icon";

const Style = Styled.div`   
width: 100%;
.firmware-wrapper {
  max-width: 960px;   
  width: 100%;
  margin: auto;
  
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
    flex: 0 0 34%;
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

.buttonActions {
  position: relative;
  display: flex;
  height: 116px;
  margin-bottom: 42px;
  margin-right: 32px;
  background-color: ${({ theme }) => theme.styles.firmwareUpdatePanel.backgroundStripeColor};  
  border-bottom-right-radius: 16px;
  border-top-right-radius: 16px;
  align-items:center;
  justify-content: center;
}
.dropdownCustomFirmware {
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translate3d(0, -50%,0);
  margin-top: 0;
  z-index: 9;
  
  .buttonToggler.dropdown-toggle.btn {
    color: ${({ theme }) => theme.styles.firmwareUpdatePanel.iconDropodownColor}; 
  }
}
.wrapperActions { 
  display: flex;
  padding-left: 32px;
  margin-left: 32px;
  align-items: center;
  height: 116px;
  margin-bottom: 42px;
  background-color: ${({ theme }) => theme.styles.firmwareUpdatePanel.backgroundStripeColor};    
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
  .button {
    align-self: center;
  }
} 
.disclaimer-firmware {
  .lineColor {
      stroke: ${({ theme }) => theme.styles.firmwareUpdatePanel.neuronStatusLineWarning}; 
  }
}
`;

const FirmwareUpdatePanel = ({
  versions,
  currentlyVersionRunning,
  latestVersionAvailable,
  onClick,
  selectFirmware,
  firmwareFilename,
  disclaimerCard,
  onCancelDialog,
  onBackup
}) => {
  // production
  const isUpdated = currentlyVersionRunning === latestVersionAvailable ? true : false;

  // development
  //const isUpdated = true;

  console.log("Versions: ", versions);
  console.log("currentlyVersionRunning: ", currentlyVersionRunning);
  console.log("latestVersionAvailable: ", latestVersionAvailable);

  return (
    <Style>
      <>
        {disclaimerCard ? (
          <div className="firmware-wrapper disclaimer-firmware">
            <div className="firmware-row">
              <div className="firmware-content borderLeftTopRadius">
                <div className="firmware-content--inner">
                  <Title text={i18n.firmwareUpdate.texts.disclaimerTitle} headingLevel={3} />
                  <div
                    className={"disclaimerContent"}
                    dangerouslySetInnerHTML={{ __html: i18n.firmwareUpdate.texts.disclaimerContent }}
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
                <div className="wrapperActions">
                  <RegularButton
                    className="flashingbutton nooutlined"
                    style="outline"
                    buttonText={i18n.firmwareUpdate.texts.backwds}
                    onClick={onCancelDialog}
                  />
                </div>
              </div>
              <div className="firmware-sidebar borderRightBottomRadius">
                <div className="buttonActions">
                  <RegularButton
                    className="flashingbutton nooutlined"
                    style="primary"
                    buttonText={i18n.firmwareUpdate.texts.letsStart}
                    onClick={onBackup}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="firmware-wrapper home-firmware">
            <div className="firmware-row">
              <div className="firmware-content borderLeftTopRadius">
                <div className="firmware-content--inner">
                  <Title
                    text={
                      isUpdated ? i18n.firmwareUpdate.texts.versionUpdatedTitle : i18n.firmwareUpdate.texts.versionOutdatedTitle
                    }
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
                <div className="buttonActions">
                  {!isUpdated && (
                    <RegularButton
                      className="flashingbutton nooutlined"
                      style="primary"
                      buttonText={i18n.firmwareUpdate.flashing.button}
                      onClick={onClick}
                    />
                  )}
                  <div className="dropdownCustomFirmware">
                    <Dropdown className="dropdownWithContent AdvancedUsers">
                      <Dropdown.Toggle className="buttonToggler">
                        <IconMoreVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdownMenu">
                        <div className="dropdownMenuPadding">
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
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
            {!isUpdated && <WhatsNew />}
          </div>
        )}
      </>
    </Style>
  );
};

export default FirmwareUpdatePanel;
