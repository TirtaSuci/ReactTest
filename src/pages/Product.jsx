import React, { Fragment, useEffect, useState } from "react";
import CardProduct from "../component/element/fragment/CardProduct";
import { getProducts } from "../services/products.service";
import TabelCart from "../component/element/fragment/TabelCart";
import Navbar from "../layout/Navbar";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [exchangeRate, setExchangeRate] = useState();

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
        getProducts((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <Fragment>
            <div className="flex justify-center p-5">
                <div className="flex w-4/6 flex-wrap">
                    {products.length > 0 && products.map((Product) => (
                        <CardProduct bgColor={Product.bgColor} key={Product.id}>
                            <CardProduct.Header Image={Product.image} id={Product.id}></CardProduct.Header>
                            <CardProduct.Body ProductName={Product.title}>{Product.description}</CardProduct.Body>
                            <CardProduct.Footer Price={Product.price} id={Product.id}></CardProduct.Footer>
                        </CardProduct>
                    ))}
                </div>
                <div className="w-2/6">
                    <h1 className="text-3xl font-bold text-blue-600">Cart</h1>
                    <TabelCart products={products} exchangeRate={exchangeRate}></TabelCart>
                </div>
            </div>
            {/* <div className="flex w-full justify-center">
                <Counter></Counter>
            </div> */}
        </Fragment>
    );
};

export default ProductPage;
