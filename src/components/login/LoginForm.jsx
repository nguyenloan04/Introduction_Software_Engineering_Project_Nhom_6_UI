import React, { useState } from 'react';
import '../../styles/login.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm xử lý khi người dùng nhấn nút "Đăng nhập"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        // Lưu token vào localStorage
        localStorage.setItem('token', data.token);
        alert('Đăng nhập thành công!');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    } catch (err) {
      setError('Lỗi kết nối đến server!');
    } finally {
      setLoading(false);
    }
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
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
