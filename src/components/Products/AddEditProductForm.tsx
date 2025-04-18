import TextInput from "../ui/TextInput.tsx";
import {useForm} from "react-hook-form";
import {Product, ProductsOptions} from "../../types/product.ts";
import {ImageUploader} from "../ui/ImageUploader.tsx";
import {useState} from "react";
import {InputChips} from "../ui/InputChips.tsx";
import {Button} from "../ui/Button.tsx";
import {useAddProduct, useUpdateProduct} from "./hooks/useProduct.ts";
import toast from "react-hot-toast";
import {uploadImage} from "../../services/SupabaseService.ts";
import {ButtonLoader} from "../ui/Loading.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";


interface AddEditProductFormProps{
    selectedProduct? :Product;
    onClose?: () => void
}

export function AddEditProductForm({selectedProduct, onClose}:AddEditProductFormProps) {
    const isAdd = selectedProduct === undefined ;
    const [Image, setImage] = useState<File | null>(null);
    const [sideEffects, setSideEffects] = useState<string[]>(selectedProduct?.sideEffects || []);
    const [ingredients, setIngredients] =  useState<string[]>(selectedProduct?.ingredients ||[]);
   
    const { control ,handleSubmit,register } =useForm({
        defaultValues:{
            name :selectedProduct?.name || '' ,
            price :selectedProduct?.price || ''  ,
            stockQuantity :selectedProduct?.stockQuantity || ''  ,
            description :selectedProduct?.description || ''  ,
            sideEffects :selectedProduct?.sideEffects || [''] ,
            ingredients :selectedProduct?.ingredients || [''] ,
            manufacturer:selectedProduct?.manufacturer || ''  ,
            usage:selectedProduct?.usage|| ''  ,
            category:selectedProduct?.category || '' ,
        }
    });
    const {AddProduct, isLoading, error } =useAddProduct();
    const { UpdateProduct   , updating, updateError} =useUpdateProduct();
    
    const onSubmit = async  (data :any) => {
        if (isAdd &&!Image) {
            toast.error("Image is required");
            return;
        }

        let imageUrl: null | string = selectedProduct?.imageUrl || '';

        if (Image) {
            imageUrl = await uploadImage({ file: Image, entity: "product" });
            if (!imageUrl) {
                toast.error("Image upload failed");
                return;
            }
        }

        if(isAdd) {
            const productData: Partial<Product> = {
                name: data.name,
                price: data.price,
                stockQuantity: data.stockQuantity,
                description: data.description,
                sideEffects,
                ingredients: ingredients,
                manufacturer: data.manufacturer,
                usage: data.usage,
                category: data.category,
                imageUrl
            };
            AddProduct({newData: productData}, {
                onSuccess: () => {
                    onClose?.();
                    toast.success("Product created successfully");
                },
                onError: () => {
                    toast.error("Product creation failed");
                }
            });
        }else{
            const productData: Partial<Product> = {
                id:selectedProduct?.id ,
                name: data.name,
                price: data.price,
                stockQuantity: data.stockQuantity,
                description: data.description,
                sideEffects,
                ingredients: ingredients,
                manufacturer: data.manufacturer,
                usage: data.usage,
                category: data.category,
                imageUrl
            };
            UpdateProduct({id:selectedProduct?.id , data: productData}, {
                onSuccess: () => {
                    onClose?.();
                    toast.success("product updating successfully");
                },
                onError: () => {
                    toast.error("product updated failed");
                }
            });
        }
        
    }
    
    if(error || updateError) return <ErrorMessage />;
    return (
        <form className="text-gray-900 font-slab" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-2xl font-bold text-secondary mb-5 "> {isAdd ? "Add Product" :selectedProduct?.name}</h3>
            <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[1fr_1fr] space-y-5 lg:space-x-5  font-slab">
                <div>
                <TextInput control={control} label="Product Name" name="name" required/>
                <div className="form-group ">
                    <label className="block text-sm m-2 mt-4">Category</label>
                    <select className="mt-1 w-full p-2 border rounded-md text-gray-500 text-sm focus:outline-basic"  {...register("category")}>
                        {
                            ProductsOptions.map((productOption) => (
                                <option key={productOption} value={productOption}>{productOption}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group flex gap-x-5">
                    <TextInput control={control} type="number" label="Price" name="price" required/>
                    <TextInput control={control} type="number" label="Stock Quantity" name="stockQuantity" required/>
                </div>
                <TextInput control={control} label="Manufacturer" name="manufacturer" placeholder="e.g. CeraVe"
                           required/>
                <TextInput control={control} label="Usage" name="usage"
                           placeholder="e.g. Apply to wet skin, massage gently, and rinse thoroughly"
                           component="textarea"/>
                <TextInput control={control} label="Description" name="description"
                           placeholder="e.g. A gentle, non-foaming cleanser that removes dirt and oil while hydrating the skin"
                           component="textarea"/>
                </div>
                <div className="bg-gray-50 rounded-xl shadow-lg p-3 space-y-6">
                    <InputChips name="Side Effects"  handleData ={setSideEffects} data={sideEffects}  required={true}/>
                    <InputChips name="Ingredients" handleData ={setIngredients} data={ingredients}  required={true}/>
                    <ImageUploader onFileSelected={setImage} name="Product" defaultImage={selectedProduct?.imageUrl}/>
                    <Button type="submit">
                        {isLoading ||updating ? <><ButtonLoader /> loading...</> : isAdd ? "Add Product" :"Save changes" }
                    </Button>
                </div>
            </div>
        </form>
);
}

