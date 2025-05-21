import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import CartIcon from './cart/CartIcon';
import CartPanel from './cart/CartPanel';
import { config } from '../../config/apiConfig';

export const Header= () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${config.BASE_URL}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();

            if (res.ok && json.data) {
                setCartItems(json.data.cartItems || []);
                setCartCount(json.data.cartItemsCount || 0);
                const total = parseFloat(json.data.cartTotalAmount);
                setCartTotalAmount(isNaN(total) ? 0 : total);
            } else {
                console.error('Không thể lấy giỏ hàng:', json.message || 'Invalid response');
                setCartItems([]);
                setCartCount(0);
                setCartTotalAmount(0);
            }
        } catch (err) {
            console.error('Lỗi khi gọi API giỏ hàng:', err);
            setCartItems([]);
            setCartCount(0);
            setCartTotalAmount(0);
        }
    };

    useEffect(() => {
            fetchCart();
    }, []);

    return (
        <header className="header">
            <Link to="/" className="logo">Mắt kính thời trang</Link>
            <div className="header-right">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Tìm kiếm..." className="search-input" />
                </div>
                <Link to="/login" className="header-btn">Đăng nhập</Link>
                {/* <Link to="/register" className="header-btn">Đăng ký</Link> */}
                <FaUser className="user-icon" />
                {/* <FaShoppingCart className="cart-icon" /> */}
                <CartIcon count={cartCount} onClick={toggleCart}/>
            </div>
            {isCartOpen && (
                <CartPanel
                    items={cartItems}
                    onClose={toggleCart}
                    cartTotalAmount={cartTotalAmount}
                />
            )}
        </header>
    );
}
