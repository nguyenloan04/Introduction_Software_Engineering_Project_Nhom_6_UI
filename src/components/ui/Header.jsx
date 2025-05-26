import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';

export const Header= () => {
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
            </div>
        </header>
    );
}
