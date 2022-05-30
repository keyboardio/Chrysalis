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

import React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";

const PreferenceSection = (props) => {
  const { t } = useTranslation();

  const description = t("preferences." + props.name + ".description", "");

  return (
    <>
      <Divider textAlign="left" sx={{ my: 2 }}>
        {t("preferences." + props.name + ".label")}
      </Divider>
      {description && (
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
      )}
      <Box sx={{ my: 2 }}>{props.children}</Box>
    </>
  );
};

export { PreferenceSection as default };
