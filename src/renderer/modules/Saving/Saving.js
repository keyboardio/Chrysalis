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
import { RegularButton } from "../../component/Button";

const Style = Styled.div`

`;
const Saving = ({ saveContext, cancelContext, inContext }) => {
  return (
    <Style className="savingButtons">
      <RegularButton onClick={cancelContext} buttonText={i18n.app.cancelPending.button} style="outline" disabled={!inContext} />
      <RegularButton onClick={saveContext} buttonText={i18n.components.save.button} style="primary" disabled={!inContext} />
    </Style>
  );
};

export default Saving;
