import { createContext, useContext, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
                <DialogPrimitive.Content
                    aria-describedby={undefined}
                    className="fixed w-[280px] h-[200px] m-auto inset-0 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg"
                >
                    <DialogPrimitive.Title>
                        <VisuallyHidden>Notifikasi</VisuallyHidden>
                    </DialogPrimitive.Title>
                    <p>Item dimasukkan ke keranjang</p>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 p-1 text-gray-600 hover:text-black"
                        aria-label="Tutup popup"
                    >
                        ✖
                    </button>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}

export default function PopupExample() {
    const { showPopup } = usePopup();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
            <button onClick={showPopup} className="px-4 py-2 bg-blue-500 text-white rounded">
                Tampilkan Popup
            </button>
        </div>
    );
}
