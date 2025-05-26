import React from 'react';
import {Link} from "react-router-dom";
import "@/css/productCard.css"

export const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="card-element border rounded-lg p-4 bg-white m-3">
                <img src={product.image_url} alt={product.name} className="card-img mb-2" />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p>Giá: {product.price.toLocaleString()} VND</p>
                <Link to={`/product/${product.id}`}>
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
        </div>
    );
};

