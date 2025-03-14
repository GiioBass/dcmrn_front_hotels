// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelList from './components/hotels/HotelList';
import HotelCreateForm from './components/hotels/HotelCreateForm';
import RoomList from './components/rooms/RoomList';
import RoomCreateForm from './components/rooms/RoomCreateForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} /> 
        <Route path="/create" element={<HotelCreateForm />} /> 
        <Route path="/hotels/:hotelId/rooms" element={<RoomList />} />
        <Route path="/hotels/:hotelId/create-room" element={<RoomCreateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
