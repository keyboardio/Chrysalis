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
import { LayerNameInput } from "./LayerNameInput";

const Overview = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { t } = useTranslation();

  const selectLayer = (index) => () => {
    props.setLayer(index);
  };

  if (props.macroEditorOpen) return null;

  const { keymap, selectedKey, selectedLed, layer, colormap, layerNames } = props;
  const db = new KeymapDB();

  const usedLayers = keymap.custom;
  const config = usedLayers.map((layerData, index) => {
    const label = db.format(layerData[selectedKey], {
      keycapSize: "full",
      layerNames: props.layerNames,
    });
    let colorWidget;
    if (colormap && colormap.palette.length > 0 && colormap.colorMap.length > index) {
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
          <LayerNameInput value={layerNames.names[index]} index={index} setLayerName={props.setLayerName} />
        </TableCell>
        <TableCell>
          {label.hint} {label.main}
        </TableCell>
        {colormap && colormap.palette.length > 0 && <TableCell>{colorWidget}</TableCell>}
      </TableRow>
    );
  });

  const layerCopyPaste = (
    <TableRow>
      <TableCell
        colSpan={colormap && colormap.palette.length > 0 ? 3 : 2}
        align="right"
        sx={{
          borderBottom: "none",
        }}
      >
        <Button onClick={() => props.copyLayer(layer)}>{t("editor.overview.copyLayer")}</Button>
        <Button onClick={() => props.pasteLayer()} disabled={!props.hasCopiedLayer()}>
          {t("editor.overview.pasteLayer")}
        </Button>
      </TableCell>
    </TableRow>
  );

  const layoutSharing = (
    <>
      <Button onClick={() => setDialogOpen(true)} color="secondary" variant="outlined">
        {t("editor.overview.sharing")}
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
        onColormapAndPaletteChange={props.onColormapAndPaletteChange}
      />
    </>
  );

  return (
    <Box sx={{ mb: 2 }}>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table size="small">
          <Tooltip title={t("editor.overview.help")}>
            <TableHead>
              <TableRow>
                <TableCell size="small" width="33%">
                  {t("components.layerRaw")}
                </TableCell>
                <TableCell>
                  {t("editor.overview.key", {
                    index: selectedKey,
                  })}
                </TableCell>
                {colormap && colormap.palette.length > 0 && <TableCell>{t("editor.overview.color")}</TableCell>}
              </TableRow>
            </TableHead>
          </Tooltip>
          <TableBody>{config}</TableBody>
          <TableFooter>{layerCopyPaste}</TableFooter>
        </Table>
      </TableContainer>
      {{ layoutSharing }}
    </Box>
  );
};

export { Overview as default };
