import { useEffect, useState } from "react";
import Button from "../component/element/button";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { DarkMode } from "../component/context/DarkMode";
import { useContext } from "react";

const Navbar = () => {
    const username = useLogin();
    const [totalcart, setTotalCart] = useState(0);
    const cart = useSelector((state) => state.cart.data);
    const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

    useEffect(() => {
        const sum = cart.reduce((acc, item) => {
            return acc + item.qty;
        }, 0);
        setTotalCart(sum);
    }, [cart]);

    const HandleLogOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };
    return (
        <div className="flex justify-end bg-blue-500 h-20 px-10 items-center text-white">{username}
            <Button className="bg-red-400 ml-5" onClick={HandleLogOut}>Logout</Button>
            <Button link="/cartproduct" className="bg-black ml-5" onClick={() => window.location.href = "/cartproduct"}>{totalcart}</Button>
            <Button
                className="bg-blue-600 rounded text-white ml-5"
                onClick={() => setIsDarkMode(!isDarkMode)}
            >
                {isDarkMode ? "Dark" : "Light"}
            </Button>
        </div>
    );
};
export default Navbar;