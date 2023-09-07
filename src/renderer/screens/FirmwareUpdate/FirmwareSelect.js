import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import pkg from "@root/package.json";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FirmwareChangesDialog from "./FirmwareChangesDialog";

const version = pkg.version;

const FirmwareSelect = (props) => {
  const { t } = useTranslation();
  const [changelogOpen, setChangelogOpen] = useState(false);
  const [selected, setSelected] = props.selectedFirmware;
  const [firmwareFilename, setFirmwareFilename] = props.firmwareFilename;
  const [firmwareVersion, setFirmwareVersion] = useState(version);
  const [firmwareChangelog, setFirmwareChangelog] = useState(null);

  const downloadFirmware = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      setFirmwareFilename(blob);
    } catch (error) {
      console.error("An error occurred while downloading the firmware:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Handling file upload: ", file);
    setFirmwareFilename(file.name);
  };

  const selectFirmware = (event) => {
    setSelected(event.target.value);
    if (event.target.value !== "custom") {
      return setFirmwareFilename("");
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
        <Typography variant="h6">
          {t("firmwareUpdate.chooseFirmware")}
        </Typography>
        <Box sx={{ display: "flex", width: "100%" }}>
          <RadioGroup
            sx={{ ml: 2, width: "100%" }}
            value={selected}
            onChange={selectFirmware}
          >
            <Grid container justifyContent="flex-start">
              <FormControlLabel
                value="default"
                control={<Radio />}
                label={
                  <Typography sx={{ ml: 0 }}>
                    {t("firmwareUpdate.defaultFirmwareDescription")} ({""}
                    {t("firmwareUpdate.firmwareVersion", {
                      version: firmwareVersion,
                    })}
                    )
                  </Typography>
                }
              />
              <Box sx={{ width: "1rem" }} />

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
            <Grid container justifyContent="flex-start">
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label={
                  <Typography sx={{ ml: 0 }}>
                    {t("firmwareUpdate.custom")}{" "}
                    {filename ? `(${filename})` : ""}
                  </Typography>
                }
              />
              <Box sx={{ width: "1rem" }} />
              <Button
                href="https://kaleidoscope.readthedocs.io/"
                color="info"
                target="_blank"
              >
                {t("firmwareUpdate.customFirmwareLinkText")}
              </Button>
            </Grid>
            <Grid container justifyContent="flex-start">
              <FormControlLabel
                value="fromURL"
                control={<Radio />}
                label={
                  <Typography sx={{ ml: 0 }}>
                    {t("firmwareUpdate.fromURL")}
                  </Typography>
                }
              />
              <Box sx={{ width: "1rem" }} />
              <Button
                color="info"
                onClick={() =>
                  downloadFirmware("https://example.com/firmware.hex")
                }
              >
                {t("firmwareUpdate.downloadFirmwareLinkText")}
              </Button>
            </Grid>
            <Grid container justifyContent="flex-start">
              <FormControlLabel
                value="fromFile"
                control={<Radio />}
                label={
                  <Typography sx={{ ml: 0 }}>
                    {t("firmwareUpdate.fromFile")}
                  </Typography>
                }
              />
              <Box sx={{ width: "1rem" }} />
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".hex, .bin"
                id="fileUpload"
              />
              <label htmlFor="fileUpload">
                <Button color="info" component="span">
                  {t("firmwareUpdate.uploadFirmwareLinkText")}
                </Button>
              </label>
            </Grid>
          </RadioGroup>
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
