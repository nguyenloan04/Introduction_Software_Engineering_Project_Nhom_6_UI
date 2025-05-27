import { config } from '../config/apiConfig';

export const fetchCart = async () => {
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${config.BASE_URL}/api/cart`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();

        if (res.ok && json.data) {
            return {
                success: true,
                data: {
                    items: json.data.cartItems || [],
                    count: json.data.cartItemsCount || 0,
                    totalAmount: parseFloat(json.data.cartTotalAmount) || 0,
                },
            };
        } else {
            return {
                success: false,
                message: json.message || 'Không thể lấy giỏ hàng',
                data: {
                    items: [],
                    count: 0,
                    totalAmount: 0,
                },
            };
        }
    } catch (err) {
        return {
            success: false,
            message: 'Lỗi kết nối đến máy chủ',
            data: {
                items: [],
                count: 0,
                totalAmount: 0,
            },
        };
    }
};



export const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Bạn chưa đăng nhập, vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
        return;
    }
    const res = await fetch(`${config.BASE_URL}/api/cart/items`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({
            'productId': productId,
            'quantity': quantity
        }),
    });

    const json = await res.json();

    if (res.ok && json.data) {
        console.log(json.data);
    } else {
        alert("Thêm vào giỏ hàng thất bại");
    }
};
