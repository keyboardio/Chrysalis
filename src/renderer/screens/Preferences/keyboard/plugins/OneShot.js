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

import KeymapDB from "@api/focus/keymap/db";

import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import { PluginSliderWithInput } from "../../components/PluginSliderWithInput";
import PreferenceSwitch from "../../components/PreferenceSwitch";
import PreferenceWithHeading from "../../components/PreferenceWithHeading";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

const db = new KeymapDB();

const StickynessConfig = (props) => {
  const { t } = useTranslation();

  const tPrefix = "preferences.keyboard.plugins.oneshot.stickyness";

  return (
    <PreferenceWithHeading
      heading={t(`${tPrefix}.label`)}
      subheading={t(`${tPrefix}.help`)}
    >
      {props.loaded ? (
        <FormControl size="small">
          <Select
            sx={{ width: "17em" }}
            value={props.value}
            onChange={props.onChange}
          >
            <MenuItem value={65535}>{t(`${tPrefix}.enable`)}</MenuItem>
            <MenuItem value={65280}>{t(`${tPrefix}.layers_only`)}</MenuItem>
            <MenuItem value={255}>{t(`${tPrefix}.modifiers_only`)}</MenuItem>
            <MenuItem value={0}>{t(`${tPrefix}.disable`)}</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <Skeleton variant="rectangle" width="10em" height={40} />
      )}
    </PreferenceWithHeading>
  );
};

const OneShotPreferences = (props) => {
  const { t } = useTranslation();
  const { plugins, onSaveChanges } = props;
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const [escOneShot, setEscOneShot] = useState(true);
  const [OSTimeout, setOSTimeout] = useState(2500);
  const [OSHoldTimeout, setOSHoldTimeout] = useState(250);
  const [OSAutoLayers, setOSAutoLayers] = useState(false);
  const [OSAutoMods, setOSAutoMods] = useState(false);
  const [OSStickableKeys, setOSStickableKeys] = useState(65535);

  const initialize = async () => {
    const doesEscCancelOneShot = (value) => {
      if (value.length == 0) {
        return false;
      }

      return parseInt(value) == db.constants.codes.ESCAPE;
    };

    const key = await activeDevice.escape_oneshot_cancel_key();
    setEscOneShot(doesEscCancelOneShot(key));

    const _osTimeout = await activeDevice.oneshot_timeout();
    const _osHoldTimeout = await activeDevice.oneshot_hold_timeout();
    const _osAutoLayers = await activeDevice.oneshot_auto_layers();
    const _osAutoMods = await activeDevice.oneshot_auto_mods();
    const _osStickableKeys = await activeDevice.oneshot_stickable_keys();

    setOSTimeout(parseInt(_osTimeout));
    setOSHoldTimeout(parseInt(_osHoldTimeout));
    setOSAutoLayers(parseInt(_osAutoLayers) == 0 ? false : true);
    setOSAutoMods(parseInt(_osAutoMods) == 0 ? false : true);
    setOSStickableKeys(parseInt(_osStickableKeys));
  };

  const loaded = usePluginEffect(initialize);

  const onEscOneShotChange = async (event) => {
    const v = event.target.checked;
    const c = db.constants.codes;
    setEscOneShot(v);
    await onSaveChanges("escape_oneshot.cancel_key", function () {
      activeDevice.escape_oneshot_cancel_key(v ? c.ESCAPE : c.ONESHOT_CANCEL);
    });
  };

  const onOSAutoModsChange = async (event) => {
    const v = event.target.checked;
    setOSAutoMods(v);
    await onSaveChanges("oneshot.auto_mods", function () {
      activeDevice.oneshot_auto_mods(v ? 1 : 0);
    });
  };

  const onOSAutoLayersChange = async (event) => {
    const v = event.target.checked;
    setOSAutoLayers(v);
    await onSaveChanges("oneshot.auto_layers", function () {
      activeDevice.oneshot_auto_layers(v ? 1 : 0);
    });
  };

  const onStickableKeysChange = async (event) => {
    const key_bitmap = event.target.value;
    setOSStickableKeys(key_bitmap);
    await onSaveChanges("oneshot.stickable_keys", function () {
      activeDevice.oneshot_stickable_keys(key_bitmap);
    });
  };

  return (
    <>
      {plugins?.EscapeOneShot && (
        <PreferenceSwitch
          option="keyboard.plugins.escOneShot"
          loaded={loaded}
          checked={escOneShot}
          onChange={onEscOneShotChange}
        />
      )}
      {plugins?.EscapeOneShot && plugins?.OneShotConfig && (
        <Divider sx={{ my: 2 }} />
      )}
      {plugins?.OneShotConfig && (
        <>
          <PluginSliderWithInput
            plugin="oneshot"
            setting="timeout"
            value={OSTimeout}
            setValue={setOSTimeout}
            max={65535}
            loaded={loaded}
            onSaveChanges={onSaveChanges}
            in_ms
          />
          <PluginSliderWithInput
            plugin="oneshot"
            setting="hold_timeout"
            value={OSHoldTimeout}
            setValue={setOSHoldTimeout}
            max={65535}
            loaded={loaded}
            onSaveChanges={onSaveChanges}
            in_ms
          />
          <StickynessConfig
            loaded={loaded}
            value={OSStickableKeys}
            onChange={onStickableKeysChange}
          />
          <Divider sx={{ my: 2 }} />
          <PreferenceSwitch
            option="keyboard.plugins.oneshot.auto_mods"
            loaded={loaded}
            checked={OSAutoMods}
            onChange={onOSAutoModsChange}
          />
          <PreferenceSwitch
            option="keyboard.plugins.oneshot.auto_layers"
            loaded={loaded}
            checked={OSAutoLayers}
            onChange={onOSAutoLayersChange}
          />
        </>
      )}
    </>
  );
};

export { OneShotPreferences as default };
