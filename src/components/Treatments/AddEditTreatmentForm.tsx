import TextInput from "../ui/TextInput.tsx";
import {useForm} from "react-hook-form";
import {ImageUploader} from "../ui/ImageUploader.tsx";
import {useState} from "react";
import {InputChips} from "../ui/InputChips.tsx";
import {Button} from "../ui/Button.tsx";
import toast from "react-hot-toast";
import {uploadImage} from "../../services/SupabaseService.ts";
import {CategoriesOptions, Treatment} from "../../types/treatment.ts";
import {useAddTreatment} from "./hooks/useTreatment.ts";

export function AddEditTreatmentForm({onClose}:{onClose?: () => void}) {
    const [Image, setImage] = useState<File | null>(null);
    const [requiredEquipments, setRequiredEquipments] = useState<string[]>([]);
    const [preRequisites, setPreRequisites] =  useState<string[]>([]);
    const [afterCare, setAfterCares] = useState<string[]>([]);
    const [risks, setRisks] =  useState<string[]>([]);
    
    
    const { control ,handleSubmit,register } =useForm();
    const {AddTreatment, isLoading, error } =useAddTreatment();
    
    const onSubmit = async  (data :any) => {
        if (!Image) {
            toast.error("Image is required");
            return;
        }
        const imageUrl = await uploadImage({ file: Image, entity: "treatment" });
        if (!imageUrl) {
            toast.error("Image upload failed");
            return;
        }
        
        const TreatmentData :Partial<Treatment> ={
            name :data.name ,
            price :data.price ,
            durationMinutes :data.durationMinutes ,
            description :data.description ,
            category:data.category,
            requiredEquipment :requiredEquipments ,
            preRequisites :preRequisites ,
            afterCare :afterCare,
            risks :risks ,
            imageUrl
        };
        AddTreatment({ newData: TreatmentData }, {
            onSuccess: () => {
                onClose?.();
                toast.success("Treatment created successfully");
            },
            onError: () => {
                toast.error("Treatment creation failed");
            }
        });
        
    }
    
    if(error) return <p>Something wrong happened</p>
    return (
        <form className="text-gray-900 font-slab" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-2xl font-bold text-secondary mb-5 ">Add Treatment</h3>
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
                <ImageUploader onFileSelected={setImage} name="Treatment"/>
                </div>
                <div className="bg-gray-50 rounded-xl shadow-lg p-3 space-y-6">
                    <InputChips name="Required Equipments"  handleData ={setRequiredEquipments} data={requiredEquipments}/>
                    <InputChips name="PreRequisites" handleData ={setPreRequisites} data={preRequisites}/>
                    <InputChips name="After Care"  handleData ={setAfterCares} data={afterCare}/>
                    <InputChips name="Risks" handleData ={setRisks} data={risks}/>
                    <Button type="submit">
                        {isLoading ? "loading..." :"Add Treatment" }
                    </Button>
                </div>
            </div>
        </form>
);
}

