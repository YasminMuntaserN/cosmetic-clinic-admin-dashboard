import {ChevronsLeft, ChevronsRight} from "lucide-react";
import {cn} from "../../utils/cn.ts";

export interface PaginationProps {
    currentPage: number;
    onPageChange?: (page: number) => void;
    totalPages: number;
}

export function Pagination({totalPages, currentPage, onPageChange}: PaginationProps) {
    return (
        <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination">
            <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-secondary bg-white  rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronsLeft/>
            </button>
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange?.(i + 1)}
                    className={cn(
                        'relative inline-flex items-center px-4 py-2 text-sm font-medium ',
                        currentPage === i + 1
                            ? 'z-10 bg-secondary border-primary text-primary'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    )}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-secondary bg-white rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronsRight/>
            </button>
        </nav>
    )
}