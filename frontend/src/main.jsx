// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/main.scss";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);