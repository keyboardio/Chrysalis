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
import Grid from "@mui/material/Grid";

import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { version } from "@root/package.json";
import { ipcRenderer } from "electron";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import FirmwareChangesDialog from "./FirmwareChangesDialog";
import Link from "@mui/material/Link";

const FirmwareSelect = (props) => {
  const { t } = useTranslation();

  const [changelogOpen, setChangelogOpen] = useState(false);
  const [selected, setSelected] = props.selectedFirmware;
  const [firmwareFilename, setFirmwareFilename] = props.firmwareFilename;
  const [firmwareVersion, setFirmwareVersion] = useState(version);
  const [firmwareChangelog, setFirmwareChangelog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const v = await ipcRenderer.sendSync("firmware.get-version");
      setFirmwareVersion(v);

      const c = await ipcRenderer.sendSync("firmware.get-changelog");
      setFirmwareChangelog(c);
    };
    fetchData();
  }, []);

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
              label={t("firmwareUpdate.defaultFirmwareDescription")}
            />
            <Typography sx={{ color: "text.secondary", ml: 1 }}>
              {t("firmwareUpdate.firmwareVersion", {
                version: firmwareVersion,
              })}
            </Typography>
            <Typography variant="subtitle2" sx={{ ml: 1, mt: 1 }}>
              {t("firmwareUpdate.defaultFirmwareExplanation")}

              <Grid container justifyContent="flex-end">
                <Button
                  sx={{}}
                  color="info"
                  onClick={() => setChangelogOpen(true)}
                >
                  {t("firmwareUpdate.firmwareChangelog.view", {
                    version: firmwareVersion,
                  })}
                </Button>
              </Grid>
            </Typography>
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label={t("firmwareUpdate.custom")}
            />
            <Typography sx={{ color: "text.secondary", ml: 1 }}>
              {filename}
            </Typography>
            <Typography variant="subtitle2" sx={{ ml: 1, mt: 1 }}>
              {t("firmwareUpdate.customFirmwareExplanation")}
            </Typography>
            <Grid container justifyContent="flex-end">
              <Button
                href="https://kaleidoscope.readthedocs.io/"
                color="info"
                target="_blank"
              >
                {t("firmwareUpdate.customFirmwareLinkText")}
              </Button>
            </Grid>
          </RadioGroup>
          <Box></Box>
        </Box>
      </FormControl>
      <FirmwareChangesDialog
        open={changelogOpen}
        changelog={firmwareChangelog}
        onClose={() => setChangelogOpen(false)}
      />
    </>
  );
};

export default FirmwareSelect;
