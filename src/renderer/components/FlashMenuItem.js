import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import i18n from "../i18n";

export default function FlashMenuItem({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemIcon>
        <CloudUploadIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.firmwareUpdate} />
    </ListItem>
  );
}
