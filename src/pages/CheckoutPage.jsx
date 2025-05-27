// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/ui/Header.jsx';
import { Footer } from '../components/ui/Footer.jsx';
import { Button } from '../components/ui/Button.jsx';
import { config } from '@/config/apiConfig';
import '../css/checkout.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    paymentMethod: 'CARD',
  });
  const [error, setError] = useState('');

  // Lấy thông tin giỏ hàng
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vui lòng đăng nhập để tiếp tục.');
        return;
      }
      const res = await fetch(`${config.BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (res.ok && json.data) {
        setCartItems(json.data.cartItems || []);
        const total = parseFloat(json.data.cartTotalAmount);
        setCartTotalAmount(isNaN(total) ? 0 : total);
      } else {
        setError('Không thể lấy giỏ hàng: ' + (json.message || 'Invalid response'));
        setCartItems([]);
        setCartTotalAmount(0);
      }
    } catch (err) {
      setError('Lỗi khi gọi API giỏ hàng: ' + err.message);
      setCartItems([]);
      setCartTotalAmount(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Xử lý thay đổi trong biểu mẫu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xóa giỏ hàng
  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await fetch(`${config.BASE_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error('Lỗi khi xóa giỏ hàng:', err);
    }
  };

  // Xử lý gửi đơn hàng
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vui lòng đăng nhập để tiếp tục.');
        return;
      }

      const orderData = {
        userId: 2, // Thay bằng userId thực tế từ auth
        items: cartItems.map((item) => ({
          productId: item.Product.id,
          quantity: item.quantity,
        })),
        shippingAddress: formData.address,
        phone: formData.phone,
        paymentMethod: formData.paymentMethod,
        shippingFee: 100000,
      };

      const resOrder = await fetch(`${config.BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const jsonOrder = await resOrder.json();

      if (!resOrder.ok) {
        setError('Lỗi khi đặt hàng: ' + (jsonOrder.message || 'Unknown error'));
        return;
      }

      // Nếu thanh toán COD, xóa giỏ hàng và chuyển hướng về trang chủ
      if (formData.paymentMethod === 'CASH') {
        await clearCart();
        navigate('/', { state: { successMessage: 'Đặt hàng thành công!' } });
        return;
      }

      // Nếu thanh toán VNPay, chuyển hướng sang ConfirmOrderPage
      navigate('/confirm-order', {
        state: { formData, order: jsonOrder.data, cartItems, cartTotalAmount },
      });
    } catch (err) {
      setError('Lỗi khi xử lý đơn hàng: ' + err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="list">
        <h2>Thanh Toán</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="checkout-container">
          <div className="order-summary">
            <h3 className="text-lg font-bold mb-4">Thông tin đơn hàng</h3>
            {cartItems.length === 0 ? (
              <p>Giỏ hàng trống.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="card-element border rounded-lg p-4 bg-white mb-3"
                  >
                    <img
                      src={item.Product?.imageUrl || ''}
                      alt={item.Product?.name || 'product'}
                      className="card-img mb-2"
                    />
                    <h4 className="text-xl font-bold">{item.Product?.name || 'Unknown Product'}</h4>
                    <p>Giá: {item.Product ? parseFloat(item.Product.price).toLocaleString() : 0} VND</p>
                    <p>Số lượng: {item.quantity}</p>
                  </div>
                ))}
                <div className="mt-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    Tổng tiền: {cartTotalAmount.toLocaleString()} VND
                  </h4>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-form">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Thông tin giao hàng</h3>
            <form onSubmit={handleCheckout}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Nhập địa chỉ giao hàng"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Phương thức thanh toán</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="CASH">Thanh toán khi nhận hàng</option>
                  <option value="CARD">Thanh toán bằng VNPay</option>
                </select>
              </div>
              <div className="flex gap-8">
                <Link to="/">
                  <Button className="bg-gray-500 text-white py-2 px-4 rounded">
                    Quay lại
                  </Button>
                </Link>
                <Button type="submit" className="bg-black text-white py-2 px-4 rounded">
                  Xác Nhận Thanh toán
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;