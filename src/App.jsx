import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Home from "./Home";
import "./style.css";

const App = () => {
  return <Home />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
