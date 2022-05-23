import Focus from "@api/focus";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { ipcRenderer } from "electron";
import i18n from "i18next";
import React from "react";
import { loadLayout } from "./LoadLayout";

const focus = new Focus();

export const BackupImport = (props) => {
  const library = ipcRenderer.sendSync(
    "backups.list-library",
    focus.focusDeviceDescriptor.info
  );
  const selectBackupItem = (item) => () => {
    const [layoutFileData, error] = ipcRenderer.sendSync(
      "backups.load-file",
      focus.focusDeviceDescriptor.info,
      item
    );

    if (error) {
      // TODO(anyone): show toast
      console.error(error);
      return;
    }

    const layoutData = loadLayout("$userData/" + item, layoutFileData);
    if (layoutData != null) props.setLayout(item, layoutData);
  };

  const formatName = (name) => {
    const ts = new Date(parseInt(name));

    return ts.toISOString();
  };

  const { layoutName } = props;

  if (library.length == 0) return null;

  const layouts = library.map((name) => {
    const label = formatName(name);

    return (
      <MenuItem
        selected={layoutName == name}
        value={name}
        key={`backup-item-${name}`}
        onClick={selectBackupItem(name)}
      >
        {label}
      </MenuItem>
    );
  });

  return (
    <Box sx={{ sb: 2 }}>
      <Typography variant="h5">
        {i18n.t("editor.sharing.loadFromBackup")}
      </Typography>
      <MenuList>{layouts}</MenuList>

      <Divider />
    </Box>
  );
};
