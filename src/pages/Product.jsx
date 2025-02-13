import React, { Fragment, useEffect, useState, useRef } from "react";
import CardProduct from "../component/element/fragment/CardProduct";
import Button from "../component/element/button";
import Counter from "../component/element/fragment/Counter";
import { getProducts } from "../services/products.service";
import { data } from "react-router";

const email = localStorage.getItem("email");

const ProductPage = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
            setTotalPrice(cart.reduce((total, item) => {
                const product = products.find((Product) => Product.id === item.id);
                return total + product.price * item.qty;
            }, 0));
        }
    }, [cart, products]);

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, []);

    const HandleAddToCart = (id) => {
        if (cart.find((item) => item.id === id)) {
            setCart(cart.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        qty: item.qty + 1
                    }
                }
                return item;
            }))
        } else {
            setCart([...cart, { id: id, qty: 1 }]);
        }
    }



    const HandleLogOut = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        window.location.href = "/login";
    };
    return (
        <Fragment>
            <div className="flex justify-end bg-blue-500 h-20 px-10 items-center text-white">{email}
                <Button bgcolor="bg-red-400 ml-5" onClick={HandleLogOut}>Logout</Button>
            </div>
            <div className="flex justify-center p-5">
                <div className="flex w-4/6 flex-wrap">
                    {products.length > 0 && products.map((Product) => (
                        <CardProduct bgColor={Product.bgColor} key={Product.id}>
                            <CardProduct.Header Image={Product.image}></CardProduct.Header>
                            <CardProduct.Body ProductName={Product.title}>{Product.description}</CardProduct.Body>
                            <CardProduct.Footer Price={Product.price} id={Product.id} HandleAddToCart={HandleAddToCart}></CardProduct.Footer>
                        </CardProduct>
                    ))}
                </div>
                <div className="w-2/6">
                    <h1 className="text-3xl font-bold text-blue-600">Cart</h1>
                    <table className="table-auto text-left border-separate border-spacing-x-5 -ml-5">
                        <thead>
                            <tr>
                                <th className="pr-15">Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 && cart.map((item) => {
                                const product = products.find((Product) => Product.id === item.id);
                                return (
                                    <tr key={item.id}>
                                        <td>{product.title}</td>
                                        <td>{product.price.toLocaleString("id-ID", {
                                            style: "currency", currency: "IDR", minimumFractionDigits: 0,
                                        })}</td>
                                        <td>{item.qty}</td>
                                        <td>{(product.price * item.qty).toLocaleString("id-ID", {
                                            style: "currency", currency: "IDR", minimumFractionDigits: 0,
                                        })}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan={3}><b>Price</b></td>
                                <td><b>{totalPrice.toLocaleString("id-ID", {
                                    style: "currency", currency: "IDR", minimumFractionDigits: 0,
                                })}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex w-full justify-center">
                <Counter></Counter>
            </div>
        </Fragment>
    );
};

export default ProductPage;
