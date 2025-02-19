import { useState, useEffect } from "react";
import Button from "../button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { addToCart } from "../../../redux/slice/cartSlice";
import { useExchangeRate } from "../../context/ExchangeMoney";
import { usePopup } from "../../context/PopUp";



const CardProduct = (props) => {
    const { children, bgColor } = props;
    return (
        <div className={`w-full max-w-xs h-full ${bgColor} border border-gray-300 rounded-xl m-2 flex flex-col justify-between`}>
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
                    className="bg-auto h-50 rounded-md"
                />
            </Link>
        </div>
    );
};

const Body = (props) => {
    const { ProductName, children } = props;
    const { isDarkMode } = useContext(DarkMode);
    return (
        <div className="px-3 text-gray-700 pb-3 pt-3 h-35">
            <a href="">
                <p className={`font-semibold text-lg tracking-tight overflow-hidden text-ellipsis whitespace-normal ${isDarkMode && "text-white"}`} style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical"
                }}>{ProductName}</p>
                <p className={`tracking-tighter text-s overflow-hidden text-ellipsis whitespace-normal ${isDarkMode && "text-white"}`} style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical"
                }}>{children}</p>
            </a>
        </div>
    );
};

const Footer = (props) => {
    const { Price, id } = props;
    const usedispatch = useDispatch();
    const { isDarkMode } = useContext(DarkMode);
    const exchangeRate = useExchangeRate();
    const { showPopup } = usePopup();

    return (
        <div className="flex items-center justify-between px-3 pb-5">
            <span className={`font-bold text-xl text-gray-700 ${isDarkMode && "text-white"}`}>
                {(Price * exchangeRate).toLocaleString("id-ID", {
                    style: "currency", currency: "IDR", minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })}
            </span>
            <Button className={`bg-blue-600 text-white`} onClick={() => {
                usedispatch(addToCart({ id: id, qty: 1 }));
                showPopup();
            }} >Add to Cart</Button>
        </div>
    );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;