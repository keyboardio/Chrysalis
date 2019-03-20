import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  const [copySuccess, setCopySuccess] = useState(false);

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

  function onConfirm() {
    try {
      props.onConfirm(JSON.parse(data));
      setData(undefined);
    } catch (e) {
      props.enqueueSnackbar(e.toString(), { variant: "error" });
    }
  }

  function onCancel() {
    setData(undefined);
    props.onCancel();
  }

  function onCopySuccess() {
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  }

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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          {copySuccess && (
            <div style={{ color: "#00BE00", padding: "0px 10px" }}>
              {i18n.editor.copySuccess}
            </div>
          )}
          <CopyToClipboard text={data} onCopy={onCopySuccess}>
            <Button color="primary">{i18n.editor.copyToClipboard}</Button>
          </CopyToClipboard>
        </div>
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
