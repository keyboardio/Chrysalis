import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { GlobalContext } from "@renderer/components/GlobalContext";
import exportKeyboardConfigToFile from "@renderer/utils/exportKeyboardConfigToFile";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const ExportToFile = (props) => {
  const { t } = useTranslation();
  const globalContext = React.useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;
  const [working, setWorking] = useState(false);

  const doExport = async (activeDevice) => {
    setWorking(true);
    const structured_dump = await activeDevice.focus.readKeyboardConfiguration();
    await exportKeyboardConfigToFile(activeDevice, structured_dump);
    setWorking(false);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button variant="outlined" onClick={() => doExport(activeDevice)} disabled={working}>
        {working ? t("editor.sharing.exporting") : t("editor.sharing.exportToFile")}
      </Button>
    </Box>
  );
};
