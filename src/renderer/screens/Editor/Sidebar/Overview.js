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
import CropSquareIcon from "@mui/icons-material/CropSquare";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useTranslation } from "react-i18next";
import { LayerNameInput } from "./LayerNameInput";

const Overview = (props) => {
  const { t } = useTranslation();

  const selectLayer = (index) => () => {
    props.setLayer(index);
  };

  const { keymap, selectedKey, selectedLed, layer, colormap, layerNames } = props;
  const db = new KeymapDB();

  const componentWidth = 200; // Assume a fixed width for the component
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const calculatePosition = () => {
      const screenWidth = window.innerWidth;
      const xPosition = screenWidth - componentWidth - 20; // 20px margin from the right edge
      setDefaultPosition({ x: xPosition, y: 60 }); // Adjust `y` as needed for top margin
    };

    // Calculate initial position
    calculatePosition();

    // Optional: Recalculate on window resize
    window.addEventListener("resize", calculatePosition);

    // Cleanup listener
    return () => window.removeEventListener("resize", calculatePosition);
  }, [componentWidth]); // Depend on componentWidth if dynamic

  const usedLayers = keymap.custom;
  const showColors = colormap && colormap.palette.length > 0;

  // Update the position on drag stop
  const handleStop = (e, data) => {
    setDefaultPosition({ x: data.x, y: data.y });
  };

  function HamburgerMenu(index) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleMenuItemCopy = () => {
      props.copyLayer(index);
      handleClose(); // Close the menu after selection
    };
    const handleMenuItemPaste = () => {
      props.pasteLayer(index);
      handleClose(); // Close the menu after selection
    };

    return (
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            opacity: open ? 1 : 0.1, // Full opacity when open, faded otherwise
            transition: "opacity 0.3s ease", // Smooth transition for the opacity
            "&:hover": {
              opacity: 1, // Full opacity on hover
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          {props.copyLayer && (
            <MenuItem onClick={() => handleMenuItemCopy()}>{t("editor.overview.copyLayer")}</MenuItem>
          )}
          {props.pasteLayer && (
            <MenuItem disabled={!props.hasCopiedLayer()} onClick={() => handleMenuItemPaste()}>
              {t("editor.overview.pasteLayer")}
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  }

  const config = usedLayers.map((layerData, index) => {
    const label = db.format(layerData[selectedKey], { keycapSize: "full", layerNames: props.layerNames });
    let colorWidget;

    if (showColors && colormap.colorMap.length > index) {
      const colorIndex = colormap.colorMap[index][selectedLed];
      const color = colormap.palette[colorIndex];

      colorWidget = (
        <TableCell size="small" padding="none" sx={{ width: (theme) => theme.spacing(3) }}>
          <Avatar
            sx={{ width: (theme) => theme.spacing(3), height: (theme) => theme.spacing(3) }}
            variant="square"
            style={{ color: color?.rgb, background: color?.rgb }}
          >
            <CropSquareIcon />
          </Avatar>
        </TableCell>
      );
    }

    return (
      <TableRow
        key={`key-config-layer-${index}`}
        selected={layer == index}
        onClick={() => {
          props.setLayer(index);
        }}
        sx={{ cursor: "pointer", alignItems: "baseline" }}
      >
        <TableCell size="small" sx={{ pl: "1rem" }} align="left">
          {props.setLayerName ? (
            <LayerNameInput value={layerNames.names[index]} index={index} setLayerName={props.setLayerName} />
          ) : (
            <Typography sx={{ fontSize: "0.8rem" }}>{layerNames.names[index]}</Typography>
          )}
        </TableCell>
        <TableCell size="small" padding="none">
          <Typography sx={{ fontSize: "0.8rem" }}>
            {label.hint} {label.main}
          </Typography>
        </TableCell>
        {showColors && colorWidget}
        <TableCell size="small" sx={{ pl: 0, pr: "0.5rem", py: 0 }}>
          {HamburgerMenu(index)}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Draggable
      sx={{ position: "fixed" }}
      onStop={handleStop}
      handle=".overview-header"
      defaultPosition={defaultPosition}
    >
      <Box sx={{ overflow: "visible" }}>
        <Box
          className="overview-header"
          sx={{
            width: "100%",
            height: 4,
            backgroundColor: "darkgray",
            borderRadius: "2px",
          }}
        ></Box>
        <TableContainer component={Paper} sx={{ m: 0 }}>
          <Table size="small">
            <Tooltip title={t("editor.overview.help")}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: "1rem", py: 0 }} size="small" width="3" align="left">
                    <Typography sx={{ fontSize: "0.8rem" }}>{t("components.layerRaw")}</Typography>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Typography sx={{ fontSize: "0.8rem" }}>
                      {t("editor.overview.key", { index: selectedKey })}
                    </Typography>
                  </TableCell>
                  {showColors && (
                    <TableCell size="small" padding="none" sx={{ width: (theme) => theme.spacing(3) }}>
                      <Typography sx={{ fontSize: "0.8rem" }}>{t("editor.overview.color")}</Typography>
                    </TableCell>
                  )}
                  <TableCell size="small" sx={{ pl: 0, pr: "1rem", py: 0 }} />
                </TableRow>
              </TableHead>
            </Tooltip>
            <TableBody>{config}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Draggable>
  );
};

export { Overview as default };
