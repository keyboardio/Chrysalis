import KeymapDB from "@api/focus/keymap/db";
import { addModifier, removeModifier } from "@api/focus/keymap/db/modifiers";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Tooltip from "@renderer/components/Tooltip";
import usePluginAvailable from "@renderer/hooks/usePluginVisibility";
import React from "react";
import { useTranslation } from "react-i18next";
import FKPCategorySelector from "../components/FKPCategorySelector";

const db = new KeymapDB();

export const SpecialModifiers = (props) => {
  const { t } = useTranslation();
  const oneShotAvailable = usePluginAvailable("OneShot");

  const toggleModifier = (mod) => (event) => {
    const { currentKey: key } = props;
    const c = db.constants.codes;
    if (mod === "oneshot") {
      props.onKeyChange(
        event.target.checked
          ? key.code - c.FIRST_MODIFIER + c.FIRST_ONESHOT_MODIFIER
          : key.code - key.rangeStart + c.FIRST_MODIFIER,
      );
    } else {
      props.onKeyChange(event.target.checked ? addModifier(key.code, mod) : removeModifier(key.code, mod));
    }
  };

  const makeSwitch = (mod) => {
    const { currentKey: key } = props;
    let isChecked = false;
    if (mod === "oneshot") {
      isChecked = db.isInCategory(key.code, mod);
    } else {
      isChecked = db.isInCategory(key.code, mod) && !db.isInCategory(key.code, "dualuse");
    }
    return <Switch size="small" checked={isChecked} color="primary" onChange={toggleModifier(mod)} />;
  };

  const { currentKey: key } = props;

  const isDualUse = db.isInCategory(key.code, "dualuse");
  const regularMods = ["ctrl", "alt", "altgr", "shift", "gui"];
  const isModified = regularMods.some((mod) => db.isInCategory(key.code, mod));
  const isModifier = db.isInCategory(key.baseCode || key.code, "modifier");
  const topsyTurvyAvailable = usePluginAvailable("TopsyTurvy");

  return (
    <FormGroup>
      <FKPCategorySelector
        help={t("editor.sidebar.keypicker.specialModsHelp")}
        plugin="TopsyTurvy"
        disabled={!db.isStandardKey(key)}
      >
        <FormControl component="fieldset" sx={{ mt: 1 }} disabled={!db.isStandardKey(key)}>
          <Tooltip title={t("editor.sidebar.keypicker.topsyturvy.tooltip")}>
            <FormControlLabel
              control={makeSwitch("topsyturvy")}
              label={t("editor.sidebar.keypicker.topsyturvy.label")}
              disabled={!topsyTurvyAvailable || isModifier || isModified || isDualUse}
            />
          </Tooltip>
        </FormControl>
      </FKPCategorySelector>
      <FKPCategorySelector disabled={!db.isStandardKey(key)}>
        <FormControl component="fieldset" sx={{ mt: 1 }} disabled={!db.isStandardKey(key)}>
          <Tooltip title={t("editor.sidebar.keypicker.oneshot.tooltip")}>
            <FormControlLabel
              control={makeSwitch("oneshot")}
              label={t("editor.sidebar.keypicker.oneshot.label")}
              disabled={!oneShotAvailable || !isModifier || isDualUse}
            />
          </Tooltip>
        </FormControl>
      </FKPCategorySelector>
    </FormGroup>
  );
};

export { SpecialModifiers as default };
