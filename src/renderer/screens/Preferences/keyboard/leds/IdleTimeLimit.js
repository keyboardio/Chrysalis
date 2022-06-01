// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
 * Copyright (C) 2020  DygmaLab SE.
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
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const IdleTimeLimit = (props) => {
  const { t } = useTranslation();
  const { onSaveChanges } = props;

  const [ledIdleTimeLimit, setLedIdleTimeLimit] = useState(0);

  const initialize = async (focus) => {
    let limit = await focus.command("idleleds.time_limit");
    limit = parseInt(limit);

    setLedIdleTimeLimit(limit);
  };
  const loaded = usePluginEffect(initialize);

  const onChange = async (event) => {
    const limit = event.target.checked;
    await setLedIdleTimeLimit(limit);
    await onSaveChanges("idleleds.time_limit", limit);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Typography variant="body1">
          {t("preferences.keyboard.led.idle.label")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("preferences.keyboard.led.idle.help")}
        </Typography>
      </Box>
      <span style={{ flexGrow: 1 }} />
      {loaded ? (
        <FormControl size="small">
          <Select
            onChange={onChange}
            value={ledIdleTimeLimit}
            sx={{ width: "10em" }}
          >
            <MenuItem value={0}>
              {t("preferences.keyboard.led.idle.disabled")}
            </MenuItem>
            <MenuItem value={60}>
              {t("preferences.keyboard.led.idle.oneMinute")}
            </MenuItem>
            <MenuItem value={120}>
              {t("preferences.keyboard.led.idle.twoMinutes")}
            </MenuItem>
            <MenuItem value={180}>
              {t("preferences.keyboard.led.idle.threeMinutes")}
            </MenuItem>
            <MenuItem value={240}>
              {t("preferences.keyboard.led.idle.fourMinutes")}
            </MenuItem>
            <MenuItem value={300}>
              {t("preferences.keyboard.led.idle.fiveMinutes")}
            </MenuItem>
            <MenuItem value={600}>
              {t("preferences.keyboard.led.idle.tenMinutes")}
            </MenuItem>
            <MenuItem value={900}>
              {t("preferences.keyboard.led.idle.fifteenMinutes")}
            </MenuItem>
            <MenuItem value={1200}>
              {t("preferences.keyboard.led.idle.twentyMinutes")}
            </MenuItem>
            <MenuItem value={1800}>
              {t("preferences.keyboard.led.idle.thirtyMinutes")}
            </MenuItem>
            <MenuItem value={3600}>
              {t("preferences.keyboard.led.idle.sixtyMinutes")}
            </MenuItem>
          </Select>
        </FormControl>
      ) : (
        <Skeleton variant="rectangle" width="10em" height={40} />
      )}
    </Box>
  );
};

export { IdleTimeLimit as default };
