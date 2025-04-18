import {useEffect, useState} from "react";
import {ProductList} from "../components/Products/ProductList.tsx";
import {
    usePaginatedProductsList,
    useProductsListByCategory,
    useSearchedProducts
} from "../components/Products/hooks/useProduct.ts";
import {Product} from "../types/product.ts";
import {PaginatedResponse} from "../types/Pagination.ts";
import {Modal} from "../components/ui/Modal.tsx";
import {AddModal} from "../components/ui/AddModal.tsx";
import {AddEditProductForm} from "../components/Products/AddEditProductForm.tsx";
import {useClinic} from "../context/ClinicContext.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";


export function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState('name');
    const [ProductsList, setProductList] = useState<Product[]>([]);
    const {getPaginatedProductsList, totalPages, isLoading, error} = usePaginatedProductsList();
    const {
        getProductsByCategory,
        isLoading: productsCategoryLoading,
        error: productsCategoryError
    } = useProductsListByCategory();
    const {
        getSearchedProducts,
        isLoading: SearchedProductsLoading,
        error: SearchedProductsError
    } = useSearchedProducts();
    const {category, search} = useClinic();


    useEffect(() => {
        if (search.term) {
            getSearchedProducts(
                {field: "name", value: search.term},
                {
                    onSuccess: (data: Product[]) => {
                        setProductList(data);
                    }
                }
            );
        }
    }, [search]);

    useEffect(() => {
        if (!search.term) {
            if (category) {
                getProductsByCategory(
                    category,
                    {
                        onSuccess: (data: Product[]) => {
                            setProductList(data);
                        }
                    }
                );
            } else {
                getPaginatedProductsList(
                    {PageNumber: currentPage, PageSize: 6, OrderBy: orderBy},
                    {
                        onSuccess: (data: PaginatedResponse) => {
                            setProductList(data.data);
                        }
                    }
                );
            }
        }
    }, [currentPage, orderBy, category, search.term]);


    const handleSort = (field: string) => {
        setOrderBy(field);
        setCurrentPage(1);
    };

    if (error || productsCategoryError || SearchedProductsError) return <ErrorMessage />;

    return (
        <Modal>
            <div className="space-y-6">
                <ProductList
                    products={ProductsList ?? []}
                    totalPages={totalPages ?? 0}
                    onPageChange={setCurrentPage}
                    onSort={handleSort}
                    currentPage={currentPage}
                    isLoading={isLoading || productsCategoryLoading || SearchedProductsLoading}
                />
            </div>
            <Modal.Open opens="addProduct">
                <AddModal/>
            </Modal.Open>
            
            <Modal.Window name="addProduct">
                <AddEditProductForm />
            </Modal.Window>
            
        </Modal>
    );
}