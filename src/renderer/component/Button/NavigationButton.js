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
import LightAccent from "../../../../static/dark/light-accent--lg.png";

const Style = Styled.div`
.menuLink {
    width: 96px;
    height: 96px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    text-align: center;
    transition: 250ms color ease-in-out;
    text-decoration: none;
    .menuLinkText {
        font-size: 12px;
        font-weight: 600;
        flex: 0 0 100%;
    }
    .badge {
        position: absolute;
        right:3px;
        top:3px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        z-index: 3;
        &.badge-primary {
            background: var(--brand-primary);
            border-radius: 16px;
        }
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
    transition: 250ms opacity ease-in-out;
    z-index: 2;

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
    transition: 250ms opacity ease-in-out;
    z-index: 2;
}
.menuLink:hover {   
    text-decoration: none;
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
.menuLink.active:before,
.menuLink.active:after {
    opacity: 1; 
}
.menuLinkInner {
    position: relative;
    padding: 8px 6px;
    width: 96px;
    height: 96px;
    svg,
    .menuLinkText {
        position: relative;
        z-index: 2;
    }
}
.menuLinkInner:before {
    position: absolute;
    opacity: 0;
    transition: 250ms opacity ease-in-out;
    border-radius: 6px;
    width: 96px;
    height: 96px;
    left: 0;
    top 0;
    content: '';
    z-index: 1;
}

.menuLink {
    &.theme-dark {
        color: var(--gray-300);
        svg {
            color: var(--gray-50);
        }
        &:hover,
        &.active {
            color: var(--gray-25);
        }
        .menuLinkInner:before {
            background: linear-gradient(237.13deg, rgba(39, 27, 58, 0.32) 1.37%, rgba(123, 134, 158, 0.32) 99.24%);
        }
    }
    &.theme-light {
        color: var(--gray-200);
        svg {
            color: var(--gray-400);
        }
        &:hover,
        &.active {
            color: var(--purple-300);
        }
        &:hover svg{
            color: var(--purple-300);
        }
        &.active svg {
            color: var(--brand-secondary);
        }
        .menuLinkInner:before {
            background: linear-gradient(236.53deg, #F0F2F4 1.37%, #D8DBF1 117.2%);
        }
        &.active:after {
            opacity: 0.5; 
        }
    }
}
`;
//className={`icon-image ${selected ? "select" : ""}`}
const NavigationButton = ({ selected, onClick, showNotif, buttonText, icoSVG, theme }) => {
  return (
    <Style onClick={onClick}>
      <div className={`menuLink ${theme} ${selected ? "active" : ""}`}>
        <div className={"menuLinkInner"}>
          {icoSVG}
          {showNotif ? <div className="badge badge-primary">{i18n.app.menu.badgeNew}</div> : ""}
          <div className={"menuLinkText"} dangerouslySetInnerHTML={{ __html: buttonText }} />
        </div>
      </div>
    </Style>
  );
};

export default NavigationButton;
