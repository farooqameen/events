import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import Browse from "./Browse";
import Registered from "./Registered";
import Profile from "./Profile";
import CardInfo from "./CardInfo";
import OrgD from "./OrgD";
import CardInfoOrg from "./CardInfoOrg";
import NewEvent from "./NewEvent";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/org" element={<OrgD />}>
            <Route path=":eventId" element={<CardInfoOrg />} />
            <Route path="new" element={<NewEvent />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path=":eventId" element={<CardInfo />} />
          </Route>
          <Route path="/browse" element={<Browse />}>
            <Route path=":eventId" element={<CardInfo />} />
          </Route>
          <Route path="/registered" element={<Registered />}>
            <Route path=":eventId" element={<CardInfo />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
