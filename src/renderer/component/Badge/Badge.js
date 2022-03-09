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

const Style = Styled.div`	
.badge {
	border-radius: 4px;
	font-size: 13px;
	font-weight: 600;
	padding: 6px 12px;
	border: 1px solid ${({ theme }) => theme.colors.gray500};
}
`;
const Badge = ({ content, size, style, className }) => {
  return (
    <Style className={className}>
      <div className={`badge ${size && size} ${style && style}`}>
        <span dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Style>
  );
};

export default Badge;
