import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPriceContext";
import { useExchangeRate } from "../../context/ExchangeMoney"

const TabelCart = (props) => {
    const { products } = props;
    const cart = useSelector((state) => state.cart.data);
    const totalPriceRef = useRef(null);
    const infoCartRef = useRef(null);
    const { isDarkMode } = useContext(DarkMode);
    const dispatch = useTotalPriceDispatch();
    const { total } = useTotalPrice();
    const exchangeRate = useExchangeRate();

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
        <div className="flex w-full justify-center">
            <div ref={infoCartRef} >
                <h1>Anda Belum Menambakan Produk Apapun</h1>
            </div>
            <div ref={totalPriceRef} >
                <div className={` ${isDarkMode && "text-white"}`}>
                    <div className="">
                        {products.length > 0 &&
                            cart.map((item) => {
                                const product = products.find((Product) => Product.id === item.id);
                                const productExchange = product.price * exchangeRate;
                                return product ? (
                                    <div key={item.id} className="border w-5xl mb-2 flex justify-center items-center text-s tracking-tight">
                                        <div className="w-20 h-20 border border-gray-300 flex- items-center justify-center m-3">
                                            <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
                                        </div>
                                        <div className="w-40 overflow-hidden text-ellipsis whitespace-normal" style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical"
                                        }}>
                                            {product.title}
                                        </div>
                                        <div className="w-50 flex justify-center items-center">
                                            {productExchange.toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </div>
                                        <div className="w-50 flex justify-center items-center">
                                            <div className="grid grid-cols-[auto_3rem_auto] divide-gray-300 divide-x border border-gray-300 flex justify-center items-center ">
                                                <button className="w-7"> - </button>
                                                <span className="px-5">{item.qty}</span>
                                                <button className="w-7"> + </button>
                                            </div>
                                        </div>
                                        <div className="w-50 flex justify-center items-center">
                                            {(productExchange * item.qty).toLocaleString("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </div>
                                        <div className="w-50 flex justify-center items-center">
                                            <button className="border bg-blue-600 text-white p-2 px-5 rounded-lg">Hapus</button>
                                        </div>
                                    </div>
                                ) : null;
                            })}
                        {/* <div>
                            <div colSpan={3}><b>Total Price</b></div>
                            <div>
                                <b>
                                    {(total * exchangeRate).toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </b>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabelCart;
