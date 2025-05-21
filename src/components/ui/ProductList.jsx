import React from 'react';
import {ProductCard} from '@/components/ui/Card.jsx';
import '@/css/productList.css';

export const ProductList = ({ products }) => {
    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};