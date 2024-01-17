import Box from "@mui/material/Box";
import React from "react";
import { useTranslation } from "react-i18next";
import KeyButton from "../components/KeyButton";
import { SectionTitle } from "@renderer/components/SectionTitle";
import KeymapDB from "@api/focus/keymap/db";
import Grid from "@mui/material/Grid";

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
    <>
      <SectionTitle>{t("editor.sidebar.mousekeys.buttons")}</SectionTitle>

      <Grid container justifyContent="center" spacing={0} wrap="nowrap">
        <Grid item xs>
          <KeyButton {...sharedProps} keyObj={left} noHint />
        </Grid>
        <Grid item xs>
          <KeyButton {...sharedProps} keyObj={middle} noHint />
        </Grid>
        <Grid item xs>
          <KeyButton {...sharedProps} keyObj={right} noHint />
        </Grid>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item>
          <KeyButton {...sharedProps} keyObj={back} noHint />
        </Grid>
        <Grid item>
          <KeyButton {...sharedProps} keyObj={fwd} noHint />
        </Grid>
      </Grid>
    </>
  );
};
