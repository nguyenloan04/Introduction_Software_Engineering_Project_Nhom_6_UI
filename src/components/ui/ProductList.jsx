import React from 'react';
import { ProductCard } from '@/components/ui/Card.jsx';
import '@/css/productList.css';

// Updated to render children passed to ProductList
export const ProductList = ({ products, onProductClick }) => {
    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onTryGlasses={(url) => onProductClick({ ...product, imageUrl: url })}
                />
            ))}
        </div>
    );
};