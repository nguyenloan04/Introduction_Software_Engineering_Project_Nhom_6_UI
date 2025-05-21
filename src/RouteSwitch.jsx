import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterForm from './components/register/RegisterForm';

const RegisterPage = () => (
  <div className="RegisterPage">
    <h1>Đăng ký tài khoản</h1>
    <RegisterForm />
  </div>
);

export default function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
