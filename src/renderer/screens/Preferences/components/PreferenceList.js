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

import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import PreferenceSlider from "./PreferenceSlider";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

const PreferenceList = (props) => {
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const { plugin, preferences } = props;

  /*
  const preferences = [
    {
      name: "mousekeys_init_speed",
      type: "slider",
      initialValue: 1,
      max: 255,
    },
    {
      name: "mousekeys_base_speed",
      type: "slider",
      initialValue: 50,
      max: 255,
    },
    {
      name: "mousekeys_accel_duration",
      type: "slider",
      unit: "ms",
      initialValue: 800,
      max: 65535,
    },
    {
      type: "divider",
    },
    {
      name: "mousekeys_scroll_interval",
      type: "slider",
      unit: "ms",
      initialValue: 50,
      max: 255,
    },
  ];
  */

  const states = {};
  preferences.forEach((pref) => {
    if (pref.type === "divider") return;

    const [state, setState] = useState(pref.initialValue);
    states[pref.name] = { state, setState };
  });

  const initialize = async () => {
    const _initValues = {};
    preferences.forEach(async (pref) => {
      if (pref.type === "divider") return;

      const v = await activeDevice[`${plugin}_${pref.name}`]();

      if (pref.type === "slider") {
        states[pref.name].setState(parseInt(v));
      } else {
        states[pref.name].setState(v);
      }
    });
  };

  const loaded = usePluginEffect(initialize);

  //if (!loaded) return null;

  const components = preferences.map((pref) => {
    if (pref.type === "divider") {
      return <Divider sx={{ my: 1 }} />;
    } else if (pref.type === "slider") {
      return (
        <PreferenceSlider
          plugin={plugin}
          setting={pref.name}
          value={states[pref.name].state}
          setValue={states[pref.name].setState}
          max={pref.max}
          in_ms={pref.unit === "ms"}
          loaded={loaded}
        />
      );
    } else {
      return null;
    }
  });

  /*
    <PreferenceList plugin="mousekeys" preferences={preferences} />
   */

  return components;
};

export { PreferenceList as default };
