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
import ReactMarkdown from "react-markdown";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Portal from "@mui/material/Portal";

import Electron from "electron";

import logo from "../logo-small.png";
import { version } from "../../../package.json";

import fs from "fs";
import path from "path";

import { getStaticPath } from "../config";
import i18n from "../i18n";

import { PageTitle } from "../components/PageTitle";

const ChangeLog = (props) => {
  const { classes } = props;
  const file = path.join(getStaticPath(), "../NEWS.md");
  const data = fs.readFileSync(file).toString();

  return (
    <div>
      <PageTitle title={i18n.t("changelog.title")} />
      <Card sx={{ margin: "auto", maxWidth: "50%" }}>
        <CardHeader
          avatar={<img src={logo} alt={i18n.t("components.logo.altText")} />}
          title="Chrysalis"
          subheader={version}
        />
        <CardContent>
          <ReactMarkdown
            components={{
              h1({ node, ...props }) {
                return (
                  <h1 sx={{ textDecoration: "underline" }}>
                    {node.children[0].value}
                  </h1>
                );
              },
            }}
          >
            {data}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangeLog;
