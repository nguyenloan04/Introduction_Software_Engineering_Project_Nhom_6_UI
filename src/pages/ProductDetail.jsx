import React from 'react';
import { useParams, Link } from 'react-router-dom';
// import { CardContent } from '@/components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import products from '../assets/data/products.js';
import "../css/productDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id.toString() === id);

    if (!product) {
        return <div className="p-8 text-center">Không tìm thấy sản phẩm.</div>;
    }

    return (
        <div className="">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                />
                {/*<CardContent className="w-100 m-6">*/}
                {/*    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>*/}
                {/*    <p className="text-gray-600 mb-4">Giá: {product.price}</p>*/}
                {/*    <p className="text-gray-700 mb-4">{product.description}</p>*/}
                {/*    <Link to="/">*/}
                {/*        <Button className="w-full">Quay Lại</Button>*/}
                {/*    </Link>*/}
                {/*</CardContent>*/}
            </div>
        </div>
    );
};
export default ProductDetail;
