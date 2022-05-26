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
import { KeymapDB } from "@api/keymap";
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

  const [layout, _setLayout] = useState("English (US)");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const initializeHostKeyboardLayout = async () => {
    const layoutSetting = await settings.get("keyboard.layout", "English (US)");
    db.setLayout(layoutSetting);
    _setLayout(layoutSetting);
  };

  const scanKeyboard = async () => {
    try {
      const deviceKeymap = await focus.command("keymap");
      const deviceColormap = await focus.command("colormap");

      setKeymap(deviceKeymap);
      setColormap(deviceColormap);
    } catch (e) {
      toast.error(e);
      props.onDisconnect();
    }
  };

  useEffectOnce(async () => {
    await scanKeyboard();
    await initializeHostKeyboardLayout();

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
      if (j.code != 65535) {
        // If it's not empty, add it to the keymap_pix array
        keymap_pix.push(
          <Box
            sx={{ width: "auto", breakInside: "avoid" }}
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
