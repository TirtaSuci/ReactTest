import { useEffect, useState } from "react";
import Button from "../component/element/button";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";

const Navbar = () => {
    const username = useLogin();
    const [totalcart, setTotalCart] = useState(0);
    const cart = useSelector((state) => state.cart.data);

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
            <Button className="bg-black ml-5">{totalcart}</Button>
        </div>
    );
};
export default Navbar;