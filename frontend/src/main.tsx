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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="valeri.eu.auth0.com"
      clientId="jtVXRSEFdnDePdSgvnLmOmPEXJjGPMMN"
      authorizationParams={{ redirect_uri: "http://localhost:5173" }}
    >
      <LoginContextProvider>
        <AddressContextProvider>
          <OrderContextProvider>
            <MenuContextProvider>
              <MapContextProvider>
                <App />
              </MapContextProvider>
            </MenuContextProvider>
          </OrderContextProvider>
        </AddressContextProvider>
      </LoginContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
