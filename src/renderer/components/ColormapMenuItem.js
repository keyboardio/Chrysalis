import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HighlightIcon from "@material-ui/icons/Highlight";
import i18n from "../i18n";

export default function ColormapMenuItem({ selected, onClick }) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemIcon>
        <HighlightIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.colormapEditor} />
    </ListItem>
  );
}
