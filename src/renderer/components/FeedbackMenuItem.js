import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FeedbackIcon from "@material-ui/icons/Feedback";
import i18n from "../i18n";

export default function FeedbackMenuItem({ onClick }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.feedback} />
    </ListItem>
  );
}
