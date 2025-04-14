import TextInput from "../ui/TextInput.tsx";
import {useForm} from "react-hook-form";
import {ImageUploader} from "../ui/ImageUploader.tsx";
import {useState} from "react";
import {InputChips} from "../ui/InputChips.tsx";
import {Button} from "../ui/Button.tsx";
import toast from "react-hot-toast";
import {uploadImage} from "../../services/SupabaseService.ts";
import {CategoriesOptions, Treatment} from "../../types/treatment.ts";
import {useAddTreatment, useUpdateTreatment} from "./hooks/useTreatment.ts";

interface AddEditTreatmentFormProps{
    selectedTreatment? :Treatment;
    onClose?: () => void
}

export function AddEditTreatmentForm({selectedTreatment,onClose}:AddEditTreatmentFormProps) {
   const isAdd =selectedTreatment === undefined ;
    const [Image, setImage] = useState<File | null>(null);
    
    const [requiredEquipments, setRequiredEquipments] = useState<string[]>(selectedTreatment?.requiredEquipments ?? []);
    const [preRequisites, setPreRequisites] =  useState<string[]>(selectedTreatment?.preRequisites ?? []);
    const [afterCare, setAfterCares] = useState<string[]>(selectedTreatment?.afterCare ?? []);
    const [risks, setRisks] =  useState<string[]>(selectedTreatment?.risks ?? []);
    
    
    const { control ,handleSubmit,register } =useForm({
        defaultValues: {
            name :selectedTreatment?.name || '',
            price :selectedTreatment?.price || '',
            durationMinutes :selectedTreatment?.durationMinutes || '',
            description :selectedTreatment?.description || '' ,
            category:selectedTreatment?.category || '',
            requiredEquipments :selectedTreatment?.requiredEquipments || [] ,
            preRequisites :selectedTreatment?.preRequisites || [],
            afterCare :selectedTreatment?.afterCare || [],
            risks :selectedTreatment?.risks || [] 
        }
    });
    const {AddTreatment, isLoading, error } =useAddTreatment();
    const { UpdateTreatment   , updating, updateError} =useUpdateTreatment();
    
    const onSubmit = async  (data :any) => {
        if (isAdd &&!Image) {
            toast.error("Image is required");
            return;
        }
        
        let imageUrl: null | string = selectedTreatment?.imageUrl || '';

        if (Image) {
            imageUrl = await uploadImage({ file: Image, entity: "treatment" });
            if (!imageUrl) {
                toast.error("Image upload failed");
                return;
            }
        }
      
        if(isAdd) {
            const TreatmentData: Partial<Treatment> = {
                name: data.name,
                price: data.price,
                durationMinutes: data.durationMinutes,
                description: data.description,
                category: data.category,
                requiredEquipments: requiredEquipments,
                preRequisites: preRequisites,
                afterCare: afterCare,
                risks: risks,
                imageUrl
            };
            AddTreatment({newData: TreatmentData}, {
                onSuccess: () => {
                    onClose?.();
                    toast.success("Treatment created successfully");
                },
                onError: () => {
                    toast.error("Treatment creation failed");
                }
            });
        }else{
            const TreatmentData: Partial<Treatment> = {
                id:selectedTreatment?.id ,
                name: data.name,
                price: data.price,
                durationMinutes: data.durationMinutes,
                description: data.description,
                category: data.category,
                requiredEquipments: requiredEquipments,
                preRequisites: preRequisites,
                afterCare: afterCare,
                risks: risks,
                imageUrl
            };
            UpdateTreatment({id:selectedTreatment?.id , data: TreatmentData}, {
                onSuccess: () => {
                    onClose?.();
                    toast.success("Treatment updating successfully");
                },
                onError: () => {
                    toast.error("Treatment updated failed");
                }
            });
        }
        
    }
    
    if(error || updateError) return <p>Something wrong happened</p>
    return (
        <form className="text-gray-900 font-slab" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-2xl font-bold text-secondary mb-5 ">{isAdd?"Add Treatment" :selectedTreatment?.name}</h3>
            <div className="grid grid-rows-[1fr_1fr]  lg:grid-cols-[1fr_1fr] space-x-5  font-slab">
                <div>
                <TextInput control={control} label="Treatment Name" name="name" required/>
                <div className="form-group ">
                    <label className="block text-sm m-2 mt-4">Category</label>
                    <select className="mt-1 w-full p-2 border rounded-md text-gray-500 text-sm focus:outline-basic"  {...register("category")}>
                        {
                            CategoriesOptions.map((TreatmentOption :string) => (
                                <option key={TreatmentOption} value={TreatmentOption}>{TreatmentOption}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group flex gap-x-5">
                    <TextInput control={control} type="number" label="Price" name="price" required/>
                    <TextInput control={control} type="number" label="Duration Minutes" name="durationMinutes" required/>
                </div>
                <TextInput control={control} label="Description" name="description" component="textarea"/>
                <ImageUploader onFileSelected={setImage} name="Treatment" defaultImage={selectedTreatment?.imageUrl}/>
                </div>
                <div className="bg-gray-50 rounded-xl shadow-lg p-3 space-y-6">
                    <InputChips name="Required Equipments"  handleData ={setRequiredEquipments} data={requiredEquipments}/>
                    <InputChips name="PreRequisites" handleData ={setPreRequisites} data={preRequisites}/>
                    <InputChips name="After Care"  handleData ={setAfterCares} data={afterCare}/>
                    <InputChips name="Risks" handleData ={setRisks} data={risks}/>
                    <Button type="submit">
                        {isLoading || updating ? "loading..." : isAdd ?"Add Treatment" : "Save Changes"}
                    </Button>
                </div>
            </div>
        </form>
);
}

