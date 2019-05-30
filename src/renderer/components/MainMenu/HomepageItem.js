import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ComputerIcon from "@material-ui/icons/Computer";
import i18n from "../../i18n";

HomepageItem.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default function HomepageItem({ onClick, className }) {
  return (
    <ListItem button onClick={onClick} className={className}>
      <ListItemIcon>
        <ComputerIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.homepage} />
    </ListItem>
  );
}
