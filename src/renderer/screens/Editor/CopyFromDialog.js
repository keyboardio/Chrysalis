// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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

import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import i18n from "../../i18n";

export const CopyFromDialog = props => {
  const [selectedLayer, setSelectedLayer] = useState(-1);
  return (
    <Dialog
      disableBackdropClick
      open={props.open}
      onClose={props.onCancel}
      fullWidth
    >
      <DialogTitle>{i18n.editor.copyFrom}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {i18n.editor.pleaseSelectLayer}
        </Typography>
        <List>
          {props.layers.map(layer => {
            return (
              <ListItem
                key={layer.index}
                button
                disabled={layer.index == props.currentLayer}
                selected={layer.index == selectedLayer}
                onClick={() => {
                  setSelectedLayer(layer.index);
                }}
              >
                <ListItemText inset primary={layer.label} />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            setSelectedLayer(-1);
            props.onCancel();
          }}
        >
          {i18n.dialog.cancel}
        </Button>
        <Button
          onClick={() => {
            const layer = selectedLayer;
            setSelectedLayer(-1);
            props.onCopy(layer);
          }}
          color="primary"
          disabled={selectedLayer == -1}
        >
          {i18n.dialog.ok}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
