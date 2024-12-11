import React, { createContext, useState } from "react";

export const rootContext = createContext();

export default function HeaderContextProvider({ children }) {
  const [isScrolledDown, setIsScrolledDown] = useState();
  return (
    <rootContext.Provider value={{ isScrolledDown, setIsScrolledDown }}>
      {children}
    </rootContext.Provider>
  );
}
