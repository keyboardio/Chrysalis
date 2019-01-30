import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardIcon from "@material-ui/icons/Keyboard";

export default function KeyboardMenuItem({
  keyboardSelectText,
  selected,
  onClick
}) {
  return (
    <ListItem button selected={selected} onClick={onClick}>
      <ListItemIcon>
        <KeyboardIcon />
      </ListItemIcon>
      <ListItemText primary={keyboardSelectText} />
    </ListItem>
  );
}
