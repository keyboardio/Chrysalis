// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import path from "path";
const fs = require("fs");

import Focus from "@chrysalis-api/focus";

import Button from "@material-ui/core/Button";

import { getStaticPath } from "../../../config";

export default function LoadDefaultKeymap({ loadDefault }) {
  let focus = new Focus();
  const [device] = useState(focus.device);

  const { vendor, product } = device.info;
  const cVendor = vendor.replace("/", "");
  const cProduct = product.replace("/", "");
  const layoutPath = layout =>
    path.join(getStaticPath(), cVendor, cProduct, `${layout}.json`);

  const defaultLayouts = ["Qwerty", "Dvorak", "Colemak"];
  const deviceLayouts = [];

  defaultLayouts.map(layout => {
    const path = layoutPath(layout);
    try {
      fs.accessSync(path);
      deviceLayouts.push({ name: layout, path });
    } catch (err) {
      console.log(`${vendor} ${layout} does not exist`);
    }
  });

  return (
    <div style={{ display: "flex" }}>
      {deviceLayouts.length > 0 && (
        <React.Fragment>
          <h3>Load a default:</h3>
          {deviceLayouts.map(({ name, path }, i) => (
            <Button
              key={name + i}
              color="primary"
              onClick={() => loadDefault(path)}
            >
              {name}
            </Button>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
