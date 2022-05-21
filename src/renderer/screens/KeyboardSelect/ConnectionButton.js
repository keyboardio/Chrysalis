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

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import i18n from "@renderer/i18n";
import React from "react";

export const ConnectionButton = (props) => {
  const disabled = props.disabled;
  const opening = props.opening;
  const connected = props.connected;
  const onKeyboardConnect = props.onKeyboardConnect;
  const onKeyboardDisconnect = props.onKeyboardDisconnect;
  if (connected) {
    return (
      <Button
        disabled={disabled}
        variant="outlined"
        color="secondary"
        onClick={onKeyboardDisconnect}
        sx={{ verticalAlign: "bottom", marginLeft: "auto", marginRight: 3 }}
      >
        {i18n.t("keyboardSelect.disconnect")}
      </Button>
    );
  } else {
    return (
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        onClick={onKeyboardConnect}
        sx={{ verticalAlign: "bottom", marginLeft: "auto", marginRight: 3 }}
      >
        {opening ? (
          <CircularProgress color="secondary" size={16} />
        ) : (
          i18n.t("keyboardSelect.connect")
        )}
      </Button>
    );
  }
};
