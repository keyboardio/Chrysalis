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

import React, { useState } from "react";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import i18n from "../../i18n";
import { version } from "../../../../package.json";
import getLatestVersion from "../../utils/getLatestVersion";

function UpgradeMenuItem() {
  const [latestVersion, setLatestVersion] = useState(null);

  if (!latestVersion) {
    getLatestVersion().then(v => {
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
          primary={i18n.t("app.menu.upgradeAvailable")}
          secondary={latestVersion.version}
        />
      </ListItem>
    </React.Fragment>
  );
}

export { UpgradeMenuItem as default };
