import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, createContext, useEffect, useState } from "react";

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
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isAuthenticated]);

  return <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>{children}</LoginContext.Provider>;
};
