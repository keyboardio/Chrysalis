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

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { version } from "@root/package.json";
import { ipcRenderer } from "electron";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import FirmwareChangesDialog from "./FirmwareChangesDialog";

const FirmwareSelect = (props) => {
  const { t } = useTranslation();

  const [changelogOpen, setChangelogOpen] = useState(false);
  const [selected, setSelected] = props.selectedFirmware;
  const [firmwareFilename, setFirmwareFilename] = props.firmwareFilename;

  const selectFirmware = (event) => {
    setSelected(event.target.value);
    if (event.target.value != "custom") {
      return setFirmwareFilename("");
    }

    const [fileName, fileData] = ipcRenderer.sendSync("file.open-with-dialog", {
      title: t("firmwareUpdate.dialog.selectFirmware"),
      filters: [
        {
          name: t("firmwareUpdate.dialog.firmwareFiles"),
          extensions: ["hex", "bin"],
        },
        {
          name: t("firmwareUpdate.dialog.allFiles"),
          extensions: ["*"],
        },
      ],
    });

    if (fileName) {
      setFirmwareFilename(fileName);
    }
  };

  let filename = null;
  if (firmwareFilename) {
    filename = firmwareFilename.split(/[\\/]/);
    filename = filename[filename.length - 1];
  }

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="h6">
            {t("firmwareUpdate.chooseFirmware")}
          </Typography>
        </FormLabel>
        <Box sx={{ display: "flex" }}>
          <RadioGroup sx={{ ml: 2 }} value={selected} onChange={selectFirmware}>
            <FormControlLabel
              value="default"
              control={<Radio />}
              label={
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={t("firmwareUpdate.defaultFirmwareDescription")}
                  secondary={t("firmwareUpdate.firmwareVersion", {
                    version: version,
                  })}
                />
              }
            />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label={
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={t("firmwareUpdate.custom", {
                    version: version,
                  })}
                  secondary={filename || t("firmwareUpdate.customChooseFile")}
                />
              }
            />
          </RadioGroup>
          <Box>
            <Button color="info" onClick={() => setChangelogOpen(true)}>
              {t("firmwareUpdate.firmwareChangelog.view")}
            </Button>
          </Box>
        </Box>
      </FormControl>
      <FirmwareChangesDialog
        open={changelogOpen}
        onClose={() => setChangelogOpen(false)}
      />
    </>
  );
};

export default FirmwareSelect;
