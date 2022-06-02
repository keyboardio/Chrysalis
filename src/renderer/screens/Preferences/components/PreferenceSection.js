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
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useTranslation } from "react-i18next";

const PreferenceSection = (props) => {
  const { t } = useTranslation();

  // The goal here is to make <PreferenceSection> usable in contexts where
  // loading makes no sense (because the data is readily available), without
  // having to pass a `loaded={true}` property.
  //
  // We check if the property has been defined, and if not, default to true,
  // otherwise we use the property as specified.
  // prettier-ignore
  const loaded = (props.loaded === undefined) ? true : props.loaded;

  const description = t("preferences." + props.name + ".description", "");

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t("preferences." + props.name + ".label")}
      </Typography>
      <Paper sx={{ p: 2, width: "75%" }}>
        {loaded ? (
          props.children
        ) : (
          <Skeleton variant="rectangle" width="100%" height={80} />
        )}
      </Paper>
    </Box>
  );
};

export { PreferenceSection as default };
