import { useState, useEffect } from "react";
import Button from "../button";
import { Link } from "react-router-dom";

const CardProduct = (props) => {
    const { children, bgColor } = props;
    return (
        <div className={`w-full max-w-xs ${bgColor} border border-gray-300 rounded-xl m-2 flex flex-col justify-between`}>
            {children}
        </div>
    );
};

const Header = (props) => {
    const { Image, id } = props;
    return (
        <div className="p-3 bg-gray-200 rounded-t-xl">
            <Link to={`/product/${id}`} className="justify-center flex">
                <img
                    src={Image}
                    alt="Product"
                    className="bg-auto bg h-50"
                />
            </Link>
        </div>
    );
};

const Body = (props) => {
    const { ProductName, children } = props;
    return (
        <div className="px-3 text-gray-700 pb-3 pt-3 h-full">
            <a href="">
                <h1 className="font-semibold text-xl tracking-tight">{ProductName.substring(0, 20)}...</h1>
                <p className="tracking-tighter text-s">{children.substring(0, 100)}...</p>
            </a>
        </div>
    );
};

const Footer = (props) => {
    const { Price, HandleAddToCart, id } = props;
    const [exchangeRate, setExchangeRate] = useState(1);
    const [convertedPrice, setConvertedPrice] = useState(Price);

    useEffect(() => {
        fetch("https://api.exchangerate-api.com/v4/latest/USD") // Replace with a valid API
            .then((res) => res.json())
            .then((data) => {
                const rate = data.rates.IDR;
                setExchangeRate(rate);
                setConvertedPrice(Price * rate);
            })
            .catch((error) => console.error("Error fetching exchange rate:", error));
    }, [Price]);

    return (
        <div className="flex items-center justify-between px-3 pb-5">
            <span className="font-bold text-xl text-gray-700">
                {convertedPrice.toLocaleString("id-ID", {
                    style: "currency", currency: "IDR", minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })}
            </span>
            <Button bgcolor="bg-blue-600" onClick={() => HandleAddToCart(id)} >Add to Cart</Button>
        </div>
    );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
