import React from 'react';
import {Link} from "react-router-dom";
import "@/css/productCard.css"
import {formatPriceVND} from "@/utils/format.js";

export const ProductCard = ({ product, onTryGlasses, addToCart }) => {
    return (
        <div className="card-element border rounded-lg p-4 bg-white m-3">
                <img src={product.image_url} alt={product.name} className="card-img mb-2" />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p>Giá: {formatPriceVND(product.price)} VNĐ</p>
                <Link to={`products/${product.id}`}>
                    <button className="mt-2 bg-black text-white py-1 px-3 rounded">
                        Chi tiết sản phẩm
                    </button>
                </Link>
                    <button 
                        style={{marginTop: '5pt'}}
                        className="mt-2 bg-black text-white py-1 px-3 rounded"
                        onClick={() => addToCart(product.id, 1)}    
                    >
                        Thêm vào giỏ hàng
                    </button>
                <div style={{ marginTop: '12px' }}>
                    <button
                        className="bg-blue-500 text-white py-1 px-3 rounded"
                        onClick={() => onTryGlasses(product.image_url)}
                    >
                        Thử kính
                    </button>
                </div>
        </div>
    );
};

