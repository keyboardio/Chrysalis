import KeymapDB from "@api/focus/keymap/db";
import { constants } from "@api/focus/keymap/db/constants";
import Grid from "@mui/material/Grid";
import usePluginEffect from "@renderer/hooks/usePluginEffect";
import React, { useState } from "react";
import FKPCategorySelector from "../components/FKPCategorySelector";
import KeyButton from "../components/KeyButton";

export const MouseWarpKeys = (props) => {
  const [gridSize, setGridSize] = useState(undefined);
  const db = new KeymapDB();

  const initialize = async (_, activeDevice) => {
    const _gridSize = (await activeDevice.mousekeys_warp_grid_size()) || "2";

    setGridSize(parseInt(_gridSize));
  };
  const loaded = usePluginEffect(initialize);
  if (!loaded) return null;

  const warpNW = db.lookup(constants.codes.MOUSE_WARP_NW);
  const warpNE = db.lookup(constants.codes.MOUSE_WARP_NE);
  const warpSW = db.lookup(constants.codes.MOUSE_WARP_SW);
  const warpSE = db.lookup(constants.codes.MOUSE_WARP_SE);
  const warpN = db.lookup(constants.codes.MOUSE_WARP_N);
  const warpS = db.lookup(constants.codes.MOUSE_WARP_S);
  const warpZ = db.lookup(constants.codes.MOUSE_WARP_Z);
  const warpW = db.lookup(constants.codes.MOUSE_WARP_W);
  const warpE = db.lookup(constants.codes.MOUSE_WARP_E);
  const warpEnd = db.lookup(constants.codes.MOUSE_WARP_END);

  const sharedProps = {
    onKeyChange: props.onKeyChange,
    currentKey: props.currentKey,
  };

  let warpGrid = null;
  if (gridSize == 3) {
    warpGrid = (
      <>
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
      </>
    );
  } else {
    warpGrid = (
      <>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpNW} noHint />
          <KeyButton {...sharedProps} keyObj={warpNE} noHint />
        </Grid>
        <Grid container justifyContent="center" spacing={0} wrap="nowrap">
          <KeyButton {...sharedProps} keyObj={warpSW} noHint />
          <KeyButton {...sharedProps} keyObj={warpSE} noHint />
        </Grid>
      </>
    );
  }
  return (
    <FKPCategorySelector category="mousekeys.warp" {...props}>
      {warpGrid}
      <Grid container justifyContent="center" spacing={0} wrap="nowrap">
        <KeyButton {...sharedProps} keyObj={warpEnd} noHint />
      </Grid>
    </FKPCategorySelector>
  );
};
