import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StyledEngineProvider injectFirst>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </StyledEngineProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
