import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepages from "./pages/Homepages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepages />} />
      </Routes>
    </Router>
  );
};

export default App;
