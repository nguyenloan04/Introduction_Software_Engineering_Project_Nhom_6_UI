import React from 'react';
import { ProductCard } from '@/components/ui/Card.jsx';
import '@/css/productList.css';
import { addToCart } from '../../services/cartService.js';


// Updated to render children passed to ProductList
export const ProductList = ({ products, onProductClick }) => {
    const handleAddToCart = async (productId, quantity) => {
        await addToCart(productId, quantity);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onTryGlasses={(url) => onProductClick({ ...product, imageUrl: url })}
                    addToCart={handleAddToCart}
                />
            ))}
        </div>
    );
};