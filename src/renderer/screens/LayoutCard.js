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
import { logger } from "@api/log";
import KeymapDB from "@api/focus/keymap/db";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingScreen from "@renderer/components/LoadingScreen";
import { PageTitle } from "@renderer/components/PageTitle";
import { toast } from "@renderer/components/Toast";
import useEffectOnce from "@renderer/hooks/useEffectOnce";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const Store = require("electron-store");
const settings = new Store();

const db = new KeymapDB();
const focus = new Focus();

const LayoutCard = (props) => {
  const [keymap, setKeymap] = useState({
    custom: [],
    default: [],
    onlyCustom: false,
  });
  const [colormap, setColormap] = useState({
    palette: [],
    colorMap: [],
  });
  const [layerNames, setLayerNames] = useState({
    storageSize: 0,
    names: [],
  });

  const [loading, setLoading] = useState(true);
  const [oneLayerPerPage, setOneLayerPerPage] = useState(false);
  const { t } = useTranslation();

  const scanKeyboard = async () => {
    try {
      const deviceKeymap = await focus.command("keymap");
      setKeymap(deviceKeymap);

      const deviceLayerNames = await focus.command("layernames");
      if (deviceLayerNames) setLayerNames(deviceLayerNames);

      if (settings.get("ui.layoutCards.colored")) {
        const deviceColormap = await focus.command("colormap");
        setColormap(deviceColormap);
      }
    } catch (e) {
      logger().error("error while fetching keymap & colormap", {
        error: e,
      });
      toast.error(e);
      props.onDisconnect();
    }
  };

  useEffectOnce(async () => {
    await scanKeyboard();

    setOneLayerPerPage(settings.get("ui.layoutCards.oneLayerPerPage", false));

    setLoading(false);
  });
  if (loading) {
    return <LoadingScreen />;
  }

  const KeymapSVG = focus.focusDeviceDescriptor.components.keymap;

  const keymap_pix = [];
  const title = t("Keyboard layout");

  for (let i = 0; i < keymap.custom.length; i++) {
    for (const j of keymap.custom[i]) {
      if (j.code != db.constants.codes.EMPTY) {
        // If it's not empty, add it to the keymap_pix array
        keymap_pix.push(
          <Box
            sx={{
              width: "auto",
              breakInside: "avoid",
              breakAfter: oneLayerPerPage && "page",
            }}
            key={`LayerCard-${i}`}
          >
            <Typography
              variant="h3"
              sx={{
                marginTop: 4,
                marginBottom: 1,
                marginLeft: 5,
              }}
            >
              {t("components.layer", { index: i })}
            </Typography>
            <KeymapSVG
              className="layer"
              index={i}
              keymap={keymap?.custom[i]}
              colormap={colormap?.colorMap[i]}
              palette={colormap?.palette}
              layerNames={layerNames}
            />
          </Box>
        );

        break;
      }
    }
  }

  return (
    <React.Fragment>
      <PageTitle title={title} />

      <Box component="main">
        <Box
          sx={{
            display: "block",
            margin: "auto",
          }}
        >
          <div>{keymap_pix}</div>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default LayoutCard;
