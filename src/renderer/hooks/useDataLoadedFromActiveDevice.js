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

const useDataLoadedFromActiveDevice = (initialize) => {
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const channel = new BroadcastChannel("context_bar");
    channel.onmessage = async (event) => {
      if (event.data === "changes-discarded") {
        await initialize(activeDevice.focus, activeDevice);
      }
    };

    const init = async () => {
      await initialize(activeDevice.focus, activeDevice);
      setInitialized(true);
    };

    if (!initialized) init();

    return () => {
      channel.close();
    };
  }, [activeDevice, initialize, initialized]);

  return initialized;
};

export { useDataLoadedFromActiveDevice as default };
