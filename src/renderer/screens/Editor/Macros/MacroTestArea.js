// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import Focus from "@api/focus";

const MacroTestArea = (props) => {
  const { t } = useTranslation();

  const onClick = async (event) => {
    const d = document.getElementById("macro-test-area");
    d.focus();
    d.value = "";

    const focus = new Focus();
    await focus.command("macros.trigger", props.macroIndex);
    event.preventDefault();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <TextField
          placeholder={t("editor.macros.test.placeholder")}
          variant="outlined"
          size="small"
          fullWidth
          id="macro-test-area"
        />
        <Button onClick={onClick}>{t("editor.macros.test.button")}</Button>
      </Stack>
    </Box>
  );
};

export default MacroTestArea;
