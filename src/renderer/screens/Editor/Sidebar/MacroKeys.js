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
import { useTranslation } from "react-i18next";
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";
import FKPCategorySelector from "../components/FKPCategorySelector";

const MacroKeys = (props) => {
  const { t } = useTranslation();
  const pluginVisible = usePluginVisibility("Macros");
  if (!pluginVisible) return null;

  return (
    <FKPCategorySelector
      title={t("editor.sidebar.macros.title")}
      help={t("editor.sidebar.macros.help")}
      category="macros"
      currentKey={props.currentKey}
      onKeyChange={props.onKeyChange}
    />
  );
};

export { MacroKeys as default };
