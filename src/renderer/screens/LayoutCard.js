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

import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { toast } from "react-toastify";

const Store = require("electron-store");
const settings = new Store();

import Focus from "@api/focus";
import { KeymapDB, default as Keymap } from "@api/keymap";

import { PageTitle } from "@renderer/components/PageTitle";
import i18n from "@renderer/i18n";
import LoadingScreen from "@renderer/components/LoadingScreen";

const db = new KeymapDB();
const focus = new Focus();

const LayoutCard = (props) => {
  const [keymap, setKeymap] = useState({
    custom: [],
    default: [],
    onlyCustom: false,
  });

  const [layout, _setLayout] = useState("English (US)");
  const [loading, setLoading] = useState(true);

  const initializeHostKeyboardLayout = async () => {
    const layoutSetting = await settings.get("keyboard.layout", "English (US)");
    db.setLayout(layoutSetting);
    _setLayout(layoutSetting);
  };

  const initialize = async () => {
    await scanKeyboard();
    await initializeHostKeyboardLayout();

    setLoading(false);
  };

  const scanKeyboard = async () => {
    try {
      let deviceKeymap = await focus.command("keymap");

      setKeymap(deviceKeymap);
    } catch (e) {
      toast.error(e);
      props.onDisconnect();
    }
  };

  useEffect(() => {
    initialize();

    // code to run after render goes here
  }, []); // <-- empty array means 'run once'
  // TODO - react exhaustive-deps doesn't like this, but I'm not quite sure how to refactor it

  if (loading) {
    return <LoadingScreen />;
  }

  const KeymapSVG = focus.focusDeviceDescriptor.components.keymap;

  let keymap_pix = [];
  let title = i18n.t("Keyboard layout");

  for (let i = 0; i < keymap.custom.length; i++) {
    for (let j of keymap.custom[i]) {
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
              {i18n.t("components.layer", { index: i })}
            </Typography>
            <KeymapSVG className="layer" index={i} keymap={keymap?.custom[i]} />
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
