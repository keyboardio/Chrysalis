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

import { RegularButton } from "../../component/Button";
import { IconMoreVertical } from "../../component/Icon";

const Style = Styled.div`

`;
const FirmwareAdvancedOptions = ({ firmwareFilename, selectFirmware }) => {
  return (
    <Style>
      <Dropdown className="dropdownWithContent AdvancedUsers">
        <Dropdown.Toggle className="buttonToggler">
          <IconMoreVertical />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdownMenu">
          <div className="dropdownMenuPadding">
            <div className={"dropdownMenuContent"} dangerouslySetInnerHTML={{ __html: i18n.firmwareUpdate.texts.advUsersHTML }} />
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
    </Style>
  );
};

export default FirmwareAdvancedOptions;
