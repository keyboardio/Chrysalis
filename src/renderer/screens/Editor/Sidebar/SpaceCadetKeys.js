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

import React from "react";
import i18n from "i18next";

import CategorySelector from "@renderer/screens/Editor/components/CategorySelector";

const SpaceCadetKeys = (props) => {
  const { keymap, selectedKey, layer, onKeyChange } = props;

  return (
    <CategorySelector
      title={i18n.t("editor.sidebar.spacecadet.title")}
      help={i18n.t("editor.sidebar.spacecadet.help")}
      category="spacecadet"
      keymap={keymap}
      selectedKey={selectedKey}
      layer={layer}
      onKeyChange={onKeyChange}
    />
  );
};

export { SpaceCadetKeys as default };
