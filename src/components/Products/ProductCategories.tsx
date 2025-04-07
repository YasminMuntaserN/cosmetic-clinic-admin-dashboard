import {Filter, SlidersHorizontal} from "lucide-react";
import {ProductsOptions} from "../../types/product.ts";
import {useClinic} from "../../context/ClinicContext.tsx";

interface ProductCategoriesProps {
    onSort: (field: string, ascending: boolean) => void;
}
export function ProductCategories({onSort}:ProductCategoriesProps) {
    const {setCategory} =useClinic();
    return (
        <div  className="flex items-center space-x-4 justify-end">
            <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-5 w-5 "/>
                <select onChange={(e)=>onSort(e.target.value ,true)}
                    className="rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-basic sm:text-sm sm:leading-6">
                    <option value="name">Sort By</option>
                    <option value="name">Product Name</option>
                    <option value="price">Price</option>
                    <option value="stockQuantity">stock in Quantity</option>
                    <option value="createdAt">created At</option>
                </select>
            </div>
            
            <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 "/>
                <select onChange={(e)=>setCategory(e.target.value )}
                    className="rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-basic sm:text-sm sm:leading-6">
                    <option value="">All Categories</option>
                    {
                        ProductsOptions.map((productOption) =>(
                            <option key={productOption} value={productOption}>{productOption}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}