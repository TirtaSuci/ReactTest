import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "../button";

const TabelCartDetail = () => {
    const cart = useSelector((state) => state.cart.data);
    const infoCartRef = useRef(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (infoCartRef.current) {
            infoCartRef.current.style.display = cart.length > 0 ? "none" : "";
        }
    });

    return (
        <div
            className="flex flex-col justify-center items-center pt-85"
            ref={infoCartRef}
        >
            <div>
                <h1 className="text-xl text-slate-500">
                    Anda Belum Menambahkan Produk Apapun
                </h1>
            </div>
            {token ? (
                <Button
                    className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md"
                    onClick={() => (window.location.href = "/products")}
                >
                    Kembali Ke Produk
                </Button>
            ) : (
                <div>
                    <Button
                        className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md"
                        onClick={() => (window.location.href = "/login")}
                    >
                        Sign In To Your Account
                    </Button>
                    <Button
                        className="bg-blue-600 text-white ml-4 mt-4 px-4 py-2 rounded-md"
                        onClick={() => (window.location.href = "/register")}
                    >
                        Sign Up Now
                    </Button>
                </div>
            )}
        </div>
    );
};
export default TabelCartDetail;
