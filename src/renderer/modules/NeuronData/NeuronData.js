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
import NeuronTitle from "../NeuronTitle";

const Style = Styled.div`
.cardContentNeuronData {
  border-radius: 6px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.gray900};
}
`;
const NeuronData = ({ neuronName, neuronID, neuronData }) => {
  return (
    <Style>
      <div className="cardContentNeuronData">
        <NeuronTitle neuronName={neuronName} neuronID={neuronID} />
        {neuronData}
      </div>
    </Style>
  );
};

export default NeuronData;
