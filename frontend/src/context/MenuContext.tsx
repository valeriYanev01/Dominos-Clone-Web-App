import React, { ReactNode, createContext, useState } from "react";

type Item = string;

interface Menu {
  selectedItem: Item;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item>>;
}

export const MenuContext = createContext<Menu>({
  selectedItem: "",
  setSelectedItem: () => {},
});

export const MenuContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("");

  return <MenuContext.Provider value={{ selectedItem, setSelectedItem }}>{children}</MenuContext.Provider>;
};
