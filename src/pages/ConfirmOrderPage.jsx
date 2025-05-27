
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/ui/Header.jsx';
import { Footer } from '../components/ui/Footer.jsx';
import { Button } from '../components/ui/Button.jsx';
import { config } from '@/config/apiConfig';

const ConfirmOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, order, cartItems, cartTotalAmount } = location.state || {};
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Kiểm tra dữ liệu đầu vào
  useEffect(() => {
    console.log('location.state:', location.state); // Debug toàn bộ state
    if (!token) {
      setError('Vui lòng đăng nhập để tiếp tục.');
      navigate('/login');
      return;
    }
    if (!formData || !order || !cartItems || cartTotalAmount === undefined) {
      setError('Không có dữ liệu đơn hàng đầy đủ. Vui lòng quay lại trang giỏ hàng.');
      return;
    }
    console.log('Order:', order);
    console.log('Cart Total Amount:', cartTotalAmount);
  }, [token, formData, order, cartItems, cartTotalAmount, navigate]);

  // Xử lý thanh toán
  const handleConfirmOrder = async () => {
    setIsLoading(true);
    try {
      if (!token) {
        setError('Vui lòng đăng nhập để tiếp tục.');
        return;
      }

      if (formData.paymentMethod === 'CASH') {
        navigate('/', { state: { successMessage: 'Đặt hàng thành công!' } });
        return;
      }

      const orderId = order?.orderId; // Sử dụng orderId thay vì id
      const totalAmount = cartTotalAmount + 100000; // Phí ship 30,000 VND

      // Kiểm tra orderId và totalAmount
      if (!orderId || isNaN(totalAmount)) {
        setError('Dữ liệu đơn hàng không hợp lệ: orderId hoặc totalAmount không tồn tại.');
        console.error('Invalid data:', { orderId, totalAmount });
        return;
      }

      console.log('Sending to VNPay API:', { orderId, amount: totalAmount * 100 });

      const paymentRes = await fetch(`${config.BASE_URL}/api/payment/vnpay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId,
          amount: totalAmount * 100, // VNPay yêu cầu VNĐ * 100
        }),
      });

      const paymentJson = await paymentRes.json();
      console.log('VNPay API response:', paymentJson);

      if (!paymentRes.ok) {
        setError(`Lỗi từ API VNPay (${paymentRes.status}): ${paymentJson.message || 'Unknown error'}`);
        return;
      }

      if (!paymentJson.data?.paymentUrl) {
        setError('Không nhận được URL thanh toán từ API.');
        return;
      }

      // Chuyển hướng đến URL thanh toán VNPay
      window.location.href = paymentJson.data.paymentUrl;
    } catch (err) {
      setError('Lỗi xử lý thanh toán: ' + err.message);
      console.error('Error in handleConfirmOrder:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error || !formData || !order || !cartItems || cartTotalAmount === undefined) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Header />
        <p className="text-red-500">{error || 'Không có dữ liệu đơn hàng. Vui lòng quay lại trang giỏ hàng.'}</p>
        <Button className="bg-gray-500 text-white mt-4" onClick={() => navigate('/cart')}>
          Quay lại giỏ hàng
        </Button>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Xác nhận đơn hàng</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-gray-100 p-4 rounded mb-4">
          <p><strong>Họ tên:</strong> {formData.fullName}</p>
          <p><strong>Địa chỉ:</strong> {formData.address}</p>
          <p><strong>Số điện thoại:</strong> {formData.phone}</p>
          <p><strong>Phương thức:</strong> {formData.paymentMethod === 'CARD' ? 'VNPay' : 'Thanh toán khi nhận'}</p>
          <p><strong>Mã đơn hàng:</strong> {order.orderId || 'Không có'}</p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Sản phẩm:</h3>
        {cartItems.length === 0 ? (
          <p>Không có sản phẩm nào trong giỏ hàng.</p>
        ) : (
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="mb-2">
                {item.Product?.name || 'Sản phẩm'} x {item.quantity} -{' '}
                {(item.Product?.price * item.quantity).toLocaleString()} VND
              </li>
            ))}
          </ul>
        )}

        <p className="text-lg font-bold">
          Tổng thanh toán: {(cartTotalAmount + 100000).toLocaleString()} VND (đã gồm phí ship 100,000 VND)
        </p>

        <div className="mt-4 flex gap-4">
          <Button className="bg-gray-500 text-white" onClick={() => navigate(-1)} disabled={isLoading}>
            Quay lại
          </Button>
          <Button
            className="bg-black text-white"
            onClick={handleConfirmOrder}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmOrderPage;
