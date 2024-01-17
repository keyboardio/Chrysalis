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
import FKPCategorySelector from "../components/FKPCategorySelector";

const LEDKeys = (props) => {
  const { t } = useTranslation();
  if (!props.colormap || props.colormap.palette.length == 0) {
    return null;
  }

  return (
    <FKPCategorySelector
      title={t("editor.sidebar.ledcontrol.title")}
      help={t("editor.sidebar.ledcontrol.help")}
      category="ledkeys"
      currentKey={props.currentKey}
      onKeyChange={props.onKeyChange}
    />
  );
};

export { LEDKeys as default };
