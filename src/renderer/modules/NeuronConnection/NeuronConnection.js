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
import { SelectKeyboardDropdown } from "../../component/Select";
import i18n from "../../i18n";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastMessage from "../../component/ToastMessage";
import { IconChip } from "../../component/Icon";

const Style = Styled.div`
.button.toastButton {   
  z-index: 3000;
}
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
  background-color: ${({ theme }) => theme.styles.neuronConnection.backgroundColor};
  border-radius: 14px;
  z-index: 2;
  h2 {
    color: ${({ theme }) => theme.styles.neuronConnection.titleColor};
    &.warning {
      color: ${({ theme }) => theme.colors.textWarning};
    }
  }
  .neuronSubtileText {
    color: ${({ theme }) => theme.styles.neuronConnection.subTitleColor};
    font-weight: 600;
    letter-spacing: -0.03em;
  }
}
.buttons > .button {
  margin-right: 16px;
}
@media screen and (max-width: 890px) {
  .neuronConnection {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: -82px;
  }
  .neuronStatusInner {
    transform: scale(0.8);
  }
  .neuronInformation {
    margin-left: auto;
    margin-right: auto;
    margin-top: -74px;
  }
}
`;
const NeuronConnection = ({
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
  const toastId = React.useRef(null);
  const dismiss = () => toast.dismiss(toastId.current);

  const notify = () =>
    (toastId.current = toast(
      <ToastMessage
        title="Wow so easy! 🦄"
        content={
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus"
        }
        icon={<IconChip />}
        onClickAction={dismiss}
        clickActionText={"Take action"}
        onClickDismiss={dismiss}
        clickDismissText={"Discard"}
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }
    ));

  const notifyWarning = () =>
    (toastId.current = toast.warn(
      <ToastMessage
        title="Warning toast!"
        content={
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus"
        }
        icon={<IconChip />}
        onClickAction={dismiss}
        clickActionText={"Take action"}
        onClickDismiss={dismiss}
        clickDismissText={"Discard"}
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }
    ));

  const notifyDanger = () =>
    (toastId.current = toast.error(
      <ToastMessage
        title="Danger toast!"
        content={
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus"
        }
        icon={<IconChip />}
        onClickAction={dismiss}
        clickActionText={"Take action"}
        onClickDismiss={dismiss}
        clickDismissText={"Discard"}
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }
    ));
  const notifySuccess = () =>
    (toastId.current = toast.success(
      <ToastMessage
        title="Success toast!"
        content={
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus"
        }
        icon={<IconChip />}
        onClickAction={dismiss}
        clickActionText={"Take action"}
        onClickDismiss={dismiss}
        clickDismissText={"Discard"}
      />,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }
    ));
  return (
    <Style>
      <button className="button primary toastButton" size="sm" onClick={notify}>
        Default Toast
      </button>
      <button className="button primary toastButton" size="sm" onClick={notifyWarning}>
        Warning Toast
      </button>
      <button className="button primary toastButton" size="sm" onClick={notifyDanger}>
        Danger Toast
      </button>
      <button className="button primary toastButton" size="sm" onClick={notifySuccess}>
        Success Toast
      </button>

      <div className="neuronConnection">
        <NeuronStatus
          loading={loading}
          connected={connected}
          scanFoundDevices={scanFoundDevices}
          deviceItems={deviceItems.length}
        />
        <div className="neuronInformation">
          {!deviceItems.length ? (
            <>
              <Title text={i18n.keyboardSelect.noDevices} headingLevel={2} type={"warning"} />
              <p className={"neuronSubtileText"}>{i18n.keyboardSelect.noDevicesSubtitle}</p>
            </>
          ) : (
            ""
          )}

          {deviceItems.length > 0 ? (
            <>
              <Title text={i18n.keyboardSelect.selectPrompt} headingLevel={2} />
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

      <ToastContainer />
    </Style>
  );
};

export default NeuronConnection;
