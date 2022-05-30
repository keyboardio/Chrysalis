// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import Focus from "@api/focus";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { getStaticPath } from "@renderer/config";
import fs from "fs";
import path from "path";
import React from "react";
import { useTranslation } from "react-i18next";
import { loadLayout } from "./LoadLayout";

export const LibraryImport = (props) => {
  const { t } = useTranslation();
  const focus = new Focus();

  const selectLibraryItem = (item) => () => {
    loadFromLibrary(item);
  };

  const loadFromLibrary = (layoutName) => {
    const { vendor, product } = focus.focusDeviceDescriptor.info;
    const cVendor = vendor.replace("/", "");
    const cProduct = product.replace("/", "");
    const layoutPath = (layout) =>
      path.join(getStaticPath(), cVendor, cProduct, `layouts/${layout}.json`);

    const layoutData = loadLayout(layoutPath(layoutName));

    if (layoutData != null) props.setLayout(layoutName, layoutData);
  };

  const { layoutName } = props;

  const findAvailableLayouts = () => {
    const { vendor, product } = focus.focusDeviceDescriptor.info;
    const cVendor = vendor.replace("/", "");
    const cProduct = product.replace("/", "");
    const layoutDirPath = path.join(
      getStaticPath(),
      cVendor,
      cProduct,
      "layouts"
    );

    try {
      const layouts = fs
        .readdirSync(layoutDirPath, {
          encoding: "utf-8",
        })
        .map((name) => path.basename(name, ".json"))
        .sort();
      return layouts;
    } catch (_) {
      return [];
    }
  };

  const library = findAvailableLayouts();
  if (library.length == 0) return null;

  const layouts = library.map((name) => {
    const label = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <MenuItem
        selected={layoutName == name}
        value={name}
        key={`library-item-${name}`}
        onClick={selectLibraryItem(name)}
      >
        {label}
      </MenuItem>
    );
  });

  return (
    <Box sx={{ sb: 2 }}>
      <Typography variant="h5">
        {t("editor.sharing.loadFromLibrary")}
      </Typography>
      <MenuList>{layouts}</MenuList>

      <Divider />
    </Box>
  );
};
