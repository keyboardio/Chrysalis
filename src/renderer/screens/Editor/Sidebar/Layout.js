// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { KeymapDB } from "../../../../api/keymap";
const db = new KeymapDB();

const styles = () => ({
  accordionRoot: {
    boxShadow: "none",
    margin: "auto",
    "&.Mui-expanded": {
      margin: "auto"
    },
    "&:before": {
      display: "none"
    }
  },
  accordionContentRoot: {
    padding: 0
  },
  accordionDetailsRoot: {
    padding: 0,
    display: "block"
  }
});

class LayoutBase extends React.Component {
  state = {
    expanded: false
  };

  handleChange = () => {
    return this.setState(oldState => ({
      expanded: !oldState.expanded
    }));
  };

  setLayout = event => {
    const layout = event.target.value || this.props.layout;
    this.props.setLayout(layout);
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    const layoutMenu = db.getSupportedLayouts().map((layout, index) => {
      const menuKey = "layout-menu-" + index.toString();
      return (
        <MenuItem value={layout} key={menuKey}>
          <ListItemText primary={layout} />
        </MenuItem>
      );
    });
    const layoutSelect = (
      <FormControl>
        <Select value={this.props.layout} onClick={this.setLayout} autoWidth>
          {layoutMenu}
        </Select>
      </FormControl>
    );

    return (
      <React.Fragment>
        <Accordion
          square
          expanded={expanded}
          classes={{ root: classes.accordionRoot }}
          onChange={this.handleChange}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{ root: classes.accordionContentRoot }}
          >
            <Typography>Layout</Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
            {layoutSelect}
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    );
  }
}
const Layout = withStyles(styles, { withTheme: true })(LayoutBase);

export { Layout as default };
