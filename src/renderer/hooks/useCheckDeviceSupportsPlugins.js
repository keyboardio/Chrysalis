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

import { GlobalContext } from "@renderer/components/GlobalContext";
import { useContext, useEffect, useState } from "react";

const useCheckDeviceSupportsPlugins = (desiredPlugins) => {
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;
  const [connected, setConnected] = globalContext.state.connected;
  const [foundPlugins, setFoundPlugins] = useState({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const plugins = await activeDevice.plugins();
      const commands = await activeDevice.supported_commands();
      const found = {};

      for (const p of desiredPlugins) {
        found[p] = plugins.includes(p) || commands.includes(p);
      }

      setFoundPlugins(found);
      setInitialized(true);
    };
    if (!connected) {
      setInitialized(false);
    } else {
      if (!initialized) init();
    }
  }, [activeDevice, connected, desiredPlugins, initialized]);

  return [initialized, foundPlugins];
};

export { useCheckDeviceSupportsPlugins as default };
