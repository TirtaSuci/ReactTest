import React, { Fragment, useEffect, useState } from "react";
import CardProduct from "../component/element/fragment/CardProduct";
import { getProducts } from "../services/products.service";
import Navbar from "../layout/Navbar";
import { DarkMode } from "../component/context/DarkMode";
import { useContext } from "react";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, []);

    return (
        <Fragment>
            <Navbar />
            <div className={`${isDarkMode && "bg-slate-800"}`}>
                <div className="max-w-screen flex flex-wrap justify-center items-center">
                    {products.length > 0 && products.map((Product) => (
                        <CardProduct bgColor={Product.bgColor} key={Product.id}>
                            <CardProduct.Header Image={Product.image} id={Product.id}></CardProduct.Header>
                            <CardProduct.Body ProductName={Product.title}>{Product.description}</CardProduct.Body>
                            <CardProduct.Footer Price={Product.price} id={Product.id}></CardProduct.Footer>
                        </CardProduct>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductPage;
