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

import KeymapDB from "@api/focus/keymap/db";
import React from "react";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import KeyButton from "../components/KeyButton";
import { SectionTitle } from "@renderer/components/SectionTitle";
const db = new KeymapDB();

const VolumeKeys = (props) => {
  const { t } = useTranslation();

  const keys = [
    db.lookup(18658), // mute
    db.lookup(18665), // up
    db.lookup(18666), // down
  ];

  const keyButtons = keys.map((button, index) => {
    return <KeyButton key={`consumer-volume-${index}`} onKeyChange={props.onKeyChange} keyObj={button} noHint />;
  });

  return (
    <>
      <SectionTitle>{t("editor.sidebar.consumer.volume")}</SectionTitle>
      <Box sx={{ display: "flex", flexDirection: "column", padding: 0 }}>{keyButtons}</Box>
    </>
  );
};
export default VolumeKeys;
