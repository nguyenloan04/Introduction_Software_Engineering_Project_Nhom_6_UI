import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import './CartPanel.css';

const CartPanel = ({ items, onClose, cartTotalAmount }) => {
  const navigate = useNavigate(); // hook điều hướng

  const handleCheckout = () => {
    onClose(); // Đóng giỏ hàng trước khi chuyển trang
    navigate('/checkout'); // Điều hướng tới trang thanh toán
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Giỏ hàng</h3>
          <button className="close-button" onClick={onClose}>×</button>
          <div className="cart-actions">
              <button className="checkout-button" onClick={handleCheckout}>Thanh toán</button>
            </div>
        </div>
        <ul className="cart-items">
          {items.length > 0 ? (
            items.map(item => <CartItem key={item.id} item={item} />)
          ) : (
            <li className="cart-empty">Giỏ hàng trống</li>
          )}
        </ul>
        {items.length > 0 && (
          <>
            <div className="cart-total">
              <strong>Tổng cộng: {parseFloat(cartTotalAmount).toLocaleString('vi-VN')}đ</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPanel;
