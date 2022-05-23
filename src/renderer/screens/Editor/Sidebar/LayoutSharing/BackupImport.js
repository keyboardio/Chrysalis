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

export class BackupImport extends React.Component {
  state = { library: [] };

  selectBackupItem = (item) => () => {
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
    if (layoutData != null) this.props.setLayout(item, layoutData);
  };

  componentDidMount() {
    const library = ipcRenderer.sendSync(
      "backups.list-library",
      focus.focusDeviceDescriptor.info
    );

    this.setState({ library: library });
  }

  formatName = (name) => {
    const ts = new Date(parseInt(name));

    return ts.toISOString();
  };

  render() {
    const { layoutName } = this.props;
    const { library } = this.state;

    if (library.length == 0) return null;

    const layouts = library.map((name) => {
      const label = this.formatName(name);

      return (
        <MenuItem
          selected={layoutName == name}
          value={name}
          key={`backup-item-${name}`}
          onClick={this.selectBackupItem(name)}
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
  }
}
