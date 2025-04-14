import {useMutation} from "@tanstack/react-query";
import {Pagination, SearchCriteria} from "../../../types/Pagination.ts";
import {
    addEntity,
    deleteEntity,
    getAllBy,
    getById,
    paginatedList,
    Search,
    UpdateEntity
} from "../../../services/BaseApi.ts";
import {Product} from "../../../types/product.ts";

export function useAddProduct() {
    const {
        mutate: AddProduct,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :({newData}: {newData:Partial<Product> })=>addEntity("Products" ,newData),
        mutationKey :["addProduct"],
    });
    return {
        AddProduct,
        Product: data ?? [],
        isLoading:status === "pending",
        error
    }
}

export function usePaginatedProductsList(){
    const { mutate :getPaginatedProductsList, data, status, error } = useMutation({
        mutationFn:(PaginationData :Pagination)=>paginatedList("Products" , PaginationData),
        mutationKey:["Products"]
    });

    return { getPaginatedProductsList ,
        products :data?.data ,
        totalPages :data?.totalPages ,
        totalCount :data?.totalCount ,
        isLoading: status === "pending",
        error };
}

export function useProductsListByCategory() {
    const {
        mutate: getProductsByCategory,
        data,
        status,
        error,
    } = useMutation({
        mutationFn: (category: string):Promise<Product[]> =>
            getAllBy("Products", `getByCategory?category=${category}`), 
        mutationKey: ["ProductsByCategory"],
    });

    return {
        getProductsByCategory,
        productsByCategory: data ?? [], 
        isLoading: status === "pending",
        error,
    };
}

export function useSearchedProducts() {
    const {
        mutate: getSearchedProducts,
        data,
        status,
        error,
    } = useMutation({
        mutationFn: (searchCriteria:SearchCriteria):Promise<Product[]> =>
            Search("Products" ,searchCriteria),
        mutationKey: ["SearchedProducts"],
    });

    return {
        getSearchedProducts,
        SearchedProducts: data ?? [],
        isLoading: status === "pending",
        error,
    };
}

export function useProduct(){
    const { mutate :getProduct, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Product>=>getById("Products" ,id),
        mutationKey:["Products"]
    });

    return { getProduct ,
        product :data ,
        isLoading: status === "pending",
        error };
}

export function useUpdateProduct(){
    const { mutate :UpdateProduct, data, status, error } = useMutation({
        mutationFn:({id ,data}: {id :string ,data:Partial<Product>}):Promise<Product>=>UpdateEntity("Products",id ,data),
        mutationKey:["Products"]
    });

    return { UpdateProduct ,
        updatedProduct :data ,
        updating: status === "pending",
        updateError :error};
}

export function useDeleteProduct(){
    const { mutate :deleteProduct, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Product>=>deleteEntity("Products" ,id),
        mutationKey:["deleteProduct"]
    });

    return { deleteProduct ,
        Product :data ,
        isLoading: status === "pending",
        error };
}
