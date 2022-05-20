import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import React, { useState } from "react";
import { Rnd } from "react-rnd";
import Keyboard104 from "../Keyboard104";

import { useWindowSize } from "@renderer/hooks/useWindowSize";

export const FloatingKeyPicker = (props) => {
  const { sidebarWidth, onKeyChange, keymap, currentLayer, currentKeyIndex } =
    props;

  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(260);
  const [x, setX] = useState((window.innerWidth - sidebarWidth) / 2 - 400);
  const [y, setY] = useState(window.innerHeight - 308);
  const [lastWindowSize, setLastWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const theme = useTheme();
  const key = keymap.custom[currentLayer][currentKeyIndex];

  const windowSize = useWindowSize();

  if (windowSize.height && windowSize.height != lastWindowSize.height) {
    const new_y = y + (windowSize.height - lastWindowSize.height);
    if (new_y > 0 && new_y < window.innerHeight - 308) {
      setY(new_y);
    }
    setLastWindowSize(windowSize);
  }

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
