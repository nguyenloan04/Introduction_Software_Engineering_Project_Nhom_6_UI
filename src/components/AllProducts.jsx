import { useEffect, useState } from "react";
import { ProductList } from "@/components/ui/ProductList.jsx";
import { useNavigate } from 'react-router-dom';
import { config } from "../config/apiConfig";

export const AllProducts = ({ onSelectGlasses }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${config.BASE_URL}/api/products`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data.products);
            })
            .catch((err) => console.error('Lỗi khi lấy sản phẩm:', err));
    }, []);

    const handleProductClick = (product) => {
        onSelectGlasses(product.imageUrl); // Gọi hàm để lưu URL kính
        navigate(`/try-glasses/${encodeURIComponent(product.imageUrl)}`); // Điều hướng đến trang thử kính
    };

    return (
        <ProductList
            products={products}
            onProductClick={handleProductClick}
        />
    );
};