import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/agency/Signup";
import InfoAgency from "./pages/agency/Signup/infoAgency";
import Login from "./pages/agency/Login";
import Home from "./pages/agency/Home";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<InfoAgency />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
