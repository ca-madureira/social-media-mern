import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Authentication from './pages/Authentication';

import Friend from './pages/Friend';
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify'; // Importando o ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importando o CSS do Toastify
import Profile from './pages/Profile';
import ForgotPass from './pages/ForgotPass';

function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Profile />} />
          <Route path="friend/:id" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Authentication />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
      </Routes>
    </Router>
  );
}

export default App;
