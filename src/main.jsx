import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetail from "@/pages/ProductDetail";
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmOrderPage from './pages/ConfirmOrderPage';

const RouteSwitch= () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/confirm-order" element={<ConfirmOrderPage />} />
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteSwitch />
  </StrictMode>
);
