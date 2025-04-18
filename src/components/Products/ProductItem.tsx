import {Product} from "../../types/product.ts";
import {EditView} from "../ui/EditView.tsx";

interface ProductProps {
    product: Product;
}
export function ProductItem({product}:ProductProps) {
    return (
        <div
            className="relative rounded-lg border bg-white px-6 py-5 shadow-basic shadow-sm hover:shadow-md transition-shadow "
        >
            <div className="aspect-w-3 aspect-h-2 mb-4">
                <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={product.imageUrl}
                    alt={product.name}
                />
            </div>
            <div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">${product.price}</p>
                <p className="text-sm text-gray-500">{product.stockQuantity} in stock</p>
            </div>
            <EditView type="product" Id={product?.id} data={product}/>
        </div>
    )
}