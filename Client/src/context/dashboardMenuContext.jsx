import React, { createContext, useContext, useState } from 'react';

// Create Context
const MenuContext = createContext();

// Initial State
const initialState = {
  openedItem: 'dashboard',
  isDashboardDrawerOpened: false,
};

// Provider Component
export const MenuProvider = ({ children }) => {
  const [menuState, setMenuState] = useState(initialState);

  // Function to handle active menu item
  const handlerActiveItem = (id) => {
    setMenuState((prevState) => ({
      ...prevState,
      openedItem: id,
    }));
  };
  console.log(menuState.openedItem);
  const handlerDrawerOpen = (isOpen) => {
    setMenuState((prevState) => ({ ...prevState, isDashboardDrawerOpened: isOpen }));
  };

  return (
    <MenuContext.Provider value={{ menuState, handlerActiveItem, handlerDrawerOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
