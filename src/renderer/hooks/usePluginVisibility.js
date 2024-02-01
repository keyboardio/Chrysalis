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

import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "@renderer/components/GlobalContext";

import { Store } from "@renderer/localStore";
const settings = new Store();

export default function usePluginVisibility(plugin) {
  const globalContext = useContext(GlobalContext);
  const [activeDevice, _] = globalContext.state.activeDevice;
  const [pluginSupported, setPluginSupported] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // if called without a plugin, it's a built in category. always return true.
      if (!plugin) setPluginSupported(true);
      const plugins = await activeDevice.plugins();
      const hideUnavailableFeatures = settings.get("ui.hideFeaturesNotAvailableInCurrentFirmware", true);
      const commands = await activeDevice.supported_commands();

      if (commands.includes("plugins")) {
        setPluginSupported(!hideUnavailableFeatures || plugins.includes(plugin));
      } else {
        setPluginSupported(!hideUnavailableFeatures);
      }
    };
    fetchData();
  }, [activeDevice, plugin]);

  return pluginSupported;
}
