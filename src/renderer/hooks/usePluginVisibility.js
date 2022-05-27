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

export default function usePluginVisibility(plugin) {
  const globalContext = useContext(GlobalContext);
  const [activeDevice, _] = globalContext.state.activeDevice;
  const [pluginSupported, setPluginSupported] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const plugins = await activeDevice.plugins();
      setPluginSupported(plugins.includes(plugin));
    };
    fetchData();
  }, [activeDevice, plugin]);

  return pluginSupported;
}
