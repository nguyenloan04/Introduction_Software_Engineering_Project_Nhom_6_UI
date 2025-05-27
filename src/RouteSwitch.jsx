import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TryGlasses from './TryGlasses';
import ProductDetail from "@/pages/ProductDetail";
import CheckoutPage from './pages/CheckoutPage';
import ConfirmOrderPage from './pages/ConfirmOrderPage.jsx';

export default function RouteSwitch() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/try-glasses/:glassesUrl" element={<TryGlasses/>}/>
                <Route path="/products/:id" element={<ProductDetail/>}/>
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment-return" element={<CheckoutPage />} />
                <Route path="/confirm-order" element={<ConfirmOrderPage />} />
            </Routes>
        </BrowserRouter>
    );
}

