import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPriceDispatch, } from "../../context/TotalPriceContext";
import { useExchangeRate } from "../../context/ExchangeMoney";
import { addToCart, decreaseCart, removeFromCart, } from "../../../redux/slice/cartSlice";
import RemoveProductButton from "../button/RemoveProductButton";
import Button from "../button";
import { Link } from "react-router-dom";

const TabelCart = (props) => {
    const { products } = props;
    const { isDarkMode } = useContext(DarkMode);
    const cart = useSelector((state) => state.cart.data);
    const dispatch = useTotalPriceDispatch();
    const exchangeRate = useExchangeRate();
    const usedispatch = useDispatch();

    const infoCartRef = useRef(null);
    const totalPriceRef = useRef(null);
    const [inputQty, setInputQty] = useState({});
    const [focusedInputId, setFocusedInputId] = useState(null);

    const handleQtyChange = (e, id) => {
        let newQty = e.target.value.replace(/^0+(?=\d)/, "");
        newQty = newQty === "" ? "" : Number(newQty);
        if (isNaN(newQty) || newQty < 0) newQty = 1;
        setInputQty((prev) => ({ ...prev, [id]: newQty }));
    };

    const handleQtyBlur = (id, currentQty) => {
        if (inputQty[id] === "" || inputQty[id] === undefined) {
            setInputQty((prev) => ({ ...prev, [id]: undefined }));
        } else if (inputQty[id] !== currentQty) {
            usedispatch(addToCart({ id, qty: inputQty[id], isManual: true }));
            setInputQty((prev) => ({ ...prev, [id]: undefined })); // Reset setelah update Redux
        }
    };

    const handleQtyKeyDown = (e, id, currentQty) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (inputQty[id] !== "" && inputQty[id] !== undefined && inputQty[id] !== currentQty) {
                usedispatch(addToCart({ id, qty: Number(inputQty[id]), isManual: true }));
            }
            setInputQty((prev) => ({ ...prev, [id]: undefined }));
            setFocusedInputId(null);
        }
    };

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
            const sum = cart.reduce((total, item) => {
                const product = products.find((p) => p.id === item.id);
                return total + product.price * item.qty;
            }, 0);

            dispatch({
                type: "UPDATE",
                payload: { total: sum },
            });
        }
    }, [cart, products, dispatch]);

    useEffect(() => {
        if (totalPriceRef.current) {
            totalPriceRef.current.style.display = cart.length > 0 ? "" : "none";
        }
        if (infoCartRef.current) {
            infoCartRef.current.style.display = cart.length > 0 ? "none" : "";
        }
    }, [cart]);

    return (
        <div className="flex justify-center">
            <div ref={totalPriceRef}>
                <div className={`${isDarkMode ? "text-white" : ""}`}>
                    {products.length > 0 &&
                        cart.map((item) => {
                            const product = products.find((p) => p.id === item.id);
                            const productExchange = product?.price * exchangeRate;
                            return product ? (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-md shadow-md pl-1 pr-5 py-2 mb-2 flex justify-center items-center"
                                >
                                    <Link to={`/product/${item.id}`} className="w-20 h-20 flex items-center justify-center m-3">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={product.image}
                                            alt={product.title}
                                        />
                                    </Link>
                                    <div className="w-60 overflow-hidden text-ellipsis whitespace-normal" style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical"
                                    }}>
                                        {product.title}
                                    </div>
                                    <div className="w-50 pr-10 flex justify-end text-right">
                                        <b>
                                            {productExchange.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </b>
                                    </div>
                                    <div className="w-50 flex justify-center items-center">
                                        <div
                                            className={`grid grid-cols-[auto_3rem_auto] divide-gray-300 divide-x border-2 rounded transition-all ${focusedInputId === item.id
                                                ? "border-blue-500"
                                                : "border-gray-300"
                                                }`}
                                        >
                                            <button
                                                onClick={() =>
                                                    usedispatch(decreaseCart({ id: item.id, qty: 1 }))
                                                }
                                                className="w-7"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center [&::-webkit-inner-spin-button]:appearance-none outline-none"
                                                value={inputQty[item.id] ?? item.qty}
                                                onChange={(e) => handleQtyChange(e, item.id)}
                                                onBlur={() => {
                                                    handleQtyBlur(item.id);
                                                    setFocusedInputId(null);
                                                }}
                                                onKeyDown={(e) => handleQtyKeyDown(e, item.id, item.qty)}
                                                onFocus={() => setFocusedInputId(item.id)}
                                            />
                                            <button
                                                onClick={() =>
                                                    usedispatch(addToCart({ id: item.id, qty: 1 }))
                                                }
                                                className="w-7"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-50 flex justify-center items-center">
                                        <b>
                                            {(productExchange * item.qty).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </b>
                                    </div>
                                    <RemoveProductButton
                                        className="bg-blue-600 text-white"
                                        onClick={() => usedispatch(removeFromCart({ id: item.id }))}
                                    >
                                        Hapus
                                    </RemoveProductButton>
                                </div>
                            ) : null;
                        })}
                </div>
            </div>
        </div>
    );
};

export default TabelCart;
