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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CategorySelector from "../components/CategorySelector";

import { KeymapDB } from "@api/keymap";

const MacroKeys = (props) => {
  const { keymap, selectedKey, layer, onKeyChange, currentKey } = props;
  const { t } = useTranslation();
  const pluginVisible = usePluginVisibility("Macros");
  if (!pluginVisible) return null;

  const db = new KeymapDB();

  const disabled = currentKey && !db.isInCategory(currentKey, "macros");

  const onClick = () => {
    props.setOpenMacroEditor(true);
  };

  return (
    <CategorySelector
      title={t("editor.sidebar.macros.title")}
      help={t("editor.sidebar.macros.help")}
      category="macros"
      keymap={keymap}
      selectedKey={selectedKey}
      layer={layer}
      onKeyChange={onKeyChange}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" disabled={disabled} onClick={onClick}>
          {t("editor.macros.edit")}
        </Button>
      </Box>
    </CategorySelector>
  );
};

export { MacroKeys as default };
