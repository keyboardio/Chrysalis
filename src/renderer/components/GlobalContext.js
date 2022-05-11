import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [state, setState] = useState({
    connected: false,
    device: null,
    pages: {},
  });

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
