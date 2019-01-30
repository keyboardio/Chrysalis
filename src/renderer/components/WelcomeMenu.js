import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from "@material-ui/icons/Info";
import i18n from "../i18n";

export default function WelcomeMenu({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.welcome} />
    </ListItem>
  );
}
