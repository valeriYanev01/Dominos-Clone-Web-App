import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MenuContextProvider } from "./context/MenuContext.tsx";
import { LoginContextProvider } from "./context/LoginContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoginContextProvider>
      <MenuContextProvider>
        <App />
      </MenuContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);
