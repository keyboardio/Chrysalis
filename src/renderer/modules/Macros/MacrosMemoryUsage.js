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

const Style = Styled.div`

`;

const MacrosMemoryUsage = ({ macros }) => {
  const [memoryUsage, setMemoryUsage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setMemoryUsage(macros.map(m => m.actions).flat().length);
    setIsLoading(false);
    if (macros.map(m => m.actions).flat().length > 1999) {
      console.log(
        "You exceeded the maximum capacity of actions in your macros. Please decrease the number of actions until the top right bar is no longer red"
      );
    }
  });

  //   updateFreeMemory = macros => {
  //     let mem = macros.map(m => m.actions).flat().length;
  //     this.setState({ freeMemory: mem });
  //     if (mem > 1999) {
  //       alert(
  //         "You exceeded the maximum capacity of actions in your macros. Please decrease the number of actions until the top right bar is no longer red"
  //       );
  //     }
  //   };
  if (isLoading) return null;
  return (
    <Style>
      <Title text="Memory Usage" headingLevel={3} />
      {memoryUsage}
    </Style>
  );
};

export default MacrosMemoryUsage;
