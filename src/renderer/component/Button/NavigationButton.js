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
import LightAccent from "../../../../static/dark/light-accent--lg.png";

const Style = Styled.div`
.menuLink {
    width: 96px;
    height: 96px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 6px;
    position: relative;
    padding: 8px 6px;
    text-align: center;

    color: #7B869E;

    transition-property: color, background;
    transition: 300ms ease-in-out;
    background: linear-gradient(237.13deg, rgba(39, 27, 58, 0) 1.37%, rgba(123, 134, 158, 0) 99.24%);

    text-decoration: none;
    .menuLinkText {
        font-size: 12px;
        font-weight: 600;
        flex: 0 0 100%;
    }
}
.menuLink:before {
    content: '';
    position: absolute;
    right: -15px;
    top: 50%;

    transform: translate3d(0, -50%, 0);
    width: 3px;
    height: 42px;

    background: linear-gradient(180deg, #FE007C 0%, #6B14F9 100%);
    border-radius: 0px 3px 3px 0px;     

    opacity: 0;
    transition: 300ms opacity ease-in-out;

}
.menuLink:after {
    content: '';
    position: absolute;
    right: -12px;
    top: 50%;

    transform: translate3d(0, -50%, 0);
    width: 32px;
    height: 96px;
    background-image: url(${LightAccent});
    opacity: 0;
    transition: 300ms opacity ease-in-out;
}
.menuLink:hover {   
    text-decoration: none;
    color: #F0F2F4;
    .menuLinkInner:before {
        opacity: 1;
    }
}   
.menuLink:hover,
.menuLink.active {
    .menuLinkInner:before {
        opacity: 0.8;
    }
}
.menuLink.active {  
    color: #F0F2F4;
}
.menuLink.active:before,
.menuLink.active:after {
    opacity: 1; 
}
menuLinkInner {
    position: relative;
    svg,
    .menuLinkText {
        position: relative;
        z-index: 2;
    }
}
.menuLinkInner:before {
    position: absolute;
    background: linear-gradient(237.13deg, rgba(39, 27, 58, 0.32) 1.37%, rgba(123, 134, 158, 0.32) 99.24%);
    opacity: 0;
    transition: 300ms opacity ease-in-out;
    border-radius: 6px;
    width: 96px;
    height: 96px;
    left: 0;
    top 0;
    content: '';
    z-index: 1;
}
`;
//className={`icon-image ${selected ? "select" : ""}`}
const NavigationButton = ({ selected, onClick, drawerWidth, showNotif, buttonText, icoSVG }) => {
  return (
    <Style onClick={onClick}>
      <div className={`menuLink ${selected ? "active" : ""}`}>
        <div className={"menuLinkInner"}>
          {icoSVG}
          {showNotif ? (
            <div className="relative-pos">
              <span className="sec">New</span>
            </div>
          ) : (
            ""
          )}
          <div className={"menuLinkText"} dangerouslySetInnerHTML={{ __html: buttonText }} />
        </div>
      </div>
      {drawerWidth === "auto" ? (
        <div className="icon-text">
          <p className="primary">{buttonText}</p>
        </div>
      ) : (
        ""
      )}
    </Style>
  );
};

export default NavigationButton;
