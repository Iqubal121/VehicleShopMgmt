import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import './index.css';
import SignUpForm from './components/Auth/SignUpForm.jsx';
import Verified from './components/Auth/Verified.jsx';
import LoginForm from './components/Auth/LoginForm.jsx';
import ForgotPassword from './components/Auth/ForgotPassword.jsx';
import ResetPassword from './components/Auth/ResetPassword.jsx';
import SignOut from './components/Auth/Signout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verified" element={<Verified />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/signout" element={<SignOut />} />
      </Routes>
    </Router>
  );
}

export default App;
