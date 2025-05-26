import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import CartIcon from './cart/CartIcon';
import CartPanel from './cart/CartPanel';
import { fetchCart } from '../../services/cartService';

export const Header= () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const loadCart = async () => {
        const res = await fetchCart();
        if (res.success) {
            setCartItems(res.data.items);
            setCartCount(res.data.count);
            setCartTotalAmount(res.data.totalAmount);
        } else {
            console.warn(res.message);
        }
    };

    useEffect(() => {
        loadCart();
        const onCartUpdated =() => {
            loadCart();
            setIsCartOpen(true);
        };
        window.addEventListener("cartUpdated", onCartUpdated);
        return () => {
            window.removeEventListener("cartUpdated", onCartUpdated);
        };
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
