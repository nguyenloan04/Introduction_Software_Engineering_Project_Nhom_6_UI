import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetail from "@/pages/ProductDetail";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmOrderPage from './pages/ConfirmOrderPage';
import TryGlasses from './pages/TryGlasses';

export default function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetail />} />        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-return" element={<CheckoutPage />} />        
        <Route path="/confirm-order" element={<ConfirmOrderPage />} />
        {/* [Bước 3.2. Chuyển hướng đến trang chi tiết sản phẩm */}
        <Route path="/try-glasses/:glassesUrl" element={<TryGlasses/>}/>
      </Routes>
    </BrowserRouter>
  );
}
