import {useEffect, useState} from 'react'
import '../Homepage.css'
import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Header} from "@/components/ui/Header.jsx";
import {Footer} from "@/components/ui/Footer.jsx";
import {AllProducts} from "@/components/AllProducts.jsx";
import {SuggestProducts} from "@/components/SuggestProducts.jsx";
import {config} from "@/config/apiConfig.js";

function HomePage() {
  const userId = 2;
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Xóa giỏ hàng
  const clearCart = async () => {
    const token = localStorage.getItem('token'); 

    try {
      if (!token) {
        console.error('Không có token để xóa giỏ hàng');
        return;
      }
      await fetch(`${config.BASE_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Giỏ hàng đã được xóa');
    } catch (err) {
      console.error('Lỗi khi xóa giỏ hàng:', err);
    }
  };

  const handleSelectGlasses = (url) => {
    console.log('Selected glasses URL:', url);
  };

  useEffect(() => {
    // Kiểm tra query string từ VNPay
    const params = new URLSearchParams(location.search);
    const status = params.get('status');

    if (status) {
      // Xóa giỏ hàng và hiển thị popup cho VNPay
      clearCart();
      setPopupMessage('Thanh toán thành công!');
      setShowPopup(true);

      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      // Xóa query string
      navigate('/', { replace: true });
      return () => clearTimeout(timer);
    }

    const message = location.state?.message || location.state?.successMessage;
    if (message) {
      setPopupMessage(message);
      setShowPopup(true);
      
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <div>
      <Header/>
      
      {showPopup && (
        <div className="popup">
          {popupMessage}
        </div>
      )}

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
}

export default HomePage;
