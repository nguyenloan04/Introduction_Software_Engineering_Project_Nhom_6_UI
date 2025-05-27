import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/register.css';
import { config } from '../../config/apiConfig';

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Xóa thông báo lỗi khi người dùng bắt đầu sửa
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Kiểm tra dữ liệu nhập vào
  const validateForm = () => {
    const newErrors = {};
    
    // Kiểm tra username
    if (!formData.username.trim()) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 4 ký tự';
    }
    
    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    // Kiểm tra password
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    // Kiểm tra confirmPassword
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp';
    }
    
    // Kiểm tra số điện thoại nếu được nhập
    if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Xóa thông báo thành công nếu có
    setSuccessMessage('');
    
    // Kiểm tra dữ liệu
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Chuẩn bị dữ liệu để gửi đi
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone
      };
      
      // Giả lập API call vì chưa có backend API
      console.log('Dữ liệu đăng ký:', registerData);
      
      // Giả lập thời gian xử lý
      setTimeout(() => {
        setSuccessMessage('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        
        // Reset form sau khi đăng ký thành công
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          phone: ''
        });
        
        // Tự động chuyển đến trang đăng nhập sau 2 giây
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
        setLoading(false);
      }, 1500);
      
      /* Đoạn code này sẽ được sử dụng khi có API từ backend
      const response = await fetch(`${config.BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
        
        // Reset form sau khi đăng ký thành công
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          phone: ''
        });
        
        // Tự động chuyển đến trang đăng nhập sau 2 giây
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Hiển thị lỗi từ server
        setErrors({ server: data.message || 'Đăng ký không thành công. Vui lòng thử lại!' });
      }
      setLoading(false);
      */
      
    } catch (err) {
      setErrors({ server: 'Lỗi kết nối đến server. Vui lòng thử lại sau!' });
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Đăng ký tài khoản</h1>
      {successMessage && (
        <div className="register-success-message">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-field">
          <label className="register-label">Tên đăng nhập <span className="required">*</span></label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`register-input ${errors.username ? 'register-input-error' : ''}`}
            placeholder="Nhập tên đăng nhập"
            required
          />
          {errors.username && <div className="register-error">{errors.username}</div>}
        </div>
        
        <div className="register-field">
          <label className="register-label">Email <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`register-input ${errors.email ? 'register-input-error' : ''}`}
            placeholder="Nhập địa chỉ email"
            required
          />
          {errors.email && <div className="register-error">{errors.email}</div>}
        </div>
        
        <div className="register-field">
          <label className="register-label">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="register-input"
            placeholder="Nhập họ và tên của bạn"
          />
        </div>
        
        <div className="register-field">
          <label className="register-label">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`register-input ${errors.phone ? 'register-input-error' : ''}`}
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && <div className="register-error">{errors.phone}</div>}
        </div>
        
        <div className="register-field">
          <label className="register-label">Mật khẩu <span className="required">*</span></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`register-input ${errors.password ? 'register-input-error' : ''}`}
            placeholder="Nhập mật khẩu"
            required
          />
          {errors.password && <div className="register-error">{errors.password}</div>}
        </div>
        
        <div className="register-field">
          <label className="register-label">Nhập lại mật khẩu <span className="required">*</span></label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`register-input ${errors.confirmPassword ? 'register-input-error' : ''}`}
            placeholder="Nhập lại mật khẩu"
            required
          />
          {errors.confirmPassword && <div className="register-error">{errors.confirmPassword}</div>}
        </div>
        
        {errors.server && <div className="register-server-error">{errors.server}</div>}
        
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
        
        <div className="register-login-link">
          Đã có tài khoản? <span onClick={goToLogin}>Đăng nhập ngay</span>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;