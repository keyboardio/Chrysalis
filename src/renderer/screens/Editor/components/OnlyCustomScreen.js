// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2021  Keyboardio, Inc.
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

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Portal from "@material-ui/core/Portal";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Focus from "../../../../api/focus";
import openURL from "../../../utils/openURL";
import i18n from "../../../i18n";
import { navigate } from "../../../routerHistory";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    margin: theme.spacing(4),
    maxWidth: "50%"
  },
  grow: {
    flexGrow: 1
  }
});

class OnlyCustomScreen extends React.Component {
  enableOnlyCustom = async () => {
    let focus = new Focus();
    await focus.command("keymap.onlyCustom", true);
    await focus.command("settings.defaultLayer", 0);
    await navigate("/editor");
  };

  openFeatureRequest = async () => {
    const url =
      "https://github.com/keyboardio/Chrysalis/issues/new?labels=enhancement&template=feature_request.md";
    const opener = openURL(url);

    await opener();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.t("app.actionRequired")}
        </Portal>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="p" gutterBottom>
              {i18n.t("editor.onlyCustom.warning")}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <Box component="span" mr={1}>
              <Button
                color="default"
                onClick={this.openFeatureRequest}
                variant="outlined"
              >
                {i18n.t("editor.onlyCustom.openFR")}
              </Button>
            </Box>
            <div className={classes.grow} />
            <Button
              onClick={this.enableOnlyCustom}
              color="primary"
              variant="outlined"
            >
              {i18n.t("editor.onlyCustom.fixItButton")}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(OnlyCustomScreen);
