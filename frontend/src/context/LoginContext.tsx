/* eslint-disable @typescript-eslint/no-empty-function */
import { useAuth0 } from "@auth0/auth0-react";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { OrderContext } from "./OrderContext";

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
  customerID: string;
  setCustomerID: React.Dispatch<React.SetStateAction<string>>;
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
  customerID: "",
  setCustomerID: () => {},
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
  const [customerID, setCustomerID] = useState("");

  const { setActiveTracker } = useContext(OrderContext);

  const { isAuthenticated, user: googleUser } = useAuth0();

  const user = localStorage.getItem("user");

  const email = user?.split(",")[0] || "";

  useEffect(() => {
    if (googleUser?.given_name && isAuthenticated) {
      const signGoogleUser = async () => {
        try {
          const response = await axios.post("https://dcback.vercel.app/api/users/google", {
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
            more: 0,
          });

          localStorage.setItem("user", String([response.data.user.email, response.data.token]));
          setToken(response.data.token);
          setEmailLogin(response.data.user.email);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            localStorage.clear();
            console.log(err);
          }
        }
      };

      signGoogleUser();
    }
  }, [emailLogin, googleUser, token, isAuthenticated]);

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
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);

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
    }
  }, [token]);

  useEffect(() => {
    const fetchCustomerID = async () => {
      try {
        const response = await axios.get("https://dcback.vercel.app/api/users/", {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: emailLogin },
        });

        const { stripeCustomerID, more, activeOrder } = response.data.user;

        if (stripeCustomerID) {
          setCustomerID(stripeCustomerID);
          localStorage.setItem("customer_id", stripeCustomerID);
        } else {
          try {
            const response = await axios.post(
              "https://dcback.vercel.app/api/payment/create-new-customer",
              {
                email: emailLogin,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setCustomerID(response.data.customerID);
          } catch (err) {
            if (axios.isAxiosError(err)) {
              console.log(err.response?.data.error);
            }
          }
        }
        localStorage.setItem("dominos-more", more);

        if (activeOrder && activeOrder.isActive) {
          if (new Date().getTime() > activeOrder.finish) {
            localStorage.setItem("active-tracker", JSON.stringify({ active: false }));
            localStorage.setItem("placed-order-time", JSON.stringify(0));

            try {
              await axios.put(
                "https://dcback.vercel.app/api/users/update-active-order",
                { email: emailLogin },
                { headers: { Authorization: `Bearer ${token}` } }
              );
            } catch (err) {
              if (axios.isAxiosError(err)) {
                console.log(err);
              }
            }

            setActiveTracker(false);
          } else {
            localStorage.setItem(
              "active-tracker",
              JSON.stringify({
                active: true,
                start: activeOrder.start,
                finish: activeOrder.finish,
              })
            );

            localStorage.setItem("placed-order-time", activeOrder.start);
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setLoggedIn(false);
          localStorage.clear();
        }
      }
    };

    if (token && emailLogin) {
      fetchCustomerID();
    }
    setActiveTracker(true);
  }, [token, emailLogin, setActiveTracker]);

  useEffect(() => {
    const updateDominosMorePoints = async () => {
      try {
        await axios.put(
          "https://dcback.vercel.app/api/users/update-dominos-more",
          { email: emailLogin },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        setLoggedIn(false);
      }
    };

    if (emailLogin && token && dominosMorePoints === 6) {
      updateDominosMorePoints();
    }
  }, [dominosMorePoints, emailLogin, token]);

  useEffect(() => {
    if (!customerID && localStorage.getItem("customer_id")) {
      setCustomerID(localStorage.getItem("customer_id") as string);
    }
  }, [customerID]);

  useEffect(() => {
    const points = localStorage.getItem("dominos-more");
    if (points !== null) {
      setDominosMorePoints(parseInt(points));
    }
  }, [dominosMorePoints]);

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
        customerID,
        setCustomerID,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
