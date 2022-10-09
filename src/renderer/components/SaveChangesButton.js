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

import { logger } from "@api/log";

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
    logger().debug("about to do async stuff", { label: "save-changes" });
    logger().debug("about to call the onlick handler", {
      label: "save-changes",
    });
    try {
      await props.onClick(event);
    } catch (e) {
      return props.onError(e);
    }
    logger().debug("Got back from click", { label: "save-changes" });

    setSuccess(true);
    setInProgress(false);
    setTimeout(() => {
      logger().debug("running the timeout callback", { label: "save-changes" });
      setSuccess(false);
      logger().debug("finishied timeout callback", { label: "save-changes" });
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
