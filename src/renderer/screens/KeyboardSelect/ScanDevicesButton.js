// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import Button from "@mui/material/Button";
import React from "react";
import i18n from "../../i18n";

export const ScanDevicesButton = (props) => {
  const scanDevices = props.scanDevices;
  const scanFoundDevices = props.scanFoundDevices;
  const foundDevices = props.foundDevices;
  return (
    <Button
      variant={foundDevices ? "outlined" : "contained"}
      color={foundDevices ? "secondary" : "primary"}
      onClick={scanFoundDevices ? null : scanDevices}
    >
      {i18n.t("keyboardSelect.scan")}
    </Button>
  );
};
