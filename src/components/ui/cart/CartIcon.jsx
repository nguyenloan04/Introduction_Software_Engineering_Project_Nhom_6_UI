import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './CartIcon.css';

const CartIcon = ({ count, onClick }) => {
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onClick}>
      <FaShoppingCart className='cart-icon' style={{ fontSize: '24px' }} />
      {count > 0 && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 6px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}>
          {count}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
