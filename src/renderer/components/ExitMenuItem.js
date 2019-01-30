import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import i18n from "../i18n";

export default function ExitMenuItem({ onClick }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.exit} />
    </ListItem>
  );
}
