import { createPortal } from "react-dom";
import { Plus } from "lucide-react";

export function AddModal({ onClick }: { onClick?: () => void }) {
    return createPortal(
        <button
            onClick={onClick} 
            className="bg-basic fixed bottom-[80px] right-[70px] transform translate-x-[50%] translate-y-[90%] p-3 text-white flex flex-col justify-between gap-2 rounded-[70px] shadow-lg hover:scale-105 transition-all"
        >
            <Plus size={36} />
        </button>,
        document.body
    );
}
