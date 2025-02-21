import { useEffect, useState } from "react";
import { data, useParams } from "react-router";
import { getDetailProduct } from "../services/products.service";
import Button from "../component/element/button";
import Navbar from "../layout/Navbar";
import { useDispatch } from "react-redux";
import { usePopup } from "../component/context/PopUp";
import { addToCart } from "../redux/slice/cartSlice";
import { useExchangeRate } from "../component/context/ExchangeMoney";


const DetailProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const usedispatch = useDispatch();
    const { showPopup } = usePopup();
    const exchangeRate = useExchangeRate();

    useEffect(() => {
        getDetailProduct(id, (data) => {
            setProduct(data);
        });
    }, [id]);
    console.log(product);
    return (
        <div>
            <Navbar />
            <div className="pt-30 justify-center flex flex-col items-center">
                <div className="flex w-1/2 items-center justify-center">
                    <img className="pr-10 min-h-50 min-w-80" src={product.image} alt={product.title} />
                    <div className="pl-10 pt-10">
                        <div className="font-bold text-2xl">{product.title}</div>
                        <div className="py-5 font-bold text-5xl">{(product.price * exchangeRate).toLocaleString("id-ID", {
                            style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0
                        })}</div>
                        <div className="font-bold pb-2">Rating: {product.rating ? `${product.rating.rate}/5 (${product.rating.count})` : "No rating available"}</div>
                        <div className="text-l pb-10 w-5/6">{product.description}</div>
                        <div className="flex">
                            <Button link="/cartproduct" className="bg-blue-600 text-white w-35" onClick={() => {
                                usedispatch(addToCart({ id: Number(id), qty: 1 }))
                            }}>Buy Now</Button>
                            <Button className={`ml-10 border bg-white text-blue-600 w-35`} onClick={() => {
                                usedispatch(addToCart({ id: Number(id), qty: 1 }));
                                showPopup();
                            }} >Add to Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailProductPage;