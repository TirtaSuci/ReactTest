import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPriceContext";
import { useExchangeRate } from "../../context/ExchangeMoney"
import { addToCart, decreaseCart, removeFromCart } from "../../../redux/slice/cartSlice";
import RemoveProductButton from "../button/RemoveProductButton";
import Button from "../button";

const TabelCart = (props) => {
    const { products, id } = props;
    const { isDarkMode } = useContext(DarkMode);
    const { total } = useTotalPrice();
    const cart = useSelector((state) => state.cart.data);
    const infoCartRef = useRef(null);
    const dispatch = useTotalPriceDispatch();
    const exchangeRate = useExchangeRate();
    const totalPriceRef = useRef(null);
    const usedispatch = useDispatch();

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
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center pt-85" ref={infoCartRef}>
                <h1 className="text-xl text-slate-500">Anda Belum Menambahkan Produk Apapun</h1>
                <Button
                    className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md"
                    onClick={() => window.location.href = "/products"}
                >
                    Kembali Ke Produk
                </Button>
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
                                                <button onClick={() => usedispatch(decreaseCart({ id: item.id, qty: 1 }))} className="w-7"> - </button>
                                                <span className="px-5">{item.qty}</span>
                                                <button onClick={() => usedispatch(addToCart({ id: item.id, qty: 1 }))} className="w-7"> + </button>
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
                                        <RemoveProductButton className="bg-blue-600 text-white" onClick={() => usedispatch(removeFromCart({ id: item.id }))}>Hapus</RemoveProductButton>
                                    </div>
                                ) : null;
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabelCart;
