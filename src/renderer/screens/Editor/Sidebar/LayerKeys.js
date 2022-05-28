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
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Collapsible from "../components/Collapsible";

const db = new KeymapDB();

const LayerKeys = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const oneShotVisible = usePluginVisibility("OneShot");

  const getMaxLayer = () => {
    const { keymap, currentKey: key } = props;
    const max = keymap.custom.length - 1;

    if (db.isInCategory(key.code, "layer") && key.categories[1] == "oneshot") {
      // for oneshots Kaleidoscope supports max 8 layers so index is 7
      return Math.min(max, 7);
    }
    return max;
  };
  const updateExpandedBasedOnKey = (props) => {
    if (db.isInCategory(props.currentKey.code, "layer")) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const onKeyChange = (keyCode) => {
    props.onKeyChange(keyCode);
  };

  const onTargetLayerChange = (event, max) => {
    const target = Math.min(parseInt(event.target.value) || 0, max);

    props.onKeyChange(props.currentKey.rangeStart + target);
  };

  const onTypeChange = (event) => {
    const typeStarts = {
      locktolayer: 17408,
      shifttolayer: 17450,
      movetolayer: 17492,
      oneshot: 49161,
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
  const max = getMaxLayer();
  return (
    <React.Fragment>
      <Collapsible
        title={t("editor.sidebar.layer.title")}
        help={t("editor.sidebar.layer.help")}
        expanded={db.isInCategory(key.code, "layer")}
      >
        <div>
          <FormControl>
            <InputLabel>{t("editor.layerswitch.type")}</InputLabel>
            <Select value={type} onChange={onTypeChange}>
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
              {oneShotVisible && (
                <MenuItem value="oneshot" selected={type == "oneshot"}>
                  {t("editor.layerswitch.oneshot")}
                </MenuItem>
              )}
              <MenuItem value="dualuse" selected={type == "dualuse"} disabled>
                {t("editor.layerswitch.dualuse")}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>{t("editor.layerswitch.target")}</InputLabel>
            <Input
              type="number"
              min={0}
              max={max}
              value={targetLayer < 0 ? "" : targetLayer}
              disabled={targetLayer < 0}
              onChange={(event) => onTargetLayerChange(event, max)}
            />
          </FormControl>
        </div>
      </Collapsible>
    </React.Fragment>
  );
};

export { LayerKeys as default };
