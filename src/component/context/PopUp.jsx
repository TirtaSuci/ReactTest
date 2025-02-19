import { createContext, useContext, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const PopupContext = createContext();

export function PopupProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const showPopup = () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 2000);
    };

    return (
        <PopupContext.Provider value={{ isOpen, setIsOpen, showPopup }}>
            {children}
            <Popup isOpen={isOpen} setIsOpen={setIsOpen} />
        </PopupContext.Provider>
    );
}

export function usePopup() {
    return useContext(PopupContext);
}

export function Popup({ isOpen, setIsOpen }) {
    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
                <DialogPrimitive.Content className="fixed w-70 h-50 m-auto inset-0 flex items-center justify-center p-4 bg-white rounded-lg shadow-lg">
                    <p>Item dimasukan ke keranjang</p>
                    <button onClick={() => setIsOpen(false)}></button>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

export default function PopupExample() {
    const { showPopup } = usePopup();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
            <button onClick={showPopup}>Tampilkan Popup</button>
        </div>
    );
}
