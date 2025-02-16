import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";

const TabelCart = (props) => {
    const { products } = props;
    const cart = useSelector((state) => state.cart.data);
    const [totalPrice, setTotalPrice] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(1); // Default to 1 to avoid undefined
    const totalPriceRef = useRef(null);
    const { isDarkMode} = useContext(DarkMode);

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
            setTotalPrice(
                cart.reduce((total, item) => {
                    const product = products.find((Product) => Product.id === item.id);
                    return total + (product ? product.price * item.qty : 0);
                }, 0)
            );
        }
    }, [cart, products]);

    useEffect(() => {
        if (totalPriceRef.current) {
            totalPriceRef.current.style.display = cart.length > 0 ? "table-row" : "none";
        }
    }, [cart]);

    return (
        <table className={`table-auto text-left border-separate border-spacing-x-5 -ml-5 ${isDarkMode && "text-white"}`}>
            <thead>
                <tr>
                    <th className="pr-15">Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 &&
                    cart.map((item) => {
                        const product = products.find((Product) => Product.id === item.id);
                        return product ? (
                            <tr key={item.id}>
                                <td>{product.title}</td>
                                <td className="text-right">
                                    {(product.price * exchangeRate).toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </td>
                                <td className="text-right">{item.qty}</td>
                                <td className="text-right">
                                    {((product.price * item.qty) * exchangeRate).toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </td>
                            </tr>
                        ) : null;
                    })}
                <tr ref={totalPriceRef}>
                    <td colSpan={3}><b>Total Price</b></td>
                    <td>
                        <b>
                            {(totalPrice * exchangeRate).toLocaleString("id-ID", {
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
    );
};

export default TabelCart;
