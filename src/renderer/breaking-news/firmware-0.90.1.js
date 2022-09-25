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

import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import openURL from "@renderer/utils/openURL";
import React from "react";
import { useTranslation } from "react-i18next";

import { BreakingNews } from "@renderer/components/BreakingNews";

export const Firmware0_90_1 = (props) => {
  const { t } = useTranslation();
  const trn = (key) => t(`breakingNews.firmware0_90_1.${key}`);

  const hasModel100 = props?.devices?.some((device) => {
    const info = device.focusDeviceDescriptor?.info;

    return info?.vendor == "Keyboardio" && info?.product == "Model100";
  });

  if (!hasModel100) return null;

  const openInstructions = () => {
    openURL(
      "https://community.keyboard.io/t/model-100-firmware-update-to-fix-corruption-issues/5553"
    )();
  };

  return (
    <BreakingNews tag="firmware.0.90.1">
      <AlertTitle>{trn("title")}</AlertTitle>
      <Typography component="p" gutterBottom>
        {trn("description")}
      </Typography>
      <Button variant="contained" color="warning" onClick={openInstructions}>
        {trn("button")}
      </Button>
    </BreakingNews>
  );
};
