import React, { useState } from 'react';
import '../../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập 
    alert('Đăng nhập thành công!');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Đăng nhập</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">Tên đăng nhập</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="login-input"
          required
        />
        <label className="login-label">Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
