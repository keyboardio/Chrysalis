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
import Title from "../../component/Title";
import { RegularButton } from "../../component/Button";
import NeuronStatus from "../../component/NeuronStatus";
import SelectKeyboardDropdown from "../../component/SelectKeyboardDropdown";
import i18n from "../../i18n";

const Style = Styled.div`
.neuronConnection {
  display: flex;
  align-items: center;
  margin-top: -62px;
}
.neuronInformation {
  align-self: center;
  width: 464px;
  margin-left: -32px;
  padding: 24px 32px;
  background-color: var(--gray-800);
  border-radius: 14px;
  z-index: 2;
  .neuronSubtileText {
    color: var(--gray-200);
    font-weight: 600;
    letter-spacing: -0.03em;
  }
}
.themeLight {
  .neuronInformation {
    background-color: var(--gray-25);
  }
}
.buttons > .button {
  margin-right: 16px;
}
`;
const NeuronConnection = ({
  theme,
  loading,
  scanFoundDevices,
  scanDevices,
  onKeyboardConnect,
  cantConnect,
  connected,
  onDisconnect,
  selectPort,
  selectedPortIndex,
  deviceItems
}) => {
  let themeMode = theme ? "themeDark" : "themeLight";
  return (
    <Style>
      <div className={`neuronConnection`}>
        <NeuronStatus
          loading={loading}
          connected={connected}
          scanFoundDevices={scanFoundDevices}
          deviceItems={deviceItems.length}
        />
        <div className="neuronInformation">
          {!deviceItems.length ? (
            <>
              <Title text={i18n.keyboardSelect.noDevices} headingLevel={2} theme={theme} type={"warning"} />
              <p className={"neuronSubtileText"}>{i18n.keyboardSelect.noDevicesSubtitle}</p>
            </>
          ) : (
            ""
          )}

          {deviceItems.length > 0 ? (
            <>
              <Title text={i18n.keyboardSelect.selectPrompt} headingLevel={2} theme={theme} />
              <SelectKeyboardDropdown
                deviceItems={deviceItems}
                selectPort={selectPort}
                selectedPortIndex={selectedPortIndex}
                connected={connected}
              />
            </>
          ) : (
            ""
          )}
          <div className="buttons">
            <RegularButton
              onClick={scanDevices}
              buttonText={i18n.keyboardSelect.scan}
              style={`${connected || deviceItems.length > 0 ? "outline" : "primary"}`}
              disabled={scanFoundDevices}
            />
            {connected ? (
              <RegularButton
                buttonText={i18n.keyboardSelect.disconnect}
                style={"primary"}
                onClick={onDisconnect}
                disabled={false}
              />
            ) : (
              ""
            )}
            {!connected && deviceItems.length > 0 ? (
              <RegularButton
                buttonText={i18n.keyboardSelect.connect}
                style={"primary"}
                onClick={onKeyboardConnect}
                disabled={false}
              />
            ) : (
              ""
            )}

            {!deviceItems.length ? (
              <RegularButton buttonText={i18n.keyboardSelect.connect} style={"primary"} disabled={true} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Style>
  );
};

export default NeuronConnection;
