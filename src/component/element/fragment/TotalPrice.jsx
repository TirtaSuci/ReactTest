import { useExchangeRate } from "../../context/ExchangeMoney";
import { useTotalPrice } from "../../context/TotalPriceContext";

const TotalPrice = () => {
    const { total } = useTotalPrice();
    const exchangeRate = useExchangeRate();
    return (
        <div className="ml-5 h-30 w-70 p-3 border rounded-md margin-20 bg-slate-200">
            <p><b>Ringkasan Belanja</b></p>
            <div className="flex flex-between pt-5">
                <p>Total</p>
                <div className="pl-30 max-w-30">{(total * exchangeRate).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                })}</div>
            </div>
        </div>
    );
}
export default TotalPrice;