import {Product} from "../../types/product.ts";
import {ProductItem} from "./ProductItem.tsx";
import {ProductCategories} from "./ProductCategories.tsx";
import {Pagination} from "../ui/Pagination.tsx";

interface ProductListProps {
    products: Product[];
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage: number;
    isLoading?: boolean;
    onSort: (field: string, ascending: boolean) => void;
}

export function ProductList({products, currentPage, totalPages, onPageChange ,onSort}: ProductListProps) {
    return (
        <>
 
            <ProductCategories onSort={onSort}/>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product: Product) => (
                    <ProductItem product={product}/>
                ))}
            </div>
            <div className="flex justify-center align-items-center ">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>
        </>
    )
        ;
}