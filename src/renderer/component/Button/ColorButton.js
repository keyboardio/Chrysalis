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

import { toast } from "react-toastify";
import ToastMessage from "../../component/ToastMessage";
import { IconColorPicker } from "../../component/Icon";

const Style = Styled.div` 
.buttonColor {
  display: flex;
  flex-wrap: nowrap;
  width: 132px;
  align-items: center;
  padding: 5px 8px;
  color: ${({ theme }) => theme.styles.button.buttonColor.color};
  .buttonIcon {
    width: 24px;
    position: relative;
    .colorIndicator {
      box-shadow: 4px 4px 12px rgba(11, 2, 25, 0.5);
      border-radius: 2px;
      width: 12px;
      height: 12px;
      display: inline-block;
      position: absolute;
      bottom: -6px;
      right: -8px;
      border: 1px solid ${({ theme }) => theme.styles.button.buttonColor.borderColor};
    }
  }
  .buttonLabel {
    flex: 0 0 calc(100% - 24px);
    padding-left: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    line-height: 1.1em;
    font-size: 13px;
    .subtitle {
      color: #97A0B4;
      font-size: 11px;
      letter-spacing: -0.03em;
      font-weight: 600;
      color: ${({ theme }) => theme.styles.button.buttonColor.subtitleColor};
    }
  }
}
`;

const ColorButton = ({ selected, onClick, label, text, icoSVG, color }) => {
  const [disabled, setDisabled] = React.useState(true);

  const colorToastMessage = () => {
    toast.warn(
      <ToastMessage
        title={i18n.editor.color.selectColorFirst}
        content={i18n.editor.color.selectColorFirstContent}
        icon={<IconColorPicker />}
      />
    );
  };
  React.useEffect(() => {
    if (color) {
      setDisabled(false);
    }
  }, [color]);

  return (
    <Style>
      <div
        onClick={disabled ? colorToastMessage : onClick}
        className={`${selected ? "active" : ""} button button-config buttonColor`}
        disabled={disabled}
      >
        <div className={"buttonIcon"}>
          {icoSVG ? icoSVG : null}
          {color ? <div className="colorIndicator" style={{ background: `${color.rgb}` }}></div> : null}
        </div>
        <div className={"buttonLabel"}>
          {label ? <div className="subtitle">{label}</div> : null}
          <div className="title">{text}</div>
        </div>
      </div>
    </Style>
  );
};

ColorButton.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string,
  text: PropTypes.string,
  icoSVG: PropTypes.object,
  color: PropTypes.object
};

export default ColorButton;
