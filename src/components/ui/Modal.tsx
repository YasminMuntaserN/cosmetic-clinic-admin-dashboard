import { cloneElement, createContext, useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X} from "lucide-react";

interface ModalContextType {
    openName: string;
    setOpenName: (name: string) => void;
    close: () => void;
    open: (name: string) => void;
}

interface ModalProps {
    children: React.ReactNode;
    action?:()=>void;
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

// Main Modal Component
export function Modal({ children ,action }: ModalProps) {
    const [openName, setOpenName] = useState("");

    const close = () =>{ 
        setOpenName(""); 
        if(action) action();
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

    // Clone the child element and attach the onClick handler
    return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }: WindowProps) {
    const context = useContext(ModalContext);

    if (!context) {
        throw new Error("Window must be used within a Modal provider");
    }

    const { openName, close } = context;
    const modalRef = useRef<HTMLDivElement | null>(null); 
    
    // Auto Focus: When modal opens, set focus on the container
    useEffect(() => {
        if (name === openName && modalRef.current) {
            modalRef.current.focus();
        }
    }, [openName]);

    // Close Modal on "Escape" Key Press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [close]);

    if (name !== openName) return null;

    return createPortal(
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-sm z-[1000] transition-all duration-500 ease-in-out">
            <div
                ref={modalRef}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md z-[1001] p-4"
            >
                <button
                    className="bg-gray-100 text-red-700 py-3 px-5 flex justify-self-end rounded-md"
                    onClick={close}
                >
                    <X   />
                </button>

                {cloneElement(children, { onClose: close })}
            </div>
        </div>,
        document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;
