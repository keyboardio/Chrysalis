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
import i18n from "../../i18n";

import Title from "../../component/Title";
import DotsProgressBar from "./DotsProgressBar";

const Styles = Styled.div`
margin: 0 24px;
border: 1px solid ${({ theme }) => theme.styles.memoryUsage.borderColor};
border-radius: 4px;
padding: 8px 12px;
color: ${({ theme }) => theme.styles.memoryUsage.color};
h4 {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.03em;
  margin-bottom: 8px;
  color: inherit;
}
.progressIndicator {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.progressIndicatorPercentage {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: -0.03em;
  padding: 0 6px;
  color: ${({ theme }) => theme.styles.memoryUsage.percentageColor};
}
.progressBaseColor {
  fill: ${({ theme }) => theme.styles.memoryUsage.progressBaseColor};
}
.progressFill {
  fill: ${({ theme }) => theme.styles.memoryUsage.progressFill};
}
`;

const MacrosMemoryUsage = ({ mem }) => {
  const [memoryUsage, setMemoryUsage] = React.useState(mem);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    //setMemoryUsage(macros.map(m => m.actions).flat().length);
    setMemoryUsage(((mem / 2000) * 100).toFixed(1));
    setIsLoading(false);
    if (mem > 1999) {
      console.log(
        "You exceeded the maximum capacity of actions in your macros. Please decrease the number of actions until the top right bar is no longer red"
      );
    }
  }, [mem]);
  if (isLoading) return null;
  return (
    <Styles>
      <Title text="Memory Usage" headingLevel={4} />
      <div className="progressIndicator">
        <div className="progressIndicatorBar">
          <DotsProgressBar progressWidth={memoryUsage} />
        </div>
        <div className="progressIndicatorPercentage">{memoryUsage}%</div>
      </div>
    </Styles>
  );
};
export default MacrosMemoryUsage;
