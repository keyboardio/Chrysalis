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
import i18n from "../../i18n";

const Style = Styled.div`
h3 {
  font-size: 16px;
  margin-bottom: 2px;
  color: ${({ theme }) => theme.styles.neuronTitle.heading3Color};
}
h4 {
  font-size: 14px;
  color: ${({ theme }) => theme.styles.neuronTitle.heading4Color};
}
`;
const NeuronTitle = ({ neuronName, neuronID }) => {
  return (
    <Style>
      <div className={`backupFolderConfigurator`}>
        <Title text={`${i18n.keyboardSettings.neuronManager.nameTitle} ${neuronName}`} headingLevel={3} />
        <Title text={`ID ${neuronID}`} headingLevel={4} />
      </div>
    </Style>
  );
};

export default NeuronTitle;
