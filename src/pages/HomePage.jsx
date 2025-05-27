// <<<<<<< HEAD
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// import '../Homepage.css';
// import Popup from '../components/Popup.jsx';
// import { Header } from "@/components/ui/Header.jsx";
// import { Footer } from "@/components/ui/Footer.jsx";
// import { AllProducts } from "@/components/AllProducts.jsx";
// import { SuggestProducts } from "@/components/SuggestProducts.jsx";

// function HomePage() {
//   const userId = 2;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState('');

//   useEffect(() => {
//     const message = location.state?.message || location.state?.successMessage;
//     if (message) {
//       setPopupMessage(message);
//       setShowPopup(true);

//       const timer = setTimeout(() => {
//         setShowPopup(false);
//       }, 5000);

//       navigate(location.pathname, { replace: true });
//       return () => clearTimeout(timer);
//     }
//   }, [location, navigate]);

//   return (
//     <div>
//       <Header />
//       {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
//       <div className="list">
//         <h2>Tất cả sản phẩm</h2>
//         <AllProducts />
//       </div>
//       <div className="list">
//         <h2>Sản phẩm được gợi ý</h2>
//         <SuggestProducts userId={userId} />
//       </div>
//       <Footer />
//     </div>
//   );
// =======
import {useEffect} from 'react'
import '../Homepage.css'
import React from 'react';
import {Header} from "@/components/ui/Header.jsx";
import {Footer} from "@/components/ui/Footer.jsx";
import {AllProducts} from "@/components/AllProducts.jsx";
import {SuggestProducts} from "@/components/SuggestProducts.jsx";

function HomePage() {
    // 4.0 Người dùng truy cập vào trang chủ
    const userId =2 ;

    const handleSelectGlasses = (url) => {
        console.log('Selected glasses URL:', url);
    };

    return (
        <div>
            <Header/>

            <div className="list">
                <h2>Tất cả sản phẩm</h2>
                <AllProducts onSelectGlasses={handleSelectGlasses} />
            </div>
            <div className="list">
                <h2>Sản phẩm được gợi ý</h2>
                <SuggestProducts userId={userId} />
            </div>
            <Footer/>
        </div>
    );
// >>>>>>> main
}

export default HomePage;
