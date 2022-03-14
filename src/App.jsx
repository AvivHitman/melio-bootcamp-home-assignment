import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Home, Favorite, routes } from "./pages";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.favorites} element={<Favorite />} />
        <Route exact path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
