// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const UpdateDescription = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Typography component="p" gutterBottom>
          {t("firmwareUpdate.description")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
    </>
  );
};

export default UpdateDescription;
