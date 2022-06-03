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
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LayoutSharing from "./LayoutSharing";

const Overview = (props) => {
  const [showAll, setShowAll] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { t } = useTranslation();

  const selectLayer = (index) => () => {
    props.setLayer(index);
  };

  const findLastUsedLayer = () => {
    let lastUsedLayer = 0;
    const { keymap } = props;

    for (let index = 0; index < keymap.custom.length; index++) {
      const layer = keymap.custom[index];
      for (let keyIdx = 0; keyIdx < layer.length; keyIdx++) {
        if (layer[keyIdx].code != db.constants.codes.EMPTY) {
          lastUsedLayer = index;
          break;
        }
      }
    }

    return lastUsedLayer;
  };

  const toggleAllLayers = () => {
    setShowAll(!showAll);
  };

  if (props.macroEditorOpen) return null;

  const { keymap, selectedKey, selectedLed, layer, colormap } = props;
  const db = new KeymapDB();

  const lastUsedLayer = findLastUsedLayer();
  let usedLayers;

  if (showAll) {
    usedLayers = keymap.custom;
  } else {
    usedLayers = keymap.custom.slice(0, lastUsedLayer + 1);
  }

  const config = usedLayers.map((layerData, index) => {
    const label = db.format(layerData[selectedKey], "full");
    let colorWidget;
    if (colormap && colormap.palette.length > 0) {
      const colorIndex = colormap.colorMap[index][selectedLed];
      const color = colormap.palette[colorIndex];

      colorWidget = (
        <Avatar
          sx={{
            width: (theme) => theme.spacing(3),
            height: (theme) => theme.spacing(3),
          }}
          variant="square"
          style={{
            color: color?.rgb,
            background: color?.rgb,
          }}
        >
          <CropSquareIcon />
        </Avatar>
      );
    }

    return (
      <TableRow
        key={`key-config-layer-${index}`}
        selected={layer == index}
        onClick={selectLayer(index)}
        sx={{ cursor: "pointer" }}
      >
        <TableCell size="small" align="left">
          #{index}
        </TableCell>
        <TableCell>
          {label.hint} {label.main}
        </TableCell>
        {colormap && colormap.palette.length > 0 && (
          <TableCell>{colorWidget}</TableCell>
        )}
      </TableRow>
    );
  });

  const footer = lastUsedLayer + 1 < keymap.custom.length && (
    <TableFooter>
      <TableRow>
        <TableCell
          colSpan={colormap && colormap.palette.length > 0 ? 3 : 2}
          align="right"
        >
          <Button onClick={() => setShowAll(!showAll)}>
            {showAll
              ? t("editor.sidebar.overview.hideEmptyLayers")
              : t("editor.sidebar.overview.showEmptyLayers")}
          </Button>
        </TableCell>
      </TableRow>
    </TableFooter>
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <Tooltip title={t("editor.sidebar.overview.help")}>
            <TableHead>
              <TableRow>
                <TableCell size="small">{t("components.layerRaw")}</TableCell>
                <TableCell>
                  {t("editor.sidebar.overview.key", {
                    index: selectedKey,
                  })}
                </TableCell>
                {colormap && colormap.palette.length > 0 && (
                  <TableCell>{t("editor.sidebar.overview.color")}</TableCell>
                )}
              </TableRow>
            </TableHead>
          </Tooltip>
          <TableBody>{config}</TableBody>
          {footer}
        </Table>
      </TableContainer>
      <Button
        onClick={() => setDialogOpen(true)}
        color="secondary"
        variant="outlined"
      >
        {t("editor.sidebar.overview.sharing")}
      </Button>
      <LayoutSharing
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        keymap={keymap}
        colormap={colormap}
        layer={layer}
        onKeymapChange={props.onKeymapChange}
        onPaletteChange={props.onPaletteChange}
        onColormapChange={props.onColormapChange}
      />
    </Box>
  );
};

export { Overview as default };
