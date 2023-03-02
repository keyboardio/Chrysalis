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

import FormControlLabel from "@mui/material/FormControlLabel";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Switch from "@mui/material/Switch";
import { useTranslation } from "react-i18next";

const PreferenceSwitch = (props) => {
  const { t } = useTranslation();

  // The goal here is to make <PreferenceSwitch> usable in contexts where
  // loading makes no sense (because the data is readily available), without
  // having to pass a `loaded={true}` property.
  //
  // We check if the property has been defined, and if not, default to true,
  // otherwise we use the property as specified.
  // prettier-ignore
  const loaded = (props.loaded === undefined) ? true : props.loaded;

  const SwitchLabel = (props) => {
    const secondary = t("preferences." + props.option + ".help", "");
    return (
      <ListItem disablePadding>
        <ListItemText
          primary={t("preferences." + props.option + ".label")}
          secondary={secondary}
        />
      </ListItem>
    );
  };

  return (
    <FormControlLabel
      sx={{
        alignItems: "start",
        display: "flex",
        mx: 0,
      }}
      control={
        loaded ? (
          <Switch checked={props.checked || false} onChange={props.onChange} />
        ) : (
          <Skeleton variant="rectangle" width={58} height={38} />
        )
      }
      labelPlacement="start"
      label={<SwitchLabel option={props.option} />}
      disableTypography
    />
  );
};

export { PreferenceSwitch as default };
