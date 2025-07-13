import logger from "@renderer/utils/Logger";
import React from "react";
import { useTranslation } from "react-i18next";
import { loadLayout } from "./LoadLayout";
import { FileUpload } from "../../../../components/FileUpload";

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export const FileImport = (props) => {
  const { t } = useTranslation();

  const options = [
    {
      menuText: t("editor.sharing.loadFullSettingsFromFileOption"),
      buttonText: t("editor.sharing.loadFullSettingsFromFile"),
      id: "fullSettings",
    },
    {
      menuText: t("editor.sharing.loadLayoutFromFileOption"),
      buttonText: t("editor.sharing.loadLayoutFromFile"),
      id: "layoutOnly",
    },
  ];
  const optionIndices = Object.fromEntries(
      options.map((option, i) => [option.id, i])
  );

  const loadFile = async (fileData, fileName) => {
    const layoutData = await loadLayout(fileName, fileData);
    if (layoutData != null) {
      if (selectedIndex === optionIndices.fullSettings) {
        const config = JSON.parse(fileData).deviceConfiguration;
        if (config) {
          delete config["keymap.custom"]
          layoutData.settings = config
        }
      }
      props.onRestore(layoutData);
    }
    logger.log("finally returned ", layoutData);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  return (
    <Box sx={{mb: 2}}>
    <ButtonGroup variant="contained">
      <FileUpload onLoad={loadFile}>
        {options[selectedIndex].buttonText}
      </FileUpload>
      <Button onClick={handleToggle} ref={anchorRef}>
        <ArrowDropDownIcon />
      </Button>
    </ButtonGroup>
    <Popper
      sx={{ zIndex: 1 }}
      open={open}
      anchorEl={anchorRef.current}
      disablePortal
    >
      {({ placement }) => (
        <Paper sx={{transformOrigin:
          placement === 'bottom' ? 'center top' : 'center bottom',
        }}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem>
              {options.map((option, index) => (
                <MenuItem
                  key={option.menuText}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option.menuText}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      )}
    </Popper>
    </Box>
  );
};
