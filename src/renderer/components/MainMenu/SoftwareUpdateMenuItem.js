// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
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

import React, { Fragment } from "react";
import i18n from "../../i18n";
import { GoCloudDownload } from "react-icons/go";

export default function SoftwareUpdateMenuItem({
  onClick,
  className,
  classIcon,
  drawerWidth
}) {
  return (
    <div onClick={onClick} className={"item-list"}>
      <div className="icon-item">
        <GoCloudDownload className={"icon-image"} />
      </div>
      {drawerWidth === "auto" ? (
        <div className="icon-text">
          <p className="primary">{i18n.app.menu.softwareUpdate}</p>
          <p className="secondary">{i18n.app.menu.comingSoon}</p>
        </div>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
}
