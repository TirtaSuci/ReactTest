import { children } from "react"
import Button from "../button"


const CardProduct = (props) => {
    const { children, bgColor } = props
    return (
        <div className={`w-full max-w-xs ${bgColor} border border-gray-600  rounded-xl drop-shadow-lg m-2 flex flex-col justify-between`}>
            {children}
        </div>
    )
}

const Header = (props) => {
    const { Image } = props
    return (
        <div className="p-3">
            <a href="">
                <img
                    src={Image}
                    alt="Product"
                    className="rounded-xl overflow-hidden object-cover h-50"
                />
            </a>
        </div>
    )
}

const Body = (props) => {
    const { ProductName, children } = props
    return (
        <div className="px-3 text-gray-700 pb-3 h-full">
            <a href="">
                <h1 className="font-semibold text-xl tracking-tight">{ProductName}</h1>
                <p className="tracking-tighter text-s">{children}</p>
            </a>
        </div>
    )
}

const Footer = (props) => {
    const { Price, HandleAddToCart, id } = props
    return (
        <div className="flex items-center justify-between px-3 pb-5">
            <span className="font-bold text-xl text-gray-700">{Price.toLocaleString("id-ID", {
                style: "currency", currency: "IDR", minimumFractionDigits: 0,
                maximumFractionDigits: 0
            })}</span>
            <Button bgcolor="bg-blue-600" onClick={() => HandleAddToCart(id)} >Add to Cart</Button>
        </div>
    )
}

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;


export default CardProduct;