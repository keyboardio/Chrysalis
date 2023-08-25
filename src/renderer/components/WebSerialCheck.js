import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
const webSerialSupported = !!navigator.serial;

export const WebSerialCheck = () => {
  const [modalOpen, setModalOpen] = useState(!webSerialSupported);

  const handleClose = () => setModalOpen(false);

  if (!webSerialSupported) {
    // Show a MUI banner that warns that this only works if web serial is enabled
    return (
      <Modal open={modalOpen} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          <h1>Chrysalis requires WebSerial support to function</h1>
          <p>
            Unfortunately, your browser doesn't support the WebSerial standard.
            You'll need to use a Chromium-based browser like Chrome, Chromium,
            Edge, Arc or Brave to flash or configure your keyboard.
          </p>
        </Alert>
      </Modal>
    );
  }
};
