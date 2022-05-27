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
import React from "react";
import Collapsible from "../components/Collapsible";
import KeyButtonList from "../components/KeyButtonList";

const db = new KeymapDB();

const CategorySelector = (props) => {
  const onKeyChange = (keyCode) => {
    props.onKeyChange(keyCode);
  };

  return (
    <React.Fragment>
      <Collapsible
        expanded={db.isInCategory(props.currentKey.code, props.category)}
        title={props.title}
        help={props.help}
      >
        {props.children}
        <KeyButtonList
          keys={db.selectCategory(props.category)}
          onKeyChange={onKeyChange}
          showHints={false}
        />
      </Collapsible>
    </React.Fragment>
  );
};

export { CategorySelector as default };
