import TextInput from "../ui/TextInput.tsx";
import {FormProvider, useForm} from "react-hook-form";
import {useState} from "react";
import {InputChips} from "../ui/InputChips.tsx";
import {Button} from "../ui/Button.tsx";
import toast from "react-hot-toast";
import {Badge} from "../ui/Badge.tsx";
import {useAddPatient} from "./hooks/usePatient.ts";
import {Patient} from "../../types/patient.ts";
import MedicalHistory from "./MedicalHistory/MedicalHistory.tsx";

export function AddEditPatientForm({onClose}: { onClose?: () => void }) {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const methods = useForm<Patient>({defaultValues: {
        medicalHistory: [{ condition: '', diagnosis: '', diagnosisDate: '', medications: [] }],
            allergies: [],
    }});
    const {AddPatient, isLoading, error} = useAddPatient();
    const {control, handleSubmit, register} =methods;
    
    const onSubmit = async (data: any) => {
        if(data.gender === null) {
            toast.error("Gender is required");
            return;
        }
        const PatientData: Partial<Patient> = {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            phone: data.phone,
            email: data.email,
            medicalHistory: data.medicalHistory,
            emergencyContact :data.emergencyContact,
            address :data.address,
            dateOfBirth :data.dateOfBirth,
            allergies :ingredients
        };
        AddPatient({newData: PatientData}, {
            onSuccess: () => {
                onClose?.();
                toast.success("Patient created successfully");
            },
            onError: () => {
                toast.error("Patient creation failed");
            }
        });

    }

    if (error) return <p>Something wrong happened</p>
    
    return (
        <FormProvider {...methods}>
            <form className="text-gray-900 font-slab" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="lg:text-2xl font-bold text-secondary mb-5">Add Patient</h3>
                <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[1fr_1fr] lg:space-x-5 font-slab">
                    <div>
                        <div className={Box}>
                            <TextInput control={control} label="First Name" name="firstName" required/>
                            <TextInput control={control} label="Last Name" name="lastName" required/>
                        </div>

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

                        <div className={Box}>
                            <TextInput
                                control={control}
                                label="Phone Number"
                                name="phone"
                                rules={{
                                    pattern: {value: /^\+?[1-9]\d{1,14}$/, message: "Phone number must be in a valid international format"}
                                }}
                                required
                            />
                            <TextInput
                                control={control}
                                label="Emergency Contact"
                                name="emergencyContact"
                                rules={{
                                    pattern: {
                                        value: /^\+?[1-9]\d{1,14}$/,
                                        message: "Invalid Emergency Contact must be in a valid international format"
                                    }
                                }}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                {...register('dateOfBirth', {
                                    required: 'Date of Birth is required',
                                    validate: value =>
                                        new Date(value) <= new Date() || 'Date of Birth cannot be in the future'
                                })}
                                max={new Date().toISOString().split('T')[0]}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-basic focus:ring-basic"
                            />
                        </div>

                        <div className="flex mb-4">
                            <label className="text-sm m-2 mt-4">Gender:</label>
                            <div className="flex items-center gap-3 mt-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        {...register("gender")}
                                        value="male"
                                        className="w-4 h-4 accent-basic"
                                    />
                                    <Badge variant="Male">Male</Badge>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        {...register("gender")}
                                        value="female"
                                        className="w-4 h-4 accent-basic"
                                    />
                                    <Badge variant="Female">Female</Badge>
                                </label>
                            </div>
                        </div>
                        <InputChips name="Ingredients" handleData={setIngredients} data={ingredients}/>
                    </div>

                    <div className="bg-gray-50 rounded-xl shadow-lg w-full p-3 space-y-6 ">
                        <fieldset className="border border-gray-200 p-2 rounded-md">
                            <legend className="text-sm font-semibold text-gray-700">Address</legend>
                            <TextInput control={control} label="Street" name="address.street" required/>
                            <TextInput control={control} label="City" name="address.city" required/>
                            <div className="form-group flex gap-x-5">
                                <TextInput control={control} label="State" name="address.state" required/>
                                <TextInput control={control} label="Postal Code" name="address.postalCode" required/>
                            </div>
                            <TextInput control={control} label="Country" name="address.country" required/>
                        </fieldset>
                        <MedicalHistory/>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Add Patient"}
                        </Button>
                    </div>
                </div>

            </form>
        </FormProvider>
    );
}

const Box = "form-group flex gap-x-5";