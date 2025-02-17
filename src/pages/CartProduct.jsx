import { useEffect, useState } from "react";
import TabelCart from "../component/element/fragment/TabelCart";
import { useExchangeRate } from "../component/context/ExchangeMoney";
import { getProducts } from "../services/products.service";

const CartProductPage = () => {
    const [products, setProducts] = useState([]);
    const exchangeRate = useExchangeRate();

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-600">Cart</h1>
            <TabelCart products={products} exchangeRate={exchangeRate}></TabelCart>
        </div>
    );
}
export default CartProductPage;