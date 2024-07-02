import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactNode, createContext, useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";

type LoggedIn = boolean;
type EmailLogin = string;
type Token = string;

interface GoogleLogin {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

interface LoggedInInterface {
  loggedIn: LoggedIn;
  setLoggedIn: React.Dispatch<React.SetStateAction<LoggedIn>>;
  emailLogin: EmailLogin;
  setEmailLogin: React.Dispatch<React.SetStateAction<EmailLogin>>;
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<Token>>;
  googleLogin: GoogleLogin;
  setGoogleLogin: React.Dispatch<React.SetStateAction<GoogleLogin>>;
  dominosMorePoints: number;
  setDominosMorePoints: React.Dispatch<React.SetStateAction<number>>;
}

export const LoginContext = createContext<LoggedInInterface>({
  loggedIn: false,
  setLoggedIn: () => {},
  emailLogin: "",
  setEmailLogin: () => {},
  token: "",
  setToken: () => {},
  googleLogin: {
    email: "",
    email_verified: false,
    family_name: "",
    given_name: "",
    locale: "",
    name: "",
    nickname: "",
    picture: "",
    sub: "",
    updated_at: "",
  },
  setGoogleLogin: () => {},
  dominosMorePoints: 0,
  setDominosMorePoints: () => {},
});

export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailLogin, setEmailLogin] = useState("");
  const [token, setToken] = useState("");
  const [googleLogin, setGoogleLogin] = useState<GoogleLogin>({
    email: "",
    email_verified: false,
    family_name: "",
    given_name: "",
    locale: "",
    name: "",
    nickname: "",
    picture: "",
    sub: "",
    updated_at: "",
  });
  const [dominosMorePoints, setDominosMorePoints] = useState(0);

  const { isAuthenticated, user: googleUser } = useAuth0();

  const user = localStorage.getItem("user");

  const email = user?.split(",")[0] || "";

  useEffect(() => {
    if (googleUser) {
      const signGoogleUser = async () => {
        try {
          const response = await axios.post("http://localhost:3000/api/users/google", {
            email: googleUser?.email,
            firstName: googleUser?.given_name,
            lastName: googleUser?.family_name,
            password: "",
            img: googleUser?.picture,
            addresses: [],
            orders: [],
            consents: [
              { delivery: true, deals: false, updates: false, confidentiality: true, termsOfUse: true, more: false },
            ],
            coupons: [],
          });
          localStorage.setItem("user", String([response.data.user.email, response.data.token]));
          setToken(response.data.token);
          setEmailLogin(response.data.user.email);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log(err);
          }
        }
      };

      signGoogleUser();
    } else {
      if (token) {
        const normalLogin = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/users", {
              headers: { Authorization: `Bearer ${token}` },
              params: { email: emailLogin },
            });

            localStorage.setItem("dominos-more", response.data.user.more);
          } catch (err) {
            if (axios.isAxiosError(err)) {
              console.log(err.message);
            }
          }
        };

        normalLogin();
      }
    }
  }, [emailLogin, googleUser, token]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isAuthenticated, googleUser]);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      setToken(user.split(",")[1]);
      setEmailLogin(email);
    } else {
      setLoggedIn(false);
      localStorage.clear();
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
    <LoginContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        emailLogin,
        setEmailLogin,
        token,
        setToken,
        googleLogin,
        setGoogleLogin,
        dominosMorePoints,
        setDominosMorePoints,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
