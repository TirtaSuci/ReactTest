import { useEffect, useState } from "react";
import { data, useParams } from "react-router";
import { getDetailProduct } from "../services/products.service";
import Button from "../component/element/button";

const DetailProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [exchangeRate, setExchangeRate] = useState(1);

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
        getDetailProduct(id, (data) => {
            setProduct(data);
        });
    }, [id]);
    console.log(product);
    return (
        <div className="min-h-screen justify-center flex flex-col items-center">
            <div className="flex w-1/2 items-center justify-center">
                <img className="pr-10 h-1/3 w-1/3" src={product.image} alt={product.title} />
                <div className="pl-10 pt-10">
                    <div className="font-bold text-2xl">{product.title}</div>
                    <div className="py-5 font-bold text-5xl">{(product.price * exchangeRate).toLocaleString("id-ID", {
                        style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0
                    })}</div>
                    <div className="font-bold pb-2">Rating: {product.rating ? `${product.rating.rate}/5 (${product.rating.count})` : "No rating available"}</div>
                    <div className="text-l pb-10 w-5/6">{product.description}</div>
                    <div className="flex">
                        <Button className="bg-blue-600 text-white w-35">Buy Now</Button>
                        <Button className="ml-5 border bg-white w-35">Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailProductPage;