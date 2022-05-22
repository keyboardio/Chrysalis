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

import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { useWindowSize } from "@renderer/hooks/useWindowSize";
import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Keyboard104 from "../Keyboard104";

const fkp_channel = new BroadcastChannel("floating-key-picker");

export const FloatingKeyPicker = (props) => {
  const { sidebarWidth, onKeyChange, keymap } = props;
  const key = props.currentKey;

  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(260);
  const [x, setX] = useState((window.innerWidth - sidebarWidth) / 2 - 400);
  const [y, setY] = useState(window.innerHeight - 308);
  const [lastWindowSize, setLastWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const theme = useTheme();

  const windowSize = useWindowSize();

  if (windowSize.height && windowSize.height != lastWindowSize.height) {
    const new_y = y + (windowSize.height - lastWindowSize.height);
    if (new_y > 0 && new_y < window.innerHeight - 308) {
      setY(new_y);
    }
    setLastWindowSize(windowSize);
  }

  useEffect(() => {
    fkp_channel.onmessage = (event) => {
      if (event.data == "show") {
        setVisible(true);
      } else if (event.data == "hide") {
        setVisible(false);
      }
    };
  });

  if (!key) return null;
  if (!visible) return null;

  return (
    <Rnd
      size={{ width: width, height: height }}
      position={{ x: x, y: y }}
      onDragStop={(e, d) => {
        setX(d.x);
        setY(d.y);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setWidth(ref.style.width);
        setHeight(ref.style.height);
        console.log(position);
      }}
      style={{
        overflow: "hidden",
        zIndex: theme.zIndex.appBar - 50,
      }}
      minWidth={400}
      lockAspectRatio={true}
      bounds="window"
    >
      <Box
        boxShadow={3}
        sx={{
          bgcolor: "background.paper",
          p: 1,
          m: 1,
        }}
      >
        <Keyboard104
          onKeySelect={onKeyChange}
          currentKeyCode={key.baseCode || key.code}
          keymap={keymap}
        />
      </Box>
    </Rnd>
  );
};
