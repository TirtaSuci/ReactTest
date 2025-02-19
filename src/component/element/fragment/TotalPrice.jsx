import { useEffect, useRef } from "react";
import { useExchangeRate } from "../../context/ExchangeMoney";
import { useTotalPrice } from "../../context/TotalPriceContext";
import { useSelector } from "react-redux";

const TotalPrice = () => {
    const { total } = useTotalPrice();
    const exchangeRate = useExchangeRate();
    const totalPriceRef = useRef(null);
    const cart = useSelector((state) => state.cart.data);

    useEffect(() => {
        if (totalPriceRef.current) {
            totalPriceRef.current.style.display = cart.length > 0 ? "" : "none";
        }
    }, [cart]);

    return (
        <div ref={totalPriceRef} className="ml-5 h-30 w-70 p-3 rounded-md shadow-md margin-20 bg-white">
            <p><b>Ringkasan Belanja</b></p>
            <div className="flex justify-between items-center w-full pt-5">
                <p className="text-left">Total</p>
                <div className="text-right min-w-[120px]">
                    {(total * exchangeRate).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })}
                </div>
            </div>
        </div>
    );
}
export default TotalPrice;