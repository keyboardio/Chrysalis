import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FirmwareChangesDialog from "./FirmwareChangesDialog";

import yaml from "js-yaml";

// Function to load and parse YAML file
async function loadYamlFile(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const data = yaml.load(text);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

const FirmwareSelect = (props) => {
  const { t } = useTranslation();

  const buildInfoURL = "./assets/firmware/build-info.yml"; // Adjust the URL/path as needed

  const changelogURL = "./assets/firmware/firmware-changelog.md"; // Adjust the URL/path as needed

  const [changelogOpen, setChangelogOpen] = useState(false);
  const [selected, setSelected] = props.selectedFirmware;
  const [firmwareFilename, setFirmwareFilename] = props.firmwareFilename;
  const [firmwareVersion, setFirmwareVersion] = useState(null);
  const [firmwareChangelog, setFirmwareChangelog] = useState(null);
  const [firmwareContent, setFirmwareContent] = props.firmwareContent;
  const [selectedValue, setSelectedValue] = useState("default");

  useEffect(() => {
    const loadYamlFile = async (url) => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        const yamlData = yaml.load(text);
        return yamlData ? yamlData.version : null;
      } catch (e) {
        console.error(e);
        return null;
      }
    };

    loadYamlFile(buildInfoURL).then((version) => {
      setFirmwareVersion(version);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const loadFirmwareChangelog = async (url) => {
      try {
        const response = await fetch(url);
        const text = await response.text();
        return text;
      } catch (e) {
        console.error(e);
        return null;
      }
    };

    loadFirmwareChangelog(changelogURL).then((text) => {
      setFirmwareChangelog(text);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

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

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const bytes = new Uint8Array(arrayBuffer);
      setFirmwareContent(bytes);
    };
    reader.readAsArrayBuffer(file);
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
        <Typography variant="h6">{t("firmwareUpdate.chooseFirmware")}</Typography>
        <Box sx={{ display: "flex", width: "100%" }}>
          <RadioGroup sx={{ ml: 2, width: "100%" }} value={selected} onChange={selectFirmware}>
            <Grid container justifyContent="flex-start">
              <FormControlLabel
                value="default"
                checked={selectedValue === "default"}
                onChange={handleRadioChange}
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

              <Button color="info" onClick={() => setChangelogOpen(true)}>
                {t("firmwareUpdate.firmwareChangelog.view", {
                  version: firmwareVersion,
                })}
              </Button>
            </Grid>
            <Grid container justifyContent="flex-start">
              <FormControlLabel
                value="custom"
                checked={selectedValue === "custom"}
                onChange={handleRadioChange}
                control={<Radio />}
                label={
                  <Typography sx={{ ml: 0 }}>
                    {t("firmwareUpdate.custom")} {filename ? `(${filename})` : ""}
                  </Typography>
                }
              />
              <Box sx={{ width: "1rem" }} />
              <Button href="https://kaleidoscope.readthedocs.io/" color="info" target="_blank">
                {t("firmwareUpdate.customFirmwareLinkText")}
              </Button>
            </Grid>

            {selectedValue === "custom" && (
              <Grid container justifyContent="flex-start">
                <Box sx={{ width: "1rem" }} />
                <input type="file" onChange={handleFileUpload} accept=".hex, .bin" id="fileUpload" />
              </Grid>
            )}
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
