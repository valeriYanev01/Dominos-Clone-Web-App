import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

type LoggedIn = boolean;
type EmailLogin = string;
type Token = string;

interface LoggedInInterface {
  loggedIn: LoggedIn;
  setLoggedIn: React.Dispatch<React.SetStateAction<LoggedIn>>;
  emailLogin: EmailLogin;
  setEmailLogin: React.Dispatch<React.SetStateAction<EmailLogin>>;
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<Token>>;
}

export const LoginContext = createContext<LoggedInInterface>({
  loggedIn: false,
  setLoggedIn: () => {},
  emailLogin: "",
  setEmailLogin: () => {},
  token: "",
  setToken: () => {},
});

export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailLogin, setEmailLogin] = useState("");
  const [token, setToken] = useState("");

  const { isAuthenticated } = useAuth0();

  const user = localStorage.getItem("user");

  const email = user?.split(",")[0] || "";

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      setToken(user.split(",")[1]);
      setEmailLogin(email);
    } else {
      setLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const decodedToken = jwt.decode(token) as JwtPayload | string;

    const interval = setInterval(() => {
      if (typeof decodedToken !== "string" && decodedToken?.exp) {
        const expirationTokenDate = new Date(decodedToken.exp * 1000);

        if (new Date() > expirationTokenDate) {
          localStorage.removeItem("user");
          setLoggedIn(false);
          setEmailLogin("");
          clearInterval(interval);
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, emailLogin, setEmailLogin, token, setToken }}>
      {children}
    </LoginContext.Provider>
  );
};
