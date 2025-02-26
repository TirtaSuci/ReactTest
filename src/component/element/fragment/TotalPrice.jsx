import { useEffect, useRef } from "react";
import { useExchangeRate } from "../../context/ExchangeMoney";
import { useTotalPrice } from "../../context/TotalPriceContext";
import { useSelector } from "react-redux";
import Button from "../button";

const TotalPrice = () => {
    const { total } = useTotalPrice();
    const exchangeRate = useExchangeRate();
    const totalPriceRef = useRef(null);
    const cart = useSelector((state) => state.cart.data);

    useEffect(() => {
        if (totalPriceRef.current) {
            totalPriceRef.current.style.display = cart.length > 0 ? "" : "none";
        }
    }, []);

    const CheckOut = () => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/products";
        } else {
            window.location.href = "/login";
        };
    }

    return (
        <div ref={totalPriceRef} className="ml-5 w-80 p-3 max-h-[160px] rounded-md shadow-md margin-20 bg-white flex flex-col justify-between">
            <p><b>Ringkasan Belanja</b></p>
            <div className="flex justify-between items-center w-full pt-5">
                <p className="text-left">Total</p>
                <div className="text-right min-w-[120px]">
                    <b>
                        {(total * exchangeRate).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </b>
                </div>
            </div>

            <Button className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md w-full " onClick={CheckOut}>Checkout</Button>
        </div>
    );
}
export default TotalPrice;