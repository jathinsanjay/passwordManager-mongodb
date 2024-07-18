// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Home from './pages/home';
import Add from './pages/add'; // Your Add component from the previous code

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
    
        <Route path="/add" element={<Add />} /> {/* Ensure element is passed */}
      </Routes>
    </Router>
  );
};

export default App;
