import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { withSnackbar } from "notistack";

import i18n from "../../i18n";

export const ImportExportDialog = withSnackbar(props => {
  const [dataState, setData] = useState();
  const data =
    dataState != undefined
      ? dataState
      : JSON.stringify(
          {
            keymap: props.keymap,
            colormap: props.colormap,
            palette: props.palette
          },
          null,
          2
        );
  const onConfirm = () => {
    try {
      props.onConfirm(JSON.parse(data));
      setData(undefined);
    } catch (e) {
      props.enqueueSnackbar(e.toString(), { variant: "error" });
    }
  };
  const onCancel = () => {
    setData(undefined);
    props.onCancel();
  };
  return (
    <Dialog
      disableBackdropClick
      open={props.open}
      onClose={onCancel}
      fullScreen
    >
      <DialogTitle>{i18n.editor.importExport}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {i18n.editor.importExportDescription}
        </Typography>
        <TextField
          disabled={props.isReadOnly}
          multiline
          fullWidth
          value={data}
          onChange={event => {
            setData(event.target.value);
          }}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={onConfirm}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
});
