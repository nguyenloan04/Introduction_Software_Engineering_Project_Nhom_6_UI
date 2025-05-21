import React from 'react';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { Product, quantity, totalAmount } = item;
  const { name, price, category } = Product;

  return (
    <li className="cart-item">
      <div className="cart-item-image">
        <div className="image-placeholder">
          <img className='cart-item-image' src={item.Product.imageUrl} alt="" />
        </div>
      </div>
      <div className="cart-item-details">
        <h4 className="cart-item-name">{name}</h4>
        <p className="cart-item-category">{category}</p>
        <div className="cart-item-info">
          <span>SL: {quantity} x {parseFloat(price).toLocaleString('vi-VN')}đ</span>
          <span className="cart-item-total">{parseFloat(totalAmount).toLocaleString('vi-VN')}đ</span>
        </div>
      </div>
      <button className="cart-item-remove">Xóa</button>
    </li>
  );
};

export default CartItem;