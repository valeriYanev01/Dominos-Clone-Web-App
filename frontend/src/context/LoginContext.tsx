import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactNode, createContext, useEffect, useState } from "react";

type LoggedIn = boolean;
type EmailLogin = string;

interface LoggedInInterface {
  loggedIn: LoggedIn;
  setLoggedIn: React.Dispatch<React.SetStateAction<LoggedIn>>;
  emailLogin: EmailLogin;
  setEmailLogin: React.Dispatch<React.SetStateAction<EmailLogin>>;
}

export const LoginContext = createContext<LoggedInInterface>({
  loggedIn: false,
  setLoggedIn: () => {},
  emailLogin: "",
  setEmailLogin: () => {},
});

export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailLogin, setEmailLogin] = useState("");

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isAuthenticated]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, emailLogin, setEmailLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
