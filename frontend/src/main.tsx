import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MenuContextProvider } from "./context/MenuContext.tsx";
import { LoginContextProvider } from "./context/LoginContext.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { MapContextProvider } from "./context/MapContext.tsx";
import { OrderContextProvider } from "./context/OrderContext.tsx";
import { AddressContextProvider } from "./context/AddressContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./context/ModalContext.tsx";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="valeri.eu.auth0.com"
        clientId="jtVXRSEFdnDePdSgvnLmOmPEXJjGPMMN"
        authorizationParams={{ redirect_uri: "http://localhost:5173" }}
      >
        <ModalContextProvider>
          <LoginContextProvider>
            <AddressContextProvider>
              <OrderContextProvider>
                <MenuContextProvider>
                  <MapContextProvider>
                    <GoogleReCaptchaProvider reCaptchaKey="6Ldb0AAqAAAAAF6nJ37WL8v34GhnL0pCecfs7y6Y">
                      <App />
                    </GoogleReCaptchaProvider>
                  </MapContextProvider>
                </MenuContextProvider>
              </OrderContextProvider>
            </AddressContextProvider>
          </LoginContextProvider>
        </ModalContextProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
