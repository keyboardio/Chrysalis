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
import Saving from "../Saving";

const Style = Styled.div`
width: 100%;
flex: 0 0 100%;
align-self: flex-start;
&.pageHeaderSticky {
  position: sticky;
  top: 0;
  backdrop-filter: blur(12px);
  z-index: 12;
}
.pageHeader {
    border-radius: 16px;
    padding: 14px 32px;
    margin-top: 20px;
    display: flex;
    flex-wrap: nowrap;
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

    .pageTitle {
      width: 216px;
      white-space: nowrap;
      br {
        content: ' ';
      }
    } 
    .pageTools {
      width: calc(100% - 216px);
      display: flex;
      align-items: center;
    }
    .savingButtons {
      margin-left: auto;
      .button {
        padding: 12px 24px;
      }
      .button + .button {
        margin-left: 12px;
      }
    }
}
`;

const PageHeader = ({ size, text, style, contentSelector, showSaving, saveContext, destroyContext, inContext }) => {
  return (
    <Style className={`${style === "pageHeaderFlatBottom" ? "pageHeaderSticky" : ""}`}>
      <div className={`pageHeader ${size && size} ${style && style}`}>
        <div className="pageTitle">
          <Title text={text} headingLevel={2} />
        </div>
        <div className="pageTools">
          {/* //onSelect, itemList, selectedItem, deleteItem, subtitle */}
          {contentSelector ? contentSelector : ""}
          {showSaving ? <Saving saveContext={saveContext} destroyContext={destroyContext} inContext={inContext} /> : ""}
        </div>
      </div>
    </Style>
  );
};

export default PageHeader;
