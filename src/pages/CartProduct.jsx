import { useEffect, useState } from "react";
import TabelCart from "../component/element/fragment/TabelCart";
import { useExchangeRate } from "../component/context/ExchangeMoney";
import { getProducts } from "../services/products.service";
import { useTotalPrice } from "../component/context/TotalPriceContext";
import TotalPrice from "../component/element/fragment/TotalPrice";

const CartProductPage = () => {
    const { total } = useTotalPrice();
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
            <div className="flex justify-center">
            <TabelCart products={products} exchangeRate={exchangeRate}></TabelCart>
            <TotalPrice></TotalPrice>
            </div>
            
        </div>
    );
}
export default CartProductPage;