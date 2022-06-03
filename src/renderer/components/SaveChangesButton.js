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

const SaveChangesButton = (props) => {
  const [inProgress, setInProgress] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const { successMessage } = props;

  const handleButtonClick = async (event) => {
    setInProgress(true);
    console.log("about to do aysnc sutff");
    console.log(" about to call  the onlick handler");
    await props.onClick(event);
    console.log("Got back from click");
    setSuccess(true);
    setInProgress(false);
    setTimeout(() => {
      console.log("running the timeout callback ");
      setSuccess(false);
      console.log("finishied timeout callback");
    }, 2000);
  };

  const icon = props.icon || <SaveAltIcon />;

  return (
    <Tooltip title={props.children}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "fixed",
          bottom: 32,
          left: 32,
          zIndex: (theme) => theme.zIndex.drawer - 1,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Fab
            disabled={inProgress || (props.disabled && !success)}
            color={success ? "success" : "primary"}
            onClick={handleButtonClick}
          >
            {success ? <CheckIcon /> : icon}
          </Fab>
          {inProgress && (
            <CircularProgress
              size={68}
              color="success"
              sx={{
                position: "absolute",
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default SaveChangesButton;
