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
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { GlobalContext } from "@renderer/components/GlobalContext";
import { PageTitle } from "@renderer/components/PageTitle";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserInterfacePreferences } from "./Preferences/UserInterface";
import { DevtoolsPreferences } from "./Preferences/Devtools";
import { MyKeyboardPreferences } from "./Preferences/MyKeyboard";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            px: 3,
            width: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Preferences(props) {
  const [value, setValue] = React.useState(0);
  const globalContext = useContext(GlobalContext);

  const [connected, setConnected] = globalContext.state.connected;

  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <PageTitle title={t("app.menu.preferences")} />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "left",
          height: "100%",
          minWidth: 300,
        }}
      >
        <Tab label={t("preferences.interface")} {...a11yProps(0)} />
        <Tab
          label={t("keyboardSettings.title")}
          {...a11yProps(1)}
          disabled={!connected}
        />
        <Tab label={t("preferences.devtools")} {...a11yProps(2)} />
      </Tabs>
      <Box
        sx={{
          flexGrow: 1,
          mb: 2,
        }}
      >
        <TabPanel value={value} index={0}>
          <UserInterfacePreferences />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <MyKeyboardPreferences inContext={props.inContext} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DevtoolsPreferences />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default Preferences;
