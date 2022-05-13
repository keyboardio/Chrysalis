import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);
  const [activeDevice, setActiveDevice] = useState(null);

  const state = {
    connected: [connected, setConnected],
    darkMode: [darkMode, setDarkMode],
    device: [device, setDevice],
    activeDevice: [activeDevice, setActiveDevice],
  };

  return (
    <GlobalContext.Provider value={{ state }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
