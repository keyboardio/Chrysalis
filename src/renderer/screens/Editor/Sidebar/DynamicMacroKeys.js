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
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FKPCategorySelector from "../components/FKPCategorySelector";
import Divider from "@mui/material/Divider";
import Macros from "@api/focus/macros";
import KeymapDB from "@api/focus/keymap/db";

const DynamicMacroKeys = (props) => {
  const { currentKey } = props;
  const { t } = useTranslation();

  if (!props.macros) return null;

  const db = new KeymapDB();

  const used = new Macros().getStoredSize(props.macros);

  return (
    <>
      <FKPCategorySelector
        help={t("editor.sidebar.dynmacros.help")}
        category="dynmacros"
        plugin="DynamicMacros"
        currentKey={currentKey}
        disabledInMacroEditor={true}
        disabled={props.macros.storageSize == 0}
        onKeyChange={props.onKeyChange}
      />
      <Divider orientation="horizontal" flexItem sx={{ my: 2, mx: 3 }} />
      <Grid container>
        <Grid item sm={9} spacing={2}>
          <Paper variant="outlined" sx={{ p: 1, justifyContent: "center", display: "flex" }}>
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
        </Grid>
        <Grid item sm={3}>
          <Button
            variant="contained"
            disabled={currentKey && !db.isInCategory(currentKey, "dynmacros")}
            onClick={() => {
              props.setOpenMacroEditor(true);
            }}
          >
            {t("editor.macros.edit")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export { DynamicMacroKeys as default };
