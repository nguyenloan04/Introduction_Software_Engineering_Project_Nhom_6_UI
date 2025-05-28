import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây
    alert('Đăng nhập thành công!');
  };

  const goToRegister = () => {
    navigate('/register');
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
        <div className="login-register-link">
          Chưa có tài khoản? <span onClick={goToRegister}>Đăng ký ngay</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
