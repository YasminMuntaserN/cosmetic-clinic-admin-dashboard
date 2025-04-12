import {FormProvider, useForm} from "react-hook-form";
import TextInput from "../ui/TextInput";
import {ImageUploader} from "../ui/ImageUploader.tsx";
import {Button} from "../ui/Button.tsx";
import {useState} from "react";
import {uploadImage} from "../../services/SupabaseService.ts";
import {useAddDoctor, useUpdateDoctor} from "./hooks/useDoctor.ts";
import {Doctor, WorkingHours} from "../../types/doctor.ts";
import {WorkingHoursInput} from "./WorkingHoursInput.tsx";
import toast from "react-hot-toast";
import {DAYS_OF_WEEK, Today} from "../../utils/constants.ts";
import {Badge} from "../ui/Badge.tsx";

interface AddEditDoctorFormProps{
    selectedDoctor? :Doctor;
    onClose?: () => void
}

function mergeWithAllDays(doctorHours: WorkingHours[]) {
    return DAYS_OF_WEEK.map(day => {
        const match :WorkingHours | undefined = doctorHours.find(d => d.dayOfWeek === day.value);
        return  match? { ...match, isWorking: true }  : {
            dayOfWeek: day.value,
            startTime: '',
            endTime: '',
            isWorking: false,
        };
    });
}

export function AddEditDoctorForm({selectedDoctor ,onClose} :AddEditDoctorFormProps) {
    const isAdd = selectedDoctor === undefined;
    const [Image, setImage] = useState<File | null>(null);
    const {AddDoctor , isLoading, error } =useAddDoctor();
    const { UpdateDoctor   , updating, updateError} =useUpdateDoctor();
    
    const methods = useForm({
        defaultValues: {
            firstName: selectedDoctor?.firstName || '',
            lastName: selectedDoctor?.lastName || '',
            email: selectedDoctor?.email || '',
            phone: selectedDoctor?.phone || '',
            specialization: selectedDoctor?.specialization || '',
            licenseNumber: selectedDoctor?.licenseNumber || '',
            isAvailable: selectedDoctor?.isAvailable || '',
            workingHours: selectedDoctor?.workingHours
                ? mergeWithAllDays(selectedDoctor.workingHours)
                : DAYS_OF_WEEK.map(day => ({
                    dayOfWeek: day.value,
                    startTime: '',
                    endTime: '',
                    isWorking: false,
                })),
        },
    });
    
    const { control, handleSubmit, watch ,register } = methods;

    const onSubmit = async (data: any) => {
        if (isAdd && !Image) {
            toast.error("Image is required");
            return;
        }

        let imageUrl: null | string = selectedDoctor?.imageUrl || '';
        
        if (Image) {
            imageUrl = await uploadImage({ file: Image, entity: "doctor" });
            if (!imageUrl) {
                toast.error("Image upload failed");
                return;
            }
        }

        const workingHours = watch("workingHours")
            .filter((work: any) => work.isWorking && work.startTime && work.endTime)
            .map((workHour: WorkingHours) => ({
                dayOfWeek: workHour.dayOfWeek,
                startTime: workHour.startTime,
                endTime: workHour.endTime,
            }));

        if (workingHours.length === 0) {
            toast.error("Working hours not available");
            return;
        }
        
        if(isAdd) {
            const DoctorData: Partial<Doctor> = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                specialization: data.specialization,
                licenseNumber: data.licenseNumber,
                imageUrl: imageUrl ,
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
        }else{
            const DoctorData: Partial<Doctor> = {
                id:selectedDoctor.id,
                userId:selectedDoctor.userId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                specialization: data.specialization,
                licenseNumber: data.licenseNumber,
                imageUrl: imageUrl ,
                workingHours: workingHours,
                updatedAt:Today,
                createdAt:selectedDoctor?.createdAt,
            };
            UpdateDoctor({id:selectedDoctor.id , data:DoctorData}, {
                onSuccess: () => {
                    onClose?.();
                    toast.success("Doctor Data Updated successfully");
                },
                onError: () => {
                    toast.error("Doctor Data Updated failed");
                }
            });
        }
    };

    if(error || updateError) return <p>something get wrong</p>
   
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}  className="lg:text-2xl text-gray-900 font-slab ">
                <h3 className="text-3xl font-bold text-secondary mb-5 ">{isAdd ? "Add Doctor" : ` Dr. ${selectedDoctor?.firstName} ${selectedDoctor?.lastName}`}</h3>
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
                                    pattern: {
                                        value: /^\+?[1-9]\d{1,14}$/,
                                        message: "Phone number must be in a valid international format"
                                    }
                                }}
                                required
                            />
                        </div>

                        <div className={Box}>
                            <TextInput control={control} label="Specialization" name="specialization" required/>
                            <TextInput control={control} label="License Number" name="licenseNumber" required/>
                        </div>
                        {!isAdd && <div className="flex mb-4">
                            <label className="text-sm m-2 mt-4">Is Available:</label>
                            <div className="flex items-center gap-3 mt-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        {...register("isAvailable")}
                                        value="true"
                                        className="w-4 h-4 accent-basic"
                                        checked={selectedDoctor?.isAvailable}
                                    />
                                    <Badge variant="success">Available</Badge>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        {...register("isAvailable")}
                                        value="false"
                                        className="w-4 h-4 accent-basic"
                                        checked={!selectedDoctor?.isAvailable}
                                    />
                                    <Badge variant="default">unavailable</Badge>
                                </label>
                            </div>
                        </div>
                        }
                        <ImageUploader onFileSelected={setImage} name="Profile"
                                       defaultImage={selectedDoctor?.imageUrl}/>
                    </div>

                    <div>
                        <WorkingHoursInput/>
                        <Button type="submit">
                            {isLoading || updating ? "loading..." : isAdd ? "Add Doctor" : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

const Box = "form-group flex gap-x-5";