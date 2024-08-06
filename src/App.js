import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/agency/Signup";
import InfoAgency from "./pages/agency/Signup/infoAgency";
import Login from "./pages/agency/Login";
import Home from "./pages/agency/Home";
import ListHotel from "./pages/hotel/ListHotel";
import ListRoom from "./pages/room/ListRoom";
import ListMeal from "./pages/meal/ListMeal";
import ListExcursion from "./pages/excursion/ListExcursion";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/info" element={<InfoAgency />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hotels" element={<ListHotel />} />
          <Route path="/rooms" element={<ListRoom />} />
          <Route path="/meals" element={<ListMeal />} />
          <Route path="/excursions" element={<ListExcursion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
