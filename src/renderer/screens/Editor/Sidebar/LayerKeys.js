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
import { addDualUseLayer } from "@api/focus/keymap/db/base";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";
import React from "react";
import { useTranslation } from "react-i18next";
import FKPCategorySelector from "../components/FKPCategorySelector";

const db = new KeymapDB();

const LayerKeys = (props) => {
  const { t } = useTranslation();
  const oneShotVisible = usePluginVisibility("OneShot");

  const getMaxLayer = () => {
    const { keymap, currentKey: key } = props;
    const max = keymap.custom.length;

    if (db.isInCategory(key.code, "layer") && key.categories.includes("oneshot")) {
      // for oneshots Kaleidoscope supports max 8 layers
      return Math.min(max, 8);
    }
    return max;
  };

  const onTargetLayerChange = (event, max) => {
    let target = Math.min(parseInt(event.target.value) || 0, max);
    if (db.isInCategory(key.code, "layer") && key.categories.includes("dualuse")) {
      const code = key.baseCode || key.code;

      if (target < 0) target = getMaxLayer();
      if (target > getMaxLayer()) target = 0;

      props.onKeyChange(addDualUseLayer(db.lookup(code), target).code);
    } else {
      props.onKeyChange(props.currentKey.rangeStart + target);
    }
  };

  const onTypeChange = (event) => {
    const typeStarts = {
      locktolayer: db.constants.ranges.layer_lock.start,
      shifttolayer: db.constants.ranges.layer_shift.start,
      movetolayer: db.constants.ranges.layer_move.start,
      oneshot: db.constants.ranges.oneshot_layer.start,
    };
    const { currentKey } = props;
    const targetLayer = currentKey.target || 0;
    props.onKeyChange(typeStarts[event.target.value] + targetLayer);
  };

  const { currentKey: key } = props;

  let type = "none",
    targetLayer = -1;

  if (db.isInCategory(key.code, "layer")) {
    targetLayer = key.target;
    type = key.categories[1];
  }
  return (
    <FKPCategorySelector category="layer">
      <div>
        <FormControl>
          <InputLabel id="editor.layerswitch.type">{t("editor.layerswitch.type")}</InputLabel>
          <Select
            value={type}
            onChange={onTypeChange}
            labelid="editor.layerswitch.type"
            label={t("editor.layerswitch.type")}
          >
            <MenuItem value="none" disabled selected>
              {t("components.none")}
            </MenuItem>
            <MenuItem value="shifttolayer" selected={type == "shifttolayer"}>
              {t("editor.layerswitch.shiftTo")}
            </MenuItem>
            <MenuItem value="locktolayer" selected={type == "locktolayer"}>
              {t("editor.layerswitch.lockTo")}
            </MenuItem>
            <MenuItem value="movetolayer" selected={type == "movetolayer"}>
              {t("editor.layerswitch.moveTo")}
            </MenuItem>
            <MenuItem value="oneshot" selected={type == "oneshot"} disabled={!oneShotVisible}>
              {t("editor.layerswitch.oneshot")}
            </MenuItem>
            <MenuItem value="dualuse" selected={type == "dualuse"} disabled>
              {t("editor.layerswitch.dualuse")}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ mx: 1 }}>
          <InputLabel id="editor.layerswitch.target">{t("editor.layerswitch.target")}</InputLabel>
          <Select
            labelId="editor.layerswitch.target"
            value={targetLayer}
            onChange={(event) => onTargetLayerChange(event, getMaxLayer())}
            label={t("editor.layerswitch.target")}
            disabled={targetLayer < 0}
          >
            <MenuItem value="-1" disabled></MenuItem>
            {[...Array(getMaxLayer())].map((x, i) => (
              <MenuItem key={i} name={i} value={i}>
                {props.layerNames?.names[i]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </FKPCategorySelector>
  );
};

export { LayerKeys as default };
