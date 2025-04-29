import {useFieldArray, useFormContext} from "react-hook-form";
import {PlusCircle, Stethoscope, X} from "lucide-react";
import TextInput from "../../ui/TextInput.tsx";
import {Patient} from "../../../types/patient.ts";
import {InputChips} from "../../ui/InputChips.tsx";
import {useEffect, useState} from "react";

export function MedicalHistoryForm() {
    const {control, register, setValue} = useFormContext<Patient>();
    const {fields: medicalFields, append: appendMedical, remove: removeMedical} = useFieldArray({
        control,
        name: "medicalHistory"
    });
    
    const [medicationsList, setMedicationsList] = useState<string[][]>(
        medicalFields.map(f => f.medications || [])
    );
    
    useEffect(() => {
        medicationsList.forEach((meds, index) => {
            setValue(`medicalHistory.${index}.medications`, meds);
        });
    }, [medicationsList]);

    return (
        <div className="space-y-4 font-slab">
            <div className="flex  items-center justify-between ">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Stethoscope className="w-5 h-5"/>
                    Medical History
                </h4>
                <button
                    type="button"
                    onClick={() => appendMedical({condition: '', diagnosis: '', diagnosisDate: '', medications: []})}
                    className="flex items-center gap-1 text-sm text-basic hover:text-gray-500"
                >
                    <PlusCircle className="w-4 h-4"/>
                    Add Condition
                </button>
            </div>
            <div className="flex space-y-4 space-x-4  flex-wrap">
                {medicalFields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-gray-50 rounded-lg shadow-xl w-[300px]">
                        <div className="flex justify-between items-center mb-3">
                            <h5 className="text-sm font-medium">Condition #{index + 1}</h5>
                            <button
                                type="button"
                                onClick={() => removeMedical(index)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <X className="w-4 h-4"/>
                            </button>
                        </div>
                        <div className="flex flex-col space-y-4 ">
                            <div>
                                <TextInput
                                    control={control}
                                    label="Condition"
                                    name={`medicalHistory.${index}.condition`}
                                />
                                <TextInput
                                    control={control}
                                    label="Diagnosis"
                                    name={`medicalHistory.${index}.diagnosis`}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Diagnosis Date</label>
                                    <input
                                        type="date"
                                        {...register(`medicalHistory.${index}.diagnosisDate`)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <InputChips
                                name="Medications"
                                data={medicationsList[index] || []}
                                handleData={(newData :string[]) => {
                                    const updated :string[][] = [...medicationsList];
                                    updated[index] = newData;
                                    setMedicationsList(updated);
                                }}
                                required={true}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}