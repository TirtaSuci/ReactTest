import { useEffect, useState, useContext } from "react";
import Button from "../component/element/button";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { DarkMode } from "../component/context/DarkMode";
import { Link } from "react-router-dom";

const Navbar = () => {
    const username = useLogin();
    const [totalcart, setTotalCart] = useState(0);
    const cart = useSelector((state) => state.cart.data);
    const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const sum = cart.reduce((acc, item) => acc + item.qty, 0);
        setTotalCart(sum);
    }, [cart]);

    const HandleLogOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const HandleLogIn = () => {
        window.location.href = "/login";
    };

    return (
        <div className="flex justify-between bg-blue-500 h-20 px-10 items-center text-white">
            <Link to="/products" className="text-left">Home</Link>
            <div className="text-right">
                {username}
                {token ? (
                    <Button className="bg-red-400 ml-5" onClick={HandleLogOut}>
                        LogOut
                    </Button>
                ) : (
                    <Button className="bg-blue-600 ml-5" onClick={HandleLogIn}>
                        LogIn
                    </Button>
                )}
                <Button
                    link="/cartproduct"
                    className="bg-black ml-5"
                    onClick={() => window.location.href = "/cartproduct"}
                >
                    {totalcart}
                </Button>
                <Button
                    className="bg-blue-600 rounded text-white ml-5"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    {isDarkMode ? "Dark" : "Light"}
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
