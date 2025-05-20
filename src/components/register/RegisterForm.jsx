import React, { useState } from 'react';
import '../../styles/register.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký
    alert('Đăng ký thành công!');
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Đăng ký tài khoản</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-field">
          <label className="register-label">Tên đăng nhập</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="register-input"
            required
          />
        </div>
        <div className="register-field">
          <label className="register-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="register-input"
            required
          />
        </div>
        <div className="register-field">
          <label className="register-label">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="register-input"
            required
          />
        </div>
        <div className="register-field">
          <label className="register-label">Nhập lại mật khẩu</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="register-input"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;