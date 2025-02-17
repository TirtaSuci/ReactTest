import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPriceContext";

const TabelCart = (props) => {
    const { products } = props;
    const cart = useSelector((state) => state.cart.data);
    const [exchangeRate, setExchangeRate] = useState(1); // Default to 1 to avoid undefined
    const totalPriceRef = useRef(null);
    const infoCartRef = useRef(null);
    const { isDarkMode } = useContext(DarkMode);
    const dispatch = useTotalPriceDispatch();
    const { total } = useTotalPrice();

    useEffect(() => {
        fetch("https://api.exchangerate-api.com/v4/latest/USD") // Replace with a valid API
            .then((res) => res.json())
            .then((data) => {
                const rate = data.rates.IDR;
                setExchangeRate(rate);
            })
            .catch((error) => console.error("Error fetching exchange rate:", error));
    }, []);

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
            const sum = cart.reduce((total, item) => {
                const product = products.find((Product) => Product.id === item.id);
                return total + (product.price * item.qty);
            }, 0);
            dispatch({
                type: "UPDATE",
                payload: {
                    total: sum,
                }
            }); console.log(" Harga =", total, "jumlah", sum);
        }
    }, [cart, products]);

    useEffect(() => {
        if (totalPriceRef.current) {
            totalPriceRef.current.style.display = cart.length > 0 ? "" : "none";
        }

        if (infoCartRef.current) {
            infoCartRef.current.style.display = cart.length > 0 ? "none" : "";
        }
    }, [cart]);


    return (
        <div>
            <div ref={infoCartRef} >
                <h1>Anda Belum Menambakan Produk Apapun</h1>
            </div>
            <div ref={totalPriceRef} >
                <table className={`table-auto text-left border-separate border-spacing-x-5 -ml-5 ${isDarkMode && "text-white"}`}>
                    {/* <thead>
                        <tr>
                            <th className="pr-15">Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {products.length > 0 &&
                            cart.map((item) => {
                                const product = products.find((Product) => Product.id === item.id);
                                const productExchange = product.price * exchangeRate;
                                return product ? (
                                    <tr key={item.id} className="border">
                                        <td >{product.title}</td>
                                        <td className="text-right">
                                            {(productExchange).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </td>
                                        <div className="flex border rounded rounded-full p-1">
                                            <button className="px-4"> - </button>
                                            <td className="text-right">{item.qty}</td>
                                            <button className="px-4"> + </button>
                                        </div>
                                        <td className="text-right">
                                            {((productExchange * item.qty)).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </td>
                                    </tr>
                                ) : null;
                            })}
                        <tr >
                            <td colSpan={3}><b>Total Price</b></td>
                            <td>
                                <b>
                                    {(total * exchangeRate).toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TabelCart;
