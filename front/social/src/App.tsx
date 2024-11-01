import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Authentication from './pages/Authentication';

import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile';
import ForgotPass from './pages/ForgotPass';

function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path=":id" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Authentication />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
      </Routes>
    </Router>
  );
}

export default App;
