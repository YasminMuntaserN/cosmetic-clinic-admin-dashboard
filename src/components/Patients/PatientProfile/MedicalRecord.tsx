import { Stethoscope, Pill, AlertCircle } from 'lucide-react';
import type { Patient } from "../../../types/patient";
import {format} from "date-fns";

export function MedicalRecord({ patient }: { patient: Patient | undefined }) {
    if (!patient) return null;

    return (
        <>
            <div className="p-2 mb-6 border-b-2 border-b-basic font-slab">
                <h2 className="lg:text-2xl font-semibold">Medical Record</h2>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                        <Stethoscope className="w-5 h-5 mr-2" />
                        Medical History
                    </h3>
                    <div className="space-y-6">
                        {patient.medicalHistory.map((history, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4 border-2 shadow-lg">
                                <div className="grid grid-cols-[1fr_2fr] ">
                                    <div>
                                        <p className="text-gray-500 font-medium text-xs">
                                            {format(new Date(history.diagnosisDate), 'MMMM dd, yyyy')}
                                        </p>
                                    </div>
                                    <div className="text-sm ">
                                        <div className="flex gap-3">
                                            <p className="font-medium">Condition : </p>
                                            <p className="text-gray-500">{history.condition}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <p className="font-medium">Diagnosis</p>
                                            <p className="text-gray-500">{history.diagnosis}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex items-center mb-2 font-medium">
                                                <Pill className="w-4 h-4 mr-2"/>
                                                <p >Medications</p>
                                            </div>
                                            <ul className="list-disc list-inside space-y-1 ml-6">
                                                {history.medications.map((medication, medIndex) => (
                                                    <li key={medIndex} className="text-gray-700">
                                                        {medication}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                        <AlertCircle className="w-5 h-5 mr-2"/>
                        Allergies
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            {patient.allergies.map((allergy, index) => (
                                <li key={index} className="text-gray-700">
                                    {allergy}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}