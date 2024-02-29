import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GlobalContext } from "@renderer/components/GlobalContext";
import exportKeyboardConfigToFile from "@renderer/utils/exportKeyboardConfigToFile";
import React from "react";
import { useTranslation } from "react-i18next";

export const ExportToFile = (props) => {
  const { t } = useTranslation();
  const globalContext = React.useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;
  return (
    <Box sx={{ mb: 2 }}>
      <Button
        variant="outlined"
        onClick={() => {
          exportKeyboardConfigToFile(activeDevice);
        }}
      >
        {t("editor.sharing.exportToFile")}
      </Button>
    </Box>
  );
};
