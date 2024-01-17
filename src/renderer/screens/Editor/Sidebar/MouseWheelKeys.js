import Box from "@mui/material/Box";
import React from "react";
import { useTranslation } from "react-i18next";
import KeyButton from "../components/KeyButton";
import { SectionTitle } from "@renderer/components/SectionTitle";
import KeymapDB from "@api/focus/keymap/db";

export const MouseWheelKeys = (props) => {
  const { t } = useTranslation();
  const db = new KeymapDB();

  const up = db.lookup(20497);
  const down = db.lookup(20498);
  const left = db.lookup(20500);
  const right = db.lookup(20504);
  const sharedProps = {
    onKeyChange: props.onKeyChange,
    currentKey: props.currentKey,
  };

  return (
    <div>
      <SectionTitle>{t("editor.sidebar.mousekeys.wheel")}</SectionTitle>
      <Box mx="auto" p={1} textAlign="center">
        <KeyButton {...sharedProps} keyObj={up} noHint />
        <br />
        <KeyButton {...sharedProps} keyObj={left} noHint />
        <KeyButton {...sharedProps} keyObj={right} noHint />
        <br />
        <KeyButton {...sharedProps} keyObj={down} noHint />
      </Box>
    </div>
  );
};
