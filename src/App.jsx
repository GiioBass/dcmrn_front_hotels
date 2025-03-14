// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelList from './components/hotels/HotelList';
import HotelCreateForm from './components/hotels/HotelCreateForm'; // Importa el formulario de creación de hotel

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} /> 
        <Route path="/create" element={<HotelCreateForm />} /> 
        {/* <Route path="/hotels/:hotelId/rooms" element={<RoomList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
