import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import i18n from "../i18n";

export default function SettingsMenuItem({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.settings} />
    </ListItem>
  );
}
