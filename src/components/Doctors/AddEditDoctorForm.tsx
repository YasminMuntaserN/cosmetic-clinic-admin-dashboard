import {FormProvider, useForm} from "react-hook-form";
import TextInput from "../ui/TextInput";
import {ImageUploader} from "../ui/ImageUploader.tsx";
import {Button} from "../ui/Button.tsx";
import {useState} from "react";
import {uploadImage} from "../../services/SupabaseService.ts";
import {useAddDoctor} from "./hooks/useDoctor.ts";
import {Doctor, WorkingHours} from "../../types/doctor.ts";
import {WorkingHoursInput} from "./WorkingHoursInput.tsx";
import toast from "react-hot-toast";

export function AddEditDoctorForm({onClose}:{onClose?: () => void}) {
    const [Image, setImage] = useState<File | null>(null);
    const {AddDoctor , isLoading, error } =useAddDoctor();
    const methods = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            specialization: '',
            licenseNumber: '',
            workingHours: Array.from({ length: 5 }, (_, i) => ({
                dayOfWeek: i,
                startTime: '',
                endTime: '',
                isWorking: false,
            }))
        }
    });
    const { control, handleSubmit, watch } = methods;

    const onSubmit = async (data: any) => {
        if (!Image) {
            toast.error("Image is required");
            return;
        }
        const imageUrl = await uploadImage({ file: Image, entity: "doctor" });
        if (!imageUrl) {
            toast.error("Image upload failed");
            return;
        }

        const workingHours = watch("workingHours")
            .filter((work: any) => work.isWorking && work.startTime && work.endTime)
            .map((workHour: WorkingHours) => ({
                dayOfWeek: workHour.dayOfWeek,
                startTime: workHour.startTime,
                endTime: workHour.endTime
            }));

        if(workingHours.length === 0){
            toast.error("Working hours not available");
            return;
        }
        
        const DoctorData: Partial<Doctor> = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            specialization: data.specialization,
            licenseNumber: data.licenseNumber,
            imageUrl: imageUrl,
            workingHours: workingHours 
        };

        AddDoctor(DoctorData, {
            onSuccess: () => {
                onClose?.();
                toast.success("Doctor created successfully");
            },
            onError: () => {
                toast.error("Doctor creation failed");
            }
        });
    };

    if(error) return <p>something get wrong</p>
   
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}  className="lg:text-2xl text-gray-900 font-slab ">
                <h3 className="text-3xl font-bold text-secondary mb-5 ">Add Doctor</h3>
                <div className="flex space-x-5 lg:flex-row flex-col font-slab">
                    <div>
                        <div className={Box}>
                            <TextInput control={control} label="First Name" name="firstName" required/>
                            <TextInput control={control} label="Last Name" name="lastName" required/>
                        </div>

                        <div className={Box}>
                            <TextInput
                                control={control}
                                label="Email"
                                name="email"
                                rules={{
                                    minLength: {value: 3, message: "Minimum 3 characters"},
                                    pattern: {value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email"}
                                }}
                                required
                            />
                            <TextInput
                                control={control}
                                label="Phone Number"
                                name="phone"
                               rules={{
                                    pattern: {value: /^[0-9]{10}$/, message: "Invalid phone number (must be 10 digits)"}
                                }}
                                required
                            />
                        </div>

                        <div className={Box}>
                            <TextInput control={control} label="Specialization" name="specialization" required/>
                            <TextInput control={control} label="License Number" name="licenseNumber" required/>
                        </div>
                        <ImageUploader onFileSelected={setImage} name="Profile"/>
                    </div>
                    <div>
                        <WorkingHoursInput />
                        <Button type="submit">
                            {isLoading ? "loading..." :"Add Doctor" }
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

const Box = "form-group flex gap-x-5";