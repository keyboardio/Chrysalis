import React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import i18n from "../../../i18n";

export const LegacyAlert = (migrateLegacy) => {
  return (
    <Alert
      severity="error"
      action={
        <Button color="primary" onClick={migrateLegacy}>
          {i18n.t("editor.legacy.migrate")}
        </Button>
      }
      sx={{
        zIndex: "modal",
        position: "relative",
      }}
    >
      <Typography component="p">{i18n.t("editor.legacy.warning")}</Typography>
    </Alert>
  );
};
