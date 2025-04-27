import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {
    AlertCircle,
    Info,
    Warehouse,
    Factory,
    FlaskConical,
    ScrollText,
} from 'lucide-react';
import {Badge} from '../components/ui/Badge';
import {useProduct} from "../components/Products/hooks/useProduct.ts";
import {DetailPageLayout} from "../components/ui/DetailPageLayout.tsx";
import {Loading} from "../components/ui/Loading.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

export function ProductProfile() {
    const {productId} = useParams<{ productId: string }>();
    const {getProduct, product, isLoading, error} = useProduct();
    
    useEffect(() => {
        if (productId) {
            getProduct({id: productId});
        }
    }, [productId, getProduct]);

    if (isLoading) return <Loading />;
    if (!product) return null;

    return (
        <DetailPageLayout
            selectedData={product}
            dataType="product"
            title={product.name}
            imageUrl={product.imageUrl}
            category={product.category}
            price={product.price}
            addtionalData={
                <>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Warehouse className="w-5 h-5"/>
                        <span>Stock: {product.stockQuantity} units</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Factory className="w-5 h-5"/>
                        <span>Manufacturer: {product.manufacturer}</span>
                    </div>
                </>
            }
            backTo="/products"
            updatedAt={product.updatedAt}
            createdAt={product.createdAt}
        >

            { error && <ErrorMessage/>}
            <section className="border-2 rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5"/>
                    Description
                </h2>
                <p className="text-gray-600">{product.description}</p>
            </section>

            <section className="border-2 rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <FlaskConical className="w-5 h-5"/>
                    Ingredients
                </h2>
                <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                        <Badge
                            key={index}
                            variant="warning"
                        >
                            {ingredient}
                        </Badge>
                    ))}
                </div>
            </section>

            <section className="border-2 rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <ScrollText className="w-5 h-5"/>
                    Usage Instructions
                </h2>
                <p className="text-gray-600">{product.usage}</p>
            </section>

            <section className="border-2 rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5"/>
                    Side Effects
                </h2>
                <ul className="list-disc list-inside space-y-2">
                    {product.sideEffects.map((effect, index) => (
                        <li key={index} className="text-gray-600">{effect}</li>
                    ))}
                </ul>
            </section>

        </DetailPageLayout>
    );
}