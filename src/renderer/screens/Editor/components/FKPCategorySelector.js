// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import KeymapDB from "@api/focus/keymap/db";
import { SectionTitle } from "@renderer/components/SectionTitle";
import React from "react";
import KeyButtonList from "../components/KeyButtonList";
import FormHelperText from "@mui/material/FormHelperText";

const db = new KeymapDB();

const FKPCategorySelector = (props) => {
  return (
    <React.Fragment>
      {props.title && <SectionTitle>{props.title}</SectionTitle>}

      {props.help && (
        <FormHelperText
          sx={{
            mb: 2,
          }}
        >
          {props.help}
        </FormHelperText>
      )}
      {props.children}
      <KeyButtonList keys={db.selectCategory(props.category)} onKeyChange={props.onKeyChange} showHints={false} />
    </React.Fragment>
  );
};

export { FKPCategorySelector as default };
