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
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "@renderer/components/GlobalContext";
import useEffectOnce from "@renderer/hooks/useEffectOnce";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

const FirmwareVersion = (props) => {
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;

  const [fwVersion, setFwVersion] = useState(null);

  useEffectOnce(() => {
    const fetchData = async () => {
      const v = await activeDevice.focus.command("version");
      if (v) {
        setFwVersion(v);
      } else {
        setFwVersion(t("firmwareUpdate.currentFirmwareVersionUnavailable"));
      }
    };
    fetchData();
  });

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">
        {t("firmwareUpdate.currentFirmwareVersion")}
      </Typography>
      <Typography color="secondary" sx={{ ml: 3 }}>
        {fwVersion || <Skeleton variant="rectangle" width={120} height={24} />}
      </Typography>
    </Box>
  );
};

export default FirmwareVersion;
