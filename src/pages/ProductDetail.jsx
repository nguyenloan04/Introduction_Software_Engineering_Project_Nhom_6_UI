import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Button} from '../components/ui/Button.jsx';
import "../css/productDetail.css";
import {formatPriceVND} from '../utils/format';
import {addToHistoryLoggedIn} from '@/utils/viewedHistory';

const ProductDetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);

    const userId = 2;

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                const prod = data.data.product;
                if (prod) {
                    setProduct(prod);

                    // ✅ Lưu lịch sử xem tùy theo trạng thái đăng nhập
                    if (userId>0) {
                        console.log(userId);
                        console.log(prod.id);
                        addToHistoryLoggedIn(userId, prod.id);
                    } else {
                    }
                }
            })
            .catch((err) => {
                console.error('Lỗi khi fetch sản phẩm:', err);
            });
    }, [id]);

    if (!product) return <p>Đang tải sản phẩm...</p>;

    return (
            <div className="product-space bg-white shadow-lg mt-6">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="product-img rounded-xl shadow"
                    />
                    <div className="m-4">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <p className="text-lg font-semibold">
                        Tình trạng:{" "}
                        <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
                        </span>
                    </p>

                    <button
                        disabled={product.stock <= 0}
                        className={`mt-6 px-6 py-2 rounded-xl text-white font-medium ${
                            product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}>
                        {product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Không thể đặt'}
                    </button>
                    </div>
            </div>
    );
};
export default ProductDetail;
