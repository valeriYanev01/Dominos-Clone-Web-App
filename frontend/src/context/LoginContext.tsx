import { ReactNode, createContext, useState } from "react";

type LoggedIn = boolean;

interface LoggedInInterface {
  loggedIn: LoggedIn;
  setLoggedIn: React.Dispatch<React.SetStateAction<LoggedIn>>;
}

export const LoginContext = createContext<LoggedInInterface>({
  loggedIn: false,
  setLoggedIn: () => {},
});

export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>{children}</LoginContext.Provider>;
};
