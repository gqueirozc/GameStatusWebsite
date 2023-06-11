import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import NotFound from "../components/NotFound";
import PlayerInfoPage from "../components/PlayerInfoPage";

const RoutesHandler = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/player/*" element={<PlayerInfoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RoutesHandler;
