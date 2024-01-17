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
import FKPCCategorySelector from "../components/FKPCategorySelector";

const SpaceCadetKeys = (props) => {
  const { t } = useTranslation();
  const pluginVisible = usePluginVisibility("SpaceCadet");
  if (!pluginVisible) return null;

  return (
    <FKPCCategorySelector
      title={t("editor.sidebar.spacecadet.title")}
      help={t("editor.sidebar.spacecadet.help")}
      category="spacecadet"
      currentKey={props.currentKey}
      onKeyChange={props.onKeyChange}
    />
  );
};

export { SpaceCadetKeys as default };
