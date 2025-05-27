import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import { BrowserRouter } from 'react-router-dom';
import ConfirmOrderPage from './pages/ConfirmOrderPage.jsx';
import App from './App';

export default function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-return" element={<CheckoutPage />} />
        <Route path="/confirm-order" element={<ConfirmOrderPage />} />
      </Routes>
      <App />
    </BrowserRouter>
  );
}
