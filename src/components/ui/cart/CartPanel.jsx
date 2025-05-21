import React from 'react';
import CartItem from './CartItem';
import './CartPanel.css';

const CartPanel = ({ items, onClose, cartTotalAmount }) => {
  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Giỏ hàng</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <ul className="cart-items">
          {items.length > 0 ? (
            items.map(item => <CartItem key={item.id} item={item} />)
          ) : (
            <li className="cart-empty">Giỏ hàng trống</li>
          )}
        </ul>
        {items.length > 0 && (
          <div className="cart-total">
            <strong>Tổng cộng: {parseFloat(cartTotalAmount).toLocaleString('vi-VN')}đ</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPanel;