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

import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { GlobalContext } from "@renderer/components/GlobalContext";

import { useTranslation } from "react-i18next";

const BootloaderWarning = (props) => {
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);

  return (
    <>
      <Alert severity="warning">
        <Typography component="p">{t("firmwareUpdate.bootloaderWarning")}</Typography>
      </Alert>
      <Divider sx={{ my: 2 }} />
    </>
  );
};

export default BootloaderWarning;
