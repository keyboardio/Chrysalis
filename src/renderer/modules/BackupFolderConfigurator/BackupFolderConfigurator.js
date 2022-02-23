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
import Form from "react-bootstrap/Form";
import i18n from "../../i18n";

const Style = Styled.div`
width: 100%;
.containerInfo {
  display: flex;
  width: 100%;
    border-radius: 2px;
    padding: 2px;
    background: rgba(11, 2, 25, 0.2);
    /* Gray/600 */
    border: 1px solid #3F425A;
    box-sizing: border-box;
    border-radius: 6px;
    .containerInfoInner {
      .button {
        white-space: nowrap;
      }
    }
}
`;
const BackupFolderConfigurator = ({ chooseBackupFolder, getBackup, backupFolder, connected }) => {
  return (
    <Style>
      <div className={`backupFolderConfigurator`}>
        <Title text={i18n.keyboardSettings.backupFolder.title} headingLevel={6} />
        <div className="containerInfo">
          <div className="containerInfoInner">
            <Form.Control type="text" value={backupFolder} readOnly />
            <RegularButton
              onClick={chooseBackupFolder}
              style="tertiary"
              buttonText={i18n.keyboardSettings.backupFolder.selectButtonText}
            />
            <RegularButton
              onClick={getBackup}
              style="tertiary"
              buttonText={i18n.keyboardSettings.backupFolder.restoreButtonText}
              disabled={!connected}
            />
          </div>
        </div>
      </div>
    </Style>
  );
};

export default BackupFolderConfigurator;
