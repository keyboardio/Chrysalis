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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrintIcon from "@mui/icons-material/Print";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { GlobalContext } from "@renderer/components/GlobalContext";
import LoadingScreen from "@renderer/components/LoadingScreen";
import { PageTitle } from "@renderer/components/PageTitle";
import { toast } from "@renderer/components/Toast";
import useEffectOnce from "@renderer/hooks/useEffectOnce";
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Store } from "@renderer/localStore";
const settings = new Store();

const db = new KeymapDB();

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

  const globalContext = useContext(GlobalContext);

  const [_, setHideHeaderInPrint] = globalContext.state.hideHeaderInPrint;
  const [loading, setLoading] = useState(true);
  const [oneLayerPerPage, setOneLayerPerPage] = useState(false);
  const [activeDevice] = globalContext.state.activeDevice;

  const { t } = useTranslation();

  useEffect(() => {
    setHideHeaderInPrint(true);

    return function cleanup() {
      setHideHeaderInPrint(false);
    };
  });

  const scanKeyboard = async () => {
    try {
      const deviceKeymap = await activeDevice.keymap();
      setKeymap(deviceKeymap);

      const deviceLayerNames = await activeDevice.layernames();
      if (deviceLayerNames) setLayerNames(deviceLayerNames);

      if (settings.get("ui.layoutCards.colored")) {
        const deviceColormap = await activeDevice.colormap();
        setColormap(deviceColormap);
      }
    } catch (e) {
      console.error("error while fetching keymap & colormap", {
        error: e,
      });
      toast.error(e);
      props.onDisconnect();
    }
  };

  useEffectOnce(() => {
    const initialize = async () => {
      await scanKeyboard();

      setOneLayerPerPage(settings.get("ui.layoutCards.oneLayerPerPage", false));

      setLoading(false);
    };

    initialize();
  });

  if (loading) {
    return <LoadingScreen />;
  }

  const KeymapSVG = activeDevice.focusDeviceDescriptor().components.keymap;

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
              {layerNames.names[i] || t("components.layer", { index: i })}
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
      <Tooltip title={t("layoutCards.printTooltip")}>
        <Box
          role="button"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "fixed",
            bottom: 32,
            left: 32,
            zIndex: (theme) => theme.zIndex.drawer - 1,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Fab color="primary" onClick={window.print}>
              <PrintIcon />
            </Fab>
          </Box>
        </Box>
      </Tooltip>
    </React.Fragment>
  );
};

export default LayoutCard;
