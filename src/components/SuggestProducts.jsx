import {useEffect, useState} from "react";
import {ProductList} from "@/components/ui/ProductList.jsx";

export const SuggestProducts= ({userId}) =>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/suggested-products/${userId}`)
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