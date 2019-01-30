import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import i18n from "../i18n";

export default function KeymapMenuItem({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemIcon>
        <KeyboardIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.layoutEditor} />
    </ListItem>
  );
}
