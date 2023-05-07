import Fem from "./pages/fem/Fem";
import Home from "./pages/home/Home";
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  BrowserRouter,
  UserProfile,
  OwnUserProfile,
  Link,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<Home />} />{" "}
        <Route path="fem/*" element={<Fem />} />{" "}
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;