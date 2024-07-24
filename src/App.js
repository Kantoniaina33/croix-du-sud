import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/agency/Signup';
import Login from './pages/agency/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/sign' element={<Signup />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
