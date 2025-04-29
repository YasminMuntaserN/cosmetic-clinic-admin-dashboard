import { createContext, useContext, useEffect, useRef, useState, cloneElement } from 'react';
import { X } from 'lucide-react';
import {createPortal} from "react-dom";

interface ModalContextType {
    openName: string;
    setOpenName: (name: string) => void;
    close: () => void;
    open: (name: string) => void;
}

interface ModalProps {
    children: React.ReactNode;
    action?: () => void;
}

interface OpenProps {
    children: React.ReactElement;
    opens: string;
}

interface WindowProps {
    children: React.ReactElement;
    name: string;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function Modal({ children, action }: ModalProps) {
    const [openName, setOpenName] = useState("");

    const close = () => {
        setOpenName("");
        if (action) action();
    };

    const open = (name: string) => setOpenName(name);

    return (
        <ModalContext.Provider value={{ openName, setOpenName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

function Open({ children, opens }: OpenProps) {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("Open must be used within a Modal provider");
    }

    const { open } = context;

    return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }: WindowProps) {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("Window must be used within a Modal provider");
    }

    const { openName, close } = context;
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (name === openName && modalRef.current) {
            modalRef.current.focus();
        }
    }, [openName, name]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [close]);

    if (name !== openName) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 ">
            <div className="min-h-screen px-4 text-center">
                {/* Background overlay */}
                <div className="fixed inset-0" onClick={close} />

                {/* Modal positioning */}
                <div className="inline-block w-full max-w-md sm:max-w-lg md:max-w-xl my-8 text-left align-middle transition-all transform">
                    <div
                        ref={modalRef}
                        tabIndex={-1}
                        className="relative lg:w-[750px] bg-white rounded-lg shadow-xl"
                    >
                        {/* Close button */}
                        <div className="absolute right-4 top-4">
                            <button
                                onClick={close}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-basic p-2 rounded-full"
                            >
                                <span className="sr-only">Close</span>
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {cloneElement(children, { onClose: close })}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;

export function useModal() {
    const modalContext = useContext(ModalContext);

    if (!modalContext) {
        throw new Error("modalContext must be used within a Modal provider");
    }
    return modalContext;
}