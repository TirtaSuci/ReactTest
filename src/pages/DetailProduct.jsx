import { useEffect, useState } from "react";
import { data, useParams } from "react-router";
import { getDetailProduct } from "../services/products.service";

const DetailProductPage = () => {
    const { id } = useParams();
    const [product, setProducts] = useState([]);
    useEffect(() => {
        getDetailProduct(id, (data) => {
            setProducts(data);
        });
    }, [id]);
    console.log(product);
    return (qwe)
}
export default DetailProductPage;