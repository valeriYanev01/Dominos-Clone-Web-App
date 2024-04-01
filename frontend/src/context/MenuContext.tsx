import React, { createContext, useState, ReactNode } from "react";

type Item = string;

export const MenuContext = createContext<{
  selectedItem: Item;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item>>;
}>({
  selectedItem: "",
  setSelectedItem: () => {},
});

export const MenuContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<Item>("");

  return <MenuContext.Provider value={{ selectedItem, setSelectedItem }}>{children}</MenuContext.Provider>;
};
