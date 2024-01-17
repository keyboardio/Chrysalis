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
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import KeyButton from "../components/KeyButton";
import { SectionTitle } from "@renderer/components/SectionTitle";
const db = new KeymapDB();

const MediaKeys = (props) => {
  const { t } = useTranslation();

  const keys = [
    db.lookup(18614), // prev
    db.lookup(18613), // next track
    db.lookup(18615), // stop
    db.lookup(18637), // play/pause
  ];

  const keyButtons = keys.map((button, index) => {
    return <KeyButton key={`consumer-media-${index}`} onKeyChange={props.onKeyChange} keyObj={button} noHint />;
  });

  return (
    <>
      <SectionTitle>Music</SectionTitle>
      <Stack direction="column">{keyButtons}</Stack>
    </>
  );
};

export default MediaKeys;
