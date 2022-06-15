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

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { FirmwareVersionStatus, FirmwareNeuronStatus } from "../FirmwareVersionStatus";
import { RegularButton } from "../../component/Button";
import WhatsNew from "../WhatsNew";
import FirmwareAdvancedOptions from "../FirmwareAdvancedOptions";

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
  right: 14px;
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
  .firmware-content--inner h3 {
    color: ${({ theme }) => theme.styles.firmwareUpdatePanel.disclaimerTitle};
  }
}
.buttonActions .button.primary {
  margin-right: -32px;
}
@media screen and (max-width: 1100px) {
  .buttonActions .button.primary {
    margin-right: -16px;
  }
}
@media screen and (max-width: 980px) {
  .buttonActions .button.primary {
    margin-right: 6px;
  }
}
@media screen and (max-width: 860px) {
  .buttonActions .button.primary {
    margin-right: 16px;
  }
  .dropdownCustomFirmware {
    right: 8px;
  }
  .buttonActions {
    justify-content: flex-start;
    padding-left: 8px;
  }
  .firmware-wrapper .firmware-content {
    flex: 0 0 55%;
  }
  .firmware-wrapper .firmware-sidebar {
    flex: 0 0 45%;
  }
  .badge {
    font-size: 11px;
    font-weight: 600;
    padding: 8px;
  }
  .hidden-on-sm {
    display:none;
  }
}
`;

/**
 * This FirmwareUpdatePanel function returns a module that wrap all modules and components to manage the first steps of firware update.
 * The object will accept the following parameters
 *
 * @param {string} currentlyVersionRunning - The actual version installed
 * @param {string} latestVersionAvailable - The last version avaliable
 * @param {function} onClick - The function that handle the beginning of the process (Upgrade now button)
 * @param {function} selectFirmware - The function that handle with the custom software instalation
 * @param {string} firmwareFilename - Variable that stores the route of the local folder where the custom firmware is located
 * @param {number} disclaimerCard - Number that indicates the software when the installation will begin.
 * @param {function} onCancelDialog - The function that cancels the update process
 * @param {function} onBackup - The function that starts the update process (Lets start button)
 * @returns {<FirmwareUpdatePanel>} FirmwareUpdatePanel component.
 */

const FirmwareUpdatePanel = ({
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
  const isBeta = latestVersionAvailable.includes("beta");

  // development
  //const isUpdated = true;
  //const isUpdated = currentlyVersionRunning === "v1.0.0beta19" ? true : false;

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
                  {isUpdated ? (
                    <RegularButton
                      className="flashingbutton nooutlined"
                      style="outline"
                      buttonText={i18n.firmwareUpdate.flashing.buttonUpdated}
                      onClick={onClick}
                    />
                  ) : (
                    <RegularButton
                      className="flashingbutton nooutlined"
                      style="primary"
                      buttonText={i18n.firmwareUpdate.flashing.button}
                      onClick={onClick}
                    />
                  )}
                  <div className="dropdownCustomFirmware">
                    <FirmwareAdvancedOptions firmwareFilename={firmwareFilename} selectFirmware={selectFirmware} />
                  </div>
                </div>
              </div>
            </div>
            {!isUpdated && !isBeta && <WhatsNew />}
          </div>
        )}
      </>
    </Style>
  );
};

FirmwareUpdatePanel.propTypes = {
  currentlyVersionRunning: PropTypes.string,
  latestVersionAvailable: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectFirmware: PropTypes.func.isRequired,
  onCancelDialog: PropTypes.func.isRequired,
  onBackup: PropTypes.func.isRequired,
  firmwareFilename: PropTypes.string,
  disclaimerCard: PropTypes.number
};

export default FirmwareUpdatePanel;
