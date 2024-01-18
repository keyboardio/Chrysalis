// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import CheckIcon from "@mui/icons-material/Check";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import i18n from "@renderer/i18n";
import React from "react";
import Typography from "@mui/material/Typography";
const SaveChangesButton = (props) => {
  const [inProgress, setInProgress] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const { successMessage } = props;

  const handleButtonClick = async (event) => {
    setInProgress(true);
    try {
      await props.onClick(event);
    } catch (e) {
      return props.onError(e);
    }
    console.debug("Got back from click", { label: "save-changes" });

    setSuccess(true);
    setInProgress(false);
    setTimeout(() => {
      console.debug("running the timeout callback", { label: "save-changes" });
      setSuccess(false);
      console.debug("finishied timeout callback", { label: "save-changes" });
    }, 2000);
  };

  let icon = props.icon || <SaveAltIcon />;
  let label = props.label || i18n.t("saveChangesButton.saveChanges");

  if (success) {
    icon = <CheckIcon />;
    label = successMessage || i18n.t("saveChangesButton.savedChanges");
  } else if (inProgress) {
    icon = <CircularProgress size={24} />;
    label = i18n.t("saveChangesButton.savingChanges");
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Fab
          disabled={inProgress || (props.disabled && !success)}
          color={success ? "success" : "primary"}
          onClick={handleButtonClick}
          variant="extended"
        >
          {icon} <Typography sx={{ ml: 1 }}>{label}</Typography>
        </Fab>
      </Box>
    </Box>
  );
};

export default SaveChangesButton;
