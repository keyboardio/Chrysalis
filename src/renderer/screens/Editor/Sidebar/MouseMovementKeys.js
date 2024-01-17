import Box from "@mui/material/Box";
import React from "react";
import { useTranslation } from "react-i18next";
import KeyButton from "../components/KeyButton";
import { SectionTitle } from "@renderer/components/SectionTitle";
import KeymapDB from "@api/focus/keymap/db";

export const MouseMovementKeys = (props) => {
  const { t } = useTranslation();
  const db = new KeymapDB();

  const mouseUp = db.lookup(20481);
  const mouseLeft = db.lookup(20484);
  const mouseDown = db.lookup(20482);
  const mouseRight = db.lookup(20488);
  const sharedProps = {
    onKeyChange: props.onKeyChange,
    currentKey: props.currentKey,
  };

  return (
    <div>
      <SectionTitle>{t("editor.sidebar.mousekeys.movement")}</SectionTitle>
      <Box mx="auto" p={1} textAlign="center">
        <KeyButton {...sharedProps} keyObj={mouseUp} noHint />
        <br />
        <KeyButton {...sharedProps} keyObj={mouseLeft} noHint />
        <KeyButton {...sharedProps} keyObj={mouseRight} noHint />
        <br />
        <KeyButton {...sharedProps} keyObj={mouseDown} noHint />
      </Box>
    </div>
  );
};
