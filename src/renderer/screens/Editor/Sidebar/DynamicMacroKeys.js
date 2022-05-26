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

import Macros from "@api/macros";
import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CategorySelector from "../components/CategorySelector";

import { KeymapDB } from "@api/keymap";

const DynamicMacroKeys = (props) => {
  const { currentKey } = props;
  const { t } = useTranslation();

  if (!props.macros) return null;

  const m = new Macros();
  const db = new KeymapDB();

  const used = m.getStoredSize(props.macros);
  const disabled = currentKey && !db.isInCategory(currentKey, "dynmacros");

  const onClick = () => {
    props.setOpenMacroEditor(true);
  };

  return (
    <CategorySelector
      title={t("editor.sidebar.dynmacros.title")}
      help={t("editor.sidebar.dynmacros.help")}
      category="dynmacros"
      currentKey={currentKey}
      onKeyChange={props.onKeyChange}
    >
      {props.macros.storageSize > 0 && (
        <Stack spacing={2}>
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Typography variant="body2">
              {t("editor.sidebar.dynmacros.usage_overview.label")}{" "}
              <strong>
                {t("editor.sidebar.dynmacros.usage_overview.usage", {
                  used: used,
                  size: props.macros.storageSize,
                })}
              </strong>{" "}
              {t("editor.sidebar.dynmacros.usage_overview.bytes")}
            </Typography>
          </Paper>
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
        </Stack>
      )}
    </CategorySelector>
  );
};

export { DynamicMacroKeys as default };
