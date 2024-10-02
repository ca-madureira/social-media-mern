// src/App.tsx
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Friend from './pages/Friend';
import ProtectedRoute from './components/ProtectedRoute';
import ModalPassword from './components/ModalPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="friend/:id" element={<Friend />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPass" element={<ModalPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
