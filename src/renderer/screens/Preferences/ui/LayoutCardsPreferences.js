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

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";
import PreferenceSwitch from "../components/PreferenceSwitch";

const Store = require("@renderer/localStore");
const settings = new Store();

function LayoutCardsPreferences(props) {
  const { t, i18n } = useTranslation();

  const [coloredLayoutCards, setColoredLayoutCards] = useState(false);
  const [oneLayerPerPage, setOneLayerPerPage] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const toggleColoredLayoutCards = () => {
    settings.set("ui.layoutCards.colored", !coloredLayoutCards);
    setColoredLayoutCards(!coloredLayoutCards);
  };

  const toggleOneLayerPerPage = (event) => {
    settings.set("ui.layoutCards.oneLayerPerPage", event.target.checked);
    setOneLayerPerPage(event.target.checked);
  };

  useEffect(() => {
    const initialize = async () => {
      await setColoredLayoutCards(settings.get("ui.layoutCards.colored"));
      await setOneLayerPerPage(
        settings.get("ui.layoutCards.oneLayerPerPage", false)
      );
      await setLoaded(true);
    };

    initialize();
  }, [loaded]);

  return (
    <PreferenceSection name="ui.layoutCards">
      <PreferenceSwitch
        loaded={loaded}
        option="ui.coloredLayoutCards"
        checked={coloredLayoutCards}
        onChange={toggleColoredLayoutCards}
      />
      <PreferenceSwitch
        loaded={loaded}
        option="ui.oneLayerPerPage"
        checked={oneLayerPerPage}
        onChange={toggleOneLayerPerPage}
      />
    </PreferenceSection>
  );
}

export { LayoutCardsPreferences as default };
