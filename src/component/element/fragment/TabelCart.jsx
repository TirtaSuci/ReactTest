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
    const { products } = props;
    
    // Panggil semua hooks di awal dan dalam urutan yang konsisten
    const { isDarkMode } = useContext(DarkMode);
    const { total } = useTotalPrice();
    const cart = useSelector((state) => state.cart.data);
    const dispatch = useTotalPriceDispatch();
    const exchangeRate = useExchangeRate();
    const usedispatch = useDispatch();

    const infoCartRef = useRef(null);
    const totalPriceRef = useRef(null);
    const [inputQty, setInputQty] = useState({});

    // Gunakan state untuk menangani perubahan input sebelum menekan Enter
    const handleQtyChange = (e, id) => {
        let newQty = e.target.value.replace(/^0+(?=\d)/, "");
        newQty = Number(newQty);
        if (isNaN(newQty) || newQty < 1) newQty = 1;

        setInputQty((prev) => ({ ...prev, [id]: newQty }));
    };

    const handleQtyBlur = (id) => {
        if (inputQty[id] === "" || inputQty[id] === undefined) {
            usedispatch(addToCart({ id, qty: 1, isManual: true }));
        } else {
            usedispatch(addToCart({ id, qty: inputQty[id], isManual: true }));
        }
        setInputQty((prev) => ({ ...prev, [id]: undefined }));
    };

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
            const sum = cart.reduce((total, item) => {
                const product = products.find((p) => p.id === item.id);
                return total + (product.price * item.qty);
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
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center pt-85" ref={infoCartRef}>
                <h1 className="text-xl text-slate-500">Anda Belum Menambahkan Produk Apapun</h1>
                <Button className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md" onClick={() => window.location.href = "/products"}>
                    Kembali Ke Produk
                </Button>
            </div>
            <div ref={totalPriceRef}>
                <div className={`${isDarkMode ? "text-white" : ""}`}>
                    {products.length > 0 &&
                        cart.map((item) => {
                            const product = products.find((p) => p.id === item.id);
                            const productExchange = product?.price * exchangeRate;
                            return product ? (
                                <div key={item.id} className="bg-white rounded-md shadow-md pl-1 pr-5 py-2 mb-2 flex justify-center items-center">
                                    <div className="w-20 h-20 flex items-center justify-center m-3">
                                        <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
                                    </div>
                                    <div className="w-40 overflow-hidden text-ellipsis whitespace-normal">
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
                                        <div className="grid grid-cols-[auto_3rem_auto] divide-gray-300 divide-x border-2 border-gray-300 rounded">
                                            <button onClick={() => usedispatch(decreaseCart({ id: item.id, qty: 1 }))} className="w-7"> - </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center [&::-webkit-inner-spin-button]:appearance-none"
                                                value={inputQty[item.id] ?? item.qty}
                                                onChange={(e) => handleQtyChange(e, item.id)}
                                                onBlur={() => handleQtyBlur(item.id)}
                                            />
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
                                    <RemoveProductButton className="bg-blue-600 text-white" onClick={() => usedispatch(removeFromCart({ id: item.id }))}>
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
