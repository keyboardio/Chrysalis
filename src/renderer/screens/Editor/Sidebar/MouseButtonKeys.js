import Box from "@mui/material/Box";
import React from "react";
import { useTranslation } from "react-i18next";
import KeyButton from "../components/KeyButton";
import { SectionTitle } from "@renderer/components/SectionTitle";
import KeymapDB from "@api/focus/keymap/db";

export const MouseButtonKeys = (props) => {
  const { t } = useTranslation();
  const db = new KeymapDB();

  const left = db.lookup(20545);
  const middle = db.lookup(20548);
  const right = db.lookup(20546);
  const back = db.lookup(20552);
  const fwd = db.lookup(20560);
  const sharedProps = {
    onKeyChange: props.onKeyChange,
    currentKey: props.currentKey,
  };

  return (
    <div>
      <SectionTitle>{t("editor.sidebar.mousekeys.buttons")}</SectionTitle>

      <Box mx="auto" p={1} textAlign="center">
        <KeyButton {...sharedProps} keyObj={left} noHint />
        <KeyButton {...sharedProps} keyObj={middle} noHint />
        <KeyButton {...sharedProps} keyObj={right} noHint />
        <br />
        <KeyButton {...sharedProps} keyObj={back} noHint />
        <KeyButton {...sharedProps} keyObj={fwd} noHint />
      </Box>
    </div>
  );
};
