import {useEffect, useState} from "react";
import {ProductList} from "@/components/ui/ProductList.jsx";
import { config } from "../config/apiConfig";

export const AllProducts= ()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.BASE_URL}/api/products`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.data.products);
            })
            .catch((err) => console.error('Lỗi khi lấy sản phẩm:', err));
    }, []);
    return(
        <ProductList products={products} setProducts={setProducts}/>
    )
}