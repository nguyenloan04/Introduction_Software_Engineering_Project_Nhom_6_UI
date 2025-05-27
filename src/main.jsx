import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetail from "@/pages/ProductDetail";
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmOrderPage from './pages/ConfirmOrderPage';
import TryGlasses from './pages/TryGlasses';

const RouteSwitch= () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/payment-return" element={<CheckoutPage />} />
                <Route path="/confirm-order" element={<ConfirmOrderPage />} />
                <Route path="/try-glasses/:glassesUrl" element={<TryGlasses/>}/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteSwitch />
  </StrictMode>
);

