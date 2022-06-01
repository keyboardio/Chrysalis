// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";

const Store = require("electron-store");
const settings = new Store();

const memoize = (factory, ctx) => {
  var cache = {};
  return (key) => {
    if (!(key in cache)) {
      cache[key] = factory.call(ctx, key);
    }
    return cache[key];
  };
};

const colorToRGBA = (() => {
  var canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  var ctx = canvas.getContext("2d");

  return memoize((col) => {
    ctx.clearRect(0, 0, 1, 1);
    // In order to detect invalid values,
    // we can't rely on col being in the same format as what fillStyle is computed as,
    // but we can ask it to implicitly compute a normalized value twice and compare.
    ctx.fillStyle = "#000";
    ctx.fillStyle = col;
    var computed = ctx.fillStyle;
    ctx.fillStyle = "#fff";
    ctx.fillStyle = col;
    if (computed !== ctx.fillStyle) {
      return; // invalid color
    }
    ctx.fillRect(0, 0, 1, 1);
    return [...ctx.getImageData(0, 0, 1, 1).data];
  });
})();

const ModeCardBase = (props) => {
  const { t } = useTranslation();
  const { raised, onClick, name, image, ...rest } = props;

  return (
    <Card raised={raised} {...rest}>
      <CardActionArea onClick={onClick}>
        <CardMedia height="66">{image}</CardMedia>
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            {t(`preferences.ui.theme.${name}`)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ModeCard = styled(ModeCardBase)((props) => {
  const { theme, raised } = props;

  if (raised) {
    const color = colorToRGBA(theme.palette.primary[theme.palette.mode]);
    return {
      width: 120,
      marginLeft: `${theme.spacing(2)}`,
      marginRight: `${theme.spacing(2)}`,
      boxShadow: `0px 5px 5px -3px rgb(${color[0]} ${color[1]} ${color[2]} / 40%),
                  0px 8px 10px 1px rgb(${color[0]} ${color[1]} ${color[2]} / 28%),
                  0px 3px 14px 2px rgb(${color[0]} ${color[1]} ${color[2]} / 24%)`,
    };
  } else {
    return {
      width: 120,
      marginLeft: `${theme.spacing(2)}`,
      marginRight: `${theme.spacing(2)}`,
    };
  }
});

function LookAndFeelPreferences(props) {
  const { t, i18n } = useTranslation();
  const globalContext = React.useContext(GlobalContext);
  const [theme, setTheme] = globalContext.state.theme;
  const [language, setLanguage] = useState(i18n.language);

  const changeTheme = (name) => (event) => {
    settings.set("ui.theme", name);
    setTheme(name);
  };

  const updateLanguage = async (event) => {
    i18n.changeLanguage(event.target.value);
    await settings.set("ui.language", event.target.value);
    // We stick language in the state system to get rerenders when it changes
    if (i18n.language !== event.target.value) {
      setLanguage(event.target.value);
    }
  };

  const languages = Object.keys(i18n.options.resources).map((code) => {
    const t = i18n.getFixedT(code);
    return (
      <MenuItem value={code} key={code}>
        {t("language")}
      </MenuItem>
    );
  });

  const systemSvg = (
    <svg
      width="120"
      height="73"
      viewBox="0 0 120 73"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path d="M0 0L120 73H0V0Z" fill="#1B1B1B" />
      <path d="M120 73L5.94475e-06 -7.78063e-06L120 0L120 73Z" fill="#EDEDED" />
    </svg>
  );

  const solidSvg = (color) => (
    <svg
      width="120"
      height="73"
      viewBox="0 0 120 73"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill={color} />
    </svg>
  );

  const lightSvg = solidSvg("#EDEDED");
  const darkSvg = solidSvg("#1b1b1b");

  return (
    <PreferenceSection name="ui.lookNFeel">
      <Typography sx={{ my: "auto" }} variant="body1">
        {t("preferences.ui.theme.label")}
      </Typography>
      <Box sx={{ display: "inline-flex", my: 2 }}>
        <ModeCard
          name="system"
          image={systemSvg}
          raised={theme == "system"}
          onClick={changeTheme("system")}
        />
        <ModeCard
          name="light"
          image={lightSvg}
          raised={theme == "light"}
          onClick={changeTheme("light")}
        />
        <ModeCard
          name="dark"
          image={darkSvg}
          raised={theme == "dark"}
          onClick={changeTheme("dark")}
        />
      </Box>
      <Divider sx={{ my: 2, mx: -2 }} />
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ my: "auto" }} variant="body1">
          {t("preferences.ui.language.help")}
        </Typography>
        <span style={{ flexGrow: 1 }} />
        <Select
          size="small"
          value={language}
          onChange={updateLanguage}
          sx={{ minWidth: "10em" }}
        >
          {languages}
        </Select>
      </Box>
    </PreferenceSection>
  );
}

export { LookAndFeelPreferences as default };
