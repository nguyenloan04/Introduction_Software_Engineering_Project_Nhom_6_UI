import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo">Mắt kính thời trang</Link>
            <div className="header-right">
                <div className="search-container">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Tìm kiếm..." className="search-input" />
                </div>
                <FaUser className="user-icon" />
            </div>
        </header>
    );
}
