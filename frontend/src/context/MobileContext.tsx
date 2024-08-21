import React, { createContext, ReactNode, useEffect, useState } from "react";

interface MobileContextInterface {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileContext = createContext<MobileContextInterface>({
  width: 0,
  setWidth: () => {},
  isMobile: false,
  setIsMobile: () => {},
});

export const MobileContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [width]);

  return <MobileContext.Provider value={{ width, setWidth, isMobile, setIsMobile }}>{children}</MobileContext.Provider>;
};
