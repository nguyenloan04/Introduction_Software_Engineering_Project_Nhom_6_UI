import {useEffect, useState} from "react";
import {ProductList} from "@/components/ui/ProductList.jsx";
import { config } from "../config/apiConfig";

export const SuggestProducts= ({userId}) =>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        //4.1 Kiểm tra xem người dùng đã đăng nhập chưa (userId có null không) và gửi userId về cho server
        const endpoint = userId
            ? `${config.BASE_URL}/api/suggested-products/${userId}`
            : `${config.BASE_URL}/api/suggested-products/popular`; //4.6 Người dùng chưa đăng nhập (userId=null)

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data.products);
            })
            .catch((err) => console.error('Lỗi khi lấy sản phẩm:', err));
    }, [userId]);
    return(
        <ProductList products={products} setProducts={setProducts}/>
    )
}