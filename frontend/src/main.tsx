import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MenuContextProvider } from "./context/MenuContext.tsx";
import { LoginContextProvider } from "./context/LoginContext.tsx";
import { ModalContextProvider } from "./context/Modal.Context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoginContextProvider>
      <ModalContextProvider>
        <MenuContextProvider>
          <App />
        </MenuContextProvider>
      </ModalContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
