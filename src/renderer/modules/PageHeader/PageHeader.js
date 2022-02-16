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

const Style = Styled.div`
.pageHeader {
    border-radius: 16px;
    padding: 14px 32px;
    margin-top: 20px; 
    display: flex;
    align-items: center;
    min-height: 82px;
    &.themeDark {
        background-color: rgba(107, 119, 148, 0.15);
    }
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }
    &.themeLight {
        background-color: rgba(240, 242, 244, 0.9);
        h2 {
            color: var(--purple-200);
        }
    }
}
`;
const PageHeader = ({ size, text, style, theme }) => {
  let themeMode = theme ? "themeDark" : "themeLight";
  return (
    <Style>
      <div className={`pageHeader ${size} ${themeMode} ${style}`}>
        <Title text={text} headingLevel={2} theme={theme} />
      </div>
    </Style>
  );
};

export default PageHeader;
