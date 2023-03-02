// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import ErrorIcon from "@mui/icons-material/Error";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { PageTitle } from "@renderer/components/PageTitle";
import { navigate } from "@renderer/routerHistory";
import openURL from "@renderer/utils/openURL";
import pkg from "@root/package.json";
import fs from "fs";
import path from "path";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import semver from "semver";
import { getStaticPath } from "@renderer/config";

const devDependencies = pkg.devDependencies;

const SanityCheck = (props) => {
  const { t } = useTranslation();
  const [sanityChecked, setSanityChecked] = useState(false);
  const [sanityOk, setSanityOk] = useState(false);

  useEffect(() => {
    const sanityCheck = async () => {
      const checkFile = path.join(getStaticPath(), "logo.png");
      const allOk =
        semver.satisfies(
          process.versions.electron,
          devDependencies["electron"]
        ) && fs.existsSync(checkFile);
      setSanityOk(allOk);
      setSanityChecked(true);
    };

    sanityCheck();
  });

  if (!sanityChecked) return null;

  if (sanityOk) {
    navigate("/keyboard-select");
    return null;
  }

  const onClick = () => {
    openURL("https://github.com/keyboardio/Chrysalis/releases/latest")();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PageTitle title={t("sanity-check.title")} />
      <Card
        sx={{
          margin: 4,
          maxWidth: "50%",
        }}
      >
        <CardHeader
          avatar={<ErrorIcon color="error" fontSize="large" />}
          title={t("sanity-check.header")}
          titleTypographyProps={{ variant: "h6" }}
        />
        <CardContent>
          <Typography component="p" gutterBottom>
            {t("sanity-check.message")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={onClick}>
            {t("sanity-check.download-latest")}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export { SanityCheck as default };
