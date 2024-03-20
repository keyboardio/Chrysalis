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

import useDataLoadedFromActiveDevice from "@renderer/hooks/useDataLoadedFromActiveDevice";
import { PluginSliderWithInput } from "../../components/PluginSliderWithInput";
import PreferenceSwitch from "../../components/PreferenceSwitch";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

const AutoShiftPreferences = (props) => {
  const { t } = useTranslation();
  const { plugins, onSaveChanges } = props;
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const [autoShiftEnabled, setAutoShiftEnabled] = useState(0);
  const [autoShiftTimeout, setAutoShiftTimeout] = useState(175);
  const [autoShiftCategories, setAutoShiftCategories] = useState(7);

  const initialize = async () => {
    const _enabled = await activeDevice.autoshift_enabled();
    const _timeout = await activeDevice.autoshift_timeout();
    const _categories = await activeDevice.autoshift_categories();

    setAutoShiftEnabled(_enabled == "true");
    setAutoShiftTimeout(parseInt(_timeout));
    setAutoShiftCategories(parseInt(_categories));
  };

  const loaded = useDataLoadedFromActiveDevice(initialize);

  const categories = ["letters", "numbers", "symbols", "arrows", "functions", undefined, undefined, "all"];

  const onCategoryChange = (category) => async (event) => {
    const v = event.target.checked;
    const c = 1 << categories.indexOf(category);
    let newCategories = autoShiftCategories;

    if (v) {
      newCategories |= c;
    } else {
      newCategories &= ~c;
    }
    setAutoShiftCategories(newCategories);
    await onSaveChanges("autoshift.categories", function () {
      activeDevice.autoshift_categories(newCategories);
    });
  };

  const isCategoryEnabled = (category) => {
    const c = 1 << categories.indexOf(category);
    return Boolean(autoShiftCategories & c);
  };

  const onEnabledChange = async (event) => {
    const isEnabled = event.target.checked;
    setAutoShiftEnabled(isEnabled);
    onSaveChanges("autoshift.enabled", function () {
      activeDevice.autoshift_enabled(isEnabled ? 1 : 0);
    });
  };

  const categorySwitches = categories
    .filter((category) => category)
    .map((category) => (
      <PreferenceSwitch
        key={`pref.autoshift.${category}`}
        option={`keyboard.plugins.autoshift.category.${category}`}
        loaded={loaded}
        checked={isCategoryEnabled(category)}
        onChange={onCategoryChange(category)}
      />
    ));

  return (
    <>
      <PreferenceSwitch
        option="keyboard.plugins.autoshift.enabled"
        loaded={loaded}
        checked={autoShiftEnabled == 1}
        onChange={onEnabledChange}
      />
      <PluginSliderWithInput
        disabled={!autoShiftEnabled}
        plugin="autoshift"
        setting="timeout"
        value={autoShiftTimeout}
        setValue={setAutoShiftTimeout}
        max={65535}
        loaded={loaded}
        onSaveChanges={onSaveChanges}
        in_ms
      />
      <Divider sx={{ my: 2 }} />
      {categorySwitches}
    </>
  );
};

export { AutoShiftPreferences as default };
