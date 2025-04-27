import {Product, ProductsOptions} from "../../types/product.ts";
import {ProductItem} from "./ProductItem.tsx";
import {Pagination} from "../ui/Pagination.tsx";
import {TableControls} from "../ui/TableControls.tsx";
import {Loading} from "../ui/Loading.tsx";

interface ProductListProps {
    products: Product[];
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage: number;
    isLoading?: boolean;
    onSort: (field: string, ascending: boolean) => void;
}

export function ProductList({products, currentPage, totalPages, onPageChange ,onSort ,isLoading}: ProductListProps) {
    return (
        <>
            {isLoading && <Loading />}
            <TableControls onSort={onSort} CategoriesOptions={ProductsOptions} SortOptions={["name","price", "stockQuantity","createdAt"]}/>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product: Product) => (
                    <ProductItem  key={product.id} product={product}/>
                ))}
            </div>
            <div className="flex justify-center align-items-center ">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>
        </>
    )
        ;
}