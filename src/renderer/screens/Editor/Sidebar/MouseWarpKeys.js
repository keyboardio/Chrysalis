import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import usePluginEffect from "@renderer/hooks/usePluginEffect";
import KeyButton from "../components/KeyButton";
import { SectionTitle } from "@renderer/components/SectionTitle";
import KeymapDB from "@api/focus/keymap/db";
import Grid from "@mui/material/Grid";

export const MouseWarpKeys = (props) => {
  const { t } = useTranslation();
  const [gridSize, setGridSize] = useState(undefined);
  const db = new KeymapDB();

  const initialize = async (_, activeDevice) => {
    const _gridSize = (await activeDevice.mousekeys_warp_grid_size()) || "2";

    setGridSize(parseInt(_gridSize));
  };
  const loaded = usePluginEffect(initialize);
  if (!loaded) return null;

  const warpNW = db.lookup(20517);
  const warpNE = db.lookup(20521);
  const warpSW = db.lookup(20518);
  const warpSE = db.lookup(20522);
  const warpEnd = db.lookup(20576);
  const warpN = db.lookup(20513);
  const warpS = db.lookup(20514);
  const warpZ = db.lookup(20515);
  const warpW = db.lookup(20516);
  const warpE = db.lookup(20520);

  const sharedProps = {
    onKeyChange: props.onKeyChange,
    currentKey: props.currentKey,
  };

  if (gridSize == 2) {
    return (
      <>
        <SectionTitle>{t("editor.sidebar.mousekeys.warp")}</SectionTitle>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpNW} noHint />
          <KeyButton {...sharedProps} keyObj={warpNE} noHint />
        </Grid>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpSW} noHint />
          <KeyButton {...sharedProps} keyObj={warpSE} noHint />
        </Grid>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpEnd} noHint />
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <SectionTitle>{t("editor.sidebar.mousekeys.warp")}</SectionTitle>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpNW} noHint keycapSize="1u" />
          <KeyButton {...sharedProps} keyObj={warpN} noHint keycapSize="1u" />
          <KeyButton {...sharedProps} keyObj={warpNE} noHint keycapSize="1u" />
        </Grid>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpW} noHint keycapSize="1u" />
          <KeyButton {...sharedProps} keyObj={warpZ} noHint keycapSize="1u" />
          <KeyButton {...sharedProps} keyObj={warpE} noHint keycapSize="1u" />
        </Grid>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpSW} noHint keycapSize="1u" />
          <KeyButton {...sharedProps} keyObj={warpS} noHint keycapSize="1u" />
          <KeyButton {...sharedProps} keyObj={warpSE} noHint keycapSize="1u" />
        </Grid>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpEnd} noHint />
        </Grid>
      </>
    );
  }
};
