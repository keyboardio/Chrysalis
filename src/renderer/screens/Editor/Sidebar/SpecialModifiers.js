import { addModifier, removeModifier } from "@api/focus/keymap/db/modifiers";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import usePluginAvailable from "@renderer/hooks/usePluginVisibility";
import React from "react";
import { useTranslation } from "react-i18next";
import FKPCategorySelector from "../components/FKPCategorySelector";
import KeymapDB from "@api/focus/keymap/db";

const db = new KeymapDB();

export const SpecialModifiers = (props) => {
  const { t } = useTranslation();
  const oneShotAvailable = usePluginAvailable("OneShot");

  const isStandardKey = (props) => {
    const { currentKey: key } = props;
    const code = key.baseCode || key.code;
    const stdRange = db.constants.ranges.standard;

    return code >= stdRange.start && code <= stdRange.end && !db.isInCategory(key.code, "dualuse");
  };

  const toggleModifier = (mod) => (event) => {
    const { currentKey: key } = props;

    if (event.target.checked) {
      props.onKeyChange(addModifier(key.code, mod));
    } else {
      props.onKeyChange(removeModifier(key.code, mod));
    }
  };

  const toggleOneShot = (event) => {
    const { currentKey: key } = props;
    const c = db.constants.codes;

    if (event.target.checked) {
      props.onKeyChange(key.code - c.FIRST_MODIFIER + c.FIRST_ONESHOT_MODIFIER);
    } else {
      props.onKeyChange(key.code - key.rangeStart + c.FIRST_MODIFIER);
    }
  };

  const makeSwitch = (mod) => {
    const { currentKey: key } = props;
    return (
      <Switch
        checked={db.isInCategory(key, mod) && !db.isInCategory(key.code, "dualuse")}
        color="primary"
        onChange={toggleModifier(mod)}
      />
    );
  };

  const { currentKey: key } = props;

  const osmControl = (
    <Switch
      checked={db.isInCategory(key, "oneshot")}
      color="primary"
      onChange={toggleOneShot}
      disabled={
        !oneShotAvailable ||
        !db.isInCategory(key.baseCode || key.code, "modifier") ||
        db.isInCategory(key.code, "dualuse")
      }
    />
  );

  const isDualUse = db.isInCategory(key.code, "dualuse");
  const isShifted = db.isInCategory(key.code, "shift");
  const isTopsyTurvy = db.isInCategory(key.code, "topsyturvy");
  const isMod = (key, mod) => key.baseCode == mod || key.code == mod;

  const c = db.constants.codes;
  const topsyTurvyAvailable = usePluginAvailable("TopsyTurvy");

  return (
    <FormGroup column>
      <FKPCategorySelector
        help={t("editor.sidebar.keypicker.specialModsHelp")}
        plugin="TopsyTurvy"
        disabled={!isStandardKey(props)}
      >
        <FormControl component="fieldset" sx={{ mt: 1 }} disabled={!isStandardKey(props)}>
          <Tooltip title={t("editor.sidebar.keypicker.topsyturvy.tooltip")}>
            <FormControlLabel
              control={makeSwitch("topsyturvy")}
              label={t("editor.sidebar.keypicker.topsyturvy.label")}
              disabled={!topsyTurvyAvailable || isMod(key, c.LEFT_SHIFT) || isShifted || isDualUse}
            />
          </Tooltip>
        </FormControl>
      </FKPCategorySelector>
      <FKPCategorySelector disabled={!isStandardKey(props)}>
        <FormControl component="fieldset" sx={{ mt: 1 }} disabled={!isStandardKey(props)}>
          <Tooltip title={t("editor.sidebar.keypicker.oneshot.tooltip")}>
            <FormControlLabel control={osmControl} label={t("editor.sidebar.keypicker.oneshot.label")} />
          </Tooltip>
        </FormControl>
      </FKPCategorySelector>
    </FormGroup>
  );
};

export { SpecialModifiers as default };
