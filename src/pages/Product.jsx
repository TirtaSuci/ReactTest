import React, { Fragment, useEffect, useState } from "react";
import CardProduct from "../component/element/fragment/CardProduct";
import Button from "../component/element/button";
import Counter from "../component/element/fragment/Counter";


const email = localStorage.getItem("email");

const ProductPage = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
            setTotalPrice(cart.reduce((total, item) => {
                const product = products.find((Product) => Product.id === item.id);
                return total + product.price * item.qty;
            }, 0));
        }
    }, [cart]);
    
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
                    {products.map((Product) => (
                        <CardProduct bgColor={Product.bgColor} key={Product.id}>
                            <CardProduct.Header Image={Product.image}></CardProduct.Header>
                            <CardProduct.Body ProductName={Product.name}>{Product.description}</CardProduct.Body>
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
                            {cart.map((item) => {
                                const product = products.find((Product) => Product.id === item.id);
                                return (
                                    <tr key={item.id}>
                                        <td>{product.name}</td>
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

const products = [
    {
        id: 1,
        image: "/image/cat-1.jpg",
        bgColor: "bg-orange-300",
        name: "Kucing Belang",
        price: 1000000,
        description: "Kucing belang adalah kucing yang memiliki pola warna bulu yang bercorak atau bergaris, biasanya terdiri dari kombinasi dua atau tiga warna seperti hitam, putih, abu-abu, cokelat, atau oranye.",
    },
    {
        id: 2,
        image: "/image/cat-2.jpg",
        bgColor: "bg-slate-300",
        name: "Kucing Abu-abu",
        price: 2000000,
        description: "Kucing abu-abu biasanya punya bulu yang cantik dan elegan! Apa kamu punya kucing abu-abu sendiri atau suka dengan ras tertentu, seperti Russian Blue atau British Shorthair.",
    },
    {
        id: 3,
        image: "/image/cat-3.jpg",
        bgColor: "bg-orange-300",
        name: "Kucing Oyen",
        price: 3000000,
        description: "Kucing oyen adalah sebutan untuk kucing berwarna oranye (ginger cat). Di Indonesia, mereka sering kali punya reputasi lucu sebagai kucing paling nakal dan bandel 😹.",
    },
]
export default ProductPage;
