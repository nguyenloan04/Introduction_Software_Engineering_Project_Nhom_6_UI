import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetail from "@/pages/ProductDetail";
import Header from "@/components/ui/Header.jsx";
import Footer from "@/components/ui/Footer.jsx";

function RouteSwitch() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouteSwitch/>
    </StrictMode>,
)
