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
import usePluginEffect from "@renderer/hooks/usePluginEffect";
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Collapsible from "../components/Collapsible";

import { MouseWarpKeys } from "./MouseWarpKeys";
import { MouseWheelKeys } from "./MouseWheelKeys";
import { MouseMovementKeys } from "./MouseMovementKeys";
import { MouseButtonKeys } from "./MouseButtonKeys";
const db = new KeymapDB();

const MouseKeys = (props) => {
  const { t } = useTranslation();
  const [gridSize, setGridSize] = useState(undefined);

  const initialize = async (_, activeDevice) => {
    const _gridSize = (await activeDevice.mousekeys_warp_grid_size()) || "2";

    setGridSize(parseInt(_gridSize));
  };

  const loaded = usePluginEffect(initialize);
  const pluginVisible = usePluginVisibility("MouseKeys");
  if (!pluginVisible) return null;
  if (!loaded) return null;

  const subWidgets = [MouseMovementKeys, MouseButtonKeys, MouseWheelKeys, MouseWarpKeys];

  const sharedProps = {
    onKeyChange: props.onKeyChange,
    currentKey: props.currentKey,
  };

  const widgets = subWidgets.map((Widget, index) => {
    return <Widget key={`mousekeys-group-${index}`} onKeyChange={props.onKeyChange} warpGridSize={gridSize} />;
    return <Widget key={`mousekeys-group-${index}`} onKeyChange={props.onKeyChange} warpGridSize={gridSize} />;
  });

  return (
    <Collapsible title={t("editor.sidebar.mousekeys.title")} help={t("editor.sidebar.mousekeys.help")}>
    <Collapsible title={t("editor.sidebar.mousekeys.title")} help={t("editor.sidebar.mousekeys.help")}>
      {widgets}
    </Collapsible>
  );
};

export { MouseKeys as default };
