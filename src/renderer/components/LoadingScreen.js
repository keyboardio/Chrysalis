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

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import * as path from "path";
import { getStaticPath } from "@renderer/config";
import React from "react";
import { useTranslation } from "react-i18next";

function LoadingScreen(props) {
  const logoPath = path.join(getStaticPath(), "/logo.png");

  const spin = keyframes`
  from {
    transform: rotate(0deg);
    transform-origin: center center;
  }
  to {
    transform: rotate(360deg);
    transform-origin: center center;
  }
`;

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 1,
        mx: "auto",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 5,
          mx: "auto",
          display: "inline-flex",
          animation: `${spin} 5s infinite linear`,
        }}
      >
        <img src={logoPath} alt={t("components.logo.altText")} />
      </Box>
      <Box sx={{ display: "inline-flex", mx: "auto" }}>
        <Typography component="h2" variant="h2" sx={{ p: 5 }}>
          {t("components.loading")}
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingScreen;
