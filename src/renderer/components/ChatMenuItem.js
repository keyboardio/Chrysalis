import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChatIcon from "@material-ui/icons/Chat";
import i18n from "../i18n";

export default function ChatMenuItem({ onClick }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.chat} />
    </ListItem>
  );
}
