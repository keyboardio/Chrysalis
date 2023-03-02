// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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
 * along with  this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { collectLogs, logger } from "@api/log";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GlobalContext } from "@renderer/components/GlobalContext";
import { PageTitle } from "@renderer/components/PageTitle";
import { toast } from "@renderer/components/Toast";
import logo from "@renderer/logo-small.png";
import pkg from "@root/package.json";
import { ipcRenderer } from "electron";
import stringify from "json-stringify-pretty-compact";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const version = pkg.version;

function SystemInfo(props) {
  const globalContext = React.useContext(GlobalContext);
  const [activeDevice, _] = globalContext.state.activeDevice;

  const [collecting, setCollecting] = useState(false);
  const [collected, setCollected] = useState(false);
  const [info, setInfo] = useState({});
  const [viewing, setViewing] = useState(false);

  const { t } = useTranslation();
  const closeViewBundle = () => {
    setViewing(false);
    setCollected(false);
    setInfo({});
  };

  const saveBundle = async () => {
    const error = await ipcRenderer.sendSync("file.save-with-dialog", {
      content: stringify(info, { maxLength: 1024 }),
      title: t("systeminfo.dialog.title"),
      defaultPath: "chrysalis-debug.json.txt",
    });
    if (error) {
      logger().error("Error saving the debug bundle", { error: error });
      toast.error(t("errors.saveFile", { error: error }));
    } else {
      setCollected(false);
      setViewing(false);
      setInfo({});
    }
  };

  const createBundle = async () => {
    setCollecting(true);

    const sysInfo = ipcRenderer.sendSync("system-info.get");

    if (activeDevice?.focusDeviceDescriptor()) {
      sysInfo.device = {
        info: activeDevice.focusDeviceDescriptor().info,
        path: activeDevice.focus._port.path,
        commands: await activeDevice.supported_commands(),
        keymap: await activeDevice.keymap(),
        colormap: await activeDevice.colormap(),
        version: await activeDevice.version(),
      };
    }

    sysInfo.logs = await collectLogs();

    setCollecting(false);
    setCollected(true);
    setViewing(true);
    setInfo(sysInfo);
  };

  const DialogTitle = (props) => {
    const { children, ...other } = props;
    return (
      <MuiDialogTitle
        disableTypography
        sx={{
          margin: 0,
          padding: 2,
        }}
        {...other}
      >
        <Typography variant="h6">{children}</Typography>
        <Box
          sx={{
            position: "absolute",
            right: 1,
            top: 1,
          }}
        >
          <Button color="primary" onClick={saveBundle}>
            {t("systeminfo.saveBundle")}
          </Button>
          <IconButton onClick={closeViewBundle} size="large">
            <CloseIcon />
          </IconButton>
        </Box>
      </MuiDialogTitle>
    );
  };

  const viewDialog = (
    <Dialog open={viewing} scroll="paper" onClose={closeViewBundle} fullScreen>
      <DialogTitle>{t("systeminfo.title")}</DialogTitle>
      <DialogContent dividers>
        <TextField
          disabled
          multiline
          fullWidth
          value={stringify(info, { maxLength: 1024 })}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <Container>
      <PageTitle title={t("systeminfo.title")} />
      <Card sx={{ m: 4 }}>
        <CardHeader
          avatar={<img src={logo} alt={t("components.logo.altText")} />}
          title="Chrysalis"
          subheader={version}
        />
        <CardContent>
          <Typography component="p" gutterBottom>
            {t("systeminfo.intro")}
          </Typography>

          <Typography component="p">{t("systeminfo.privacyNote")}</Typography>
          <Typography component="p">
            <Link href="https://github.com/keyboardio/Chrysalis/issues">
              {t("systeminfo.bugTracker")}
            </Link>
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            disabled={collecting}
            color="primary"
            variant="outlined"
            onClick={async () => {
              return await createBundle();
            }}
          >
            {t("systeminfo.createBundle")}
          </Button>
        </CardActions>
      </Card>
      {viewDialog}
    </Container>
  );
}

export default SystemInfo;
