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
width: 100%;
flex: 0 0 100%;
align-self: flex-start;
.pageHeader {
    border-radius: 16px;
    padding: 14px 32px;
    margin-top: 20px; 
    display: flex;
    align-items: center;
    min-height: 82px;
    background-color: ${({ theme }) => theme.styles.pageHeader.backgroundColor};
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }
    h2 {
      color: ${({ theme }) => theme.styles.pageHeader.titleColor}
    }
    &.pageHeaderFlatBottom {
      border-radius: 16px 16px 0 0;
    }
}
`;
const PageHeader = ({ size, text, style, contentSelector, saving }) => {
  return (
    <Style>
      <div className={`pageHeader ${size} ${style}`}>
        <div className="pageTitle">
          <Title text={text} headingLevel={2} />
        </div>
        <div className="pageTools">
          {contentSelector ? contentSelector : ""}
          {saving ? saving : ""}
        </div>
      </div>
    </Style>
  );
};

export default PageHeader;
