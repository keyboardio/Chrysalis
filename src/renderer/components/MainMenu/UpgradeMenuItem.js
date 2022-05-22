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

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import getLatestVersion from "@renderer/utils/getLatestVersion";
import { version } from "@root/package.json";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function UpgradeMenuItem() {
  const [latestVersion, setLatestVersion] = useState(null);
  const { t } = useTranslation();

  if (!latestVersion) {
    getLatestVersion().then((v) => {
      setLatestVersion(v);
    });
    return null;
  }
  if (latestVersion.version <= version) return null;

  return (
    <React.Fragment>
      <Divider />
      <ListItem button component="a" href={latestVersion.url}>
        <ListItemText
          primary={t("app.menu.upgradeAvailable")}
          secondary={latestVersion.version}
        />
      </ListItem>
    </React.Fragment>
  );
}

export { UpgradeMenuItem as default };
