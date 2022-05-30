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

import Skeleton from "@mui/material/Skeleton";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";
import PreferenceSwitch from "../components/PreferenceSwitch";

const Store = require("electron-store");
const settings = new Store();

function LayoutCardsPreferences(props) {
  const { t, i18n } = useTranslation();

  const [coloredLayoutCards, setColoredLayoutCards] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggleColoredLayoutCards = () => {
    settings.set("ui.layoutCards.colored", !coloredLayoutCards);
    setColoredLayoutCards(!coloredLayoutCards);
  };

  useEffect(() => {
    const initialize = async () => {
      await setColoredLayoutCards(settings.get("ui.layoutCards.colored"));
      await setLoaded(true);
    };

    initialize();
  }, [loaded]);

  return (
    <PreferenceSection name="ui.layoutCards">
      {loaded ? (
        <PreferenceSwitch
          option="ui.coloredLayoutCards"
          checked={coloredLayoutCards}
          onChange={toggleColoredLayoutCards}
        />
      ) : (
        <Skeleton variant="text" width="100%" height={56} />
      )}
    </PreferenceSection>
  );
}

export { LayoutCardsPreferences as default };
