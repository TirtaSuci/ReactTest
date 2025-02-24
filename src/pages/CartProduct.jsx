import { useEffect, useState } from "react";
import TabelCart from "../component/element/fragment/TabelCart";
import { useExchangeRate } from "../component/context/ExchangeMoney";
import { getProducts } from "../services/products.service";
import TotalPrice from "../component/element/fragment/TotalPrice";
import Navbar from "../layout/Navbar";
import TabelCartDetail from "../component/element/fragment/TabelCartDetail";

const CartProductPage = () => {
    const [products, setProducts] = useState([]);
    const exchangeRate = useExchangeRate();

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <div className="bg-gray-200 h-screen">
            <Navbar />
            <div className="flex justify-center pt-5">
                <TabelCart products={products} exchangeRate={exchangeRate}></TabelCart>
                <TabelCartDetail></TabelCartDetail>
                <TotalPrice></TotalPrice>
            </div>

        </div>
    );
}
export default CartProductPage;