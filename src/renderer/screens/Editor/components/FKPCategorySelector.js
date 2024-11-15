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
import FormHelperText from "@mui/material/FormHelperText";
import Tooltip from "@renderer/components/Tooltip";
import { SectionTitle } from "@renderer/components/SectionTitle";
import usePluginAvailable from "@renderer/hooks/usePluginVisibility";
import React from "react";
import { useTranslation } from "react-i18next";
import KeyButtonList from "../components/KeyButtonList";

const db = new KeymapDB();

const FKPCategorySelector = (props) => {
  const { t } = useTranslation();
  let tooltip;
  let disabled = props.disabled;
  const pluginUnavailable = !usePluginAvailable(props.plugin);
  if (pluginUnavailable && props.plugin) {
    tooltip = t("editor.plugin_unavailable");
    disabled = true;
  } else if (props.disabledInMacroEditor && props.macroEditorOpen) {
    tooltip = t("editor.plugin_unavailable_for_macros");
    disabled = true;
  }
  let title = props.title;
  if (!title && props.category) {
    title = t("editor.sidebar." + props.category + ".title");
  }
  let help = props.help;
  if (!help && props.category) {
    help = t("editor.sidebar." + props.category + ".help");
  }

  // Generate keys from keyCodes
  const keys = props.keyCodes?.map((code) => db.lookup(code)) || props.keys || db.selectCategory(props.category);
  return (
    <React.Fragment>
      <Tooltip title={tooltip}>
        <>
          {title && <SectionTitle>{title}</SectionTitle>}
          {help && <FormHelperText sx={{ mb: 2 }}> {help} </FormHelperText>}
          {props.children || (
            <KeyButtonList
              keys={keys}
              onKeyChange={props.onKeyChange}
              disabled={disabled}
              showHints={false}
              minButtonWidth={props.minButtonWidth}
            />
          )}
        </>
      </Tooltip>
    </React.Fragment>
  );
};

export { FKPCategorySelector as default };
