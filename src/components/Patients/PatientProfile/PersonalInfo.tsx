import { format } from 'date-fns';
import { Mail, Phone, Calendar, MapPin, UserRoundX, User2, Home } from 'lucide-react';
import { Patient } from "../../../types/patient";
import { Button } from "../../ui/Button";
import { EditPatient } from "./EditPatient";
import {DeleteModal} from "../../ui/DeleteModal.tsx";

export function PersonalInfo({ patient }: { patient: Patient | undefined }) {

    if (!patient) return null;

    return (
        <>
            <div className="flex p-2 mb-6 justify-between border-b-2 border-b-basic">
                <h2 className="lg:text-2xl font-semibold">Personal Information</h2>
                <div className="flex gap-5">
                    <EditPatient selectedPatient={patient} />
                   <DeleteModal id={patient.id}  dataType="patient" button={ <Button variant="SquareButton" ><UserRoundX /></Button>} />
                </div>
            </div>

            <div className="space-y-4">
                <div className={Box}>
                    <Mail className="w-5 h-5 text-gray-500" />
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{patient.email}</p>
                </div>

                <div className={Box}>
                    <Phone className="w-5 h-5 text-gray-500" />
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{patient.phone}</p>
                </div>

                <div className={Box}>
                    <User2 className="w-5 h-5 text-gray-500" />
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{patient.gender}</p>
                </div>

                <div className={Box}>
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{format(new Date(patient.dateOfBirth), 'MMMM dd, yyyy')}</p>
                </div>
            </div>

            <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[1fr_1fr] gap-8 mt-8">
                <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                        <Home className="w-5 h-5 mr-2" />
                        Address Information
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-500">Street:</span>
                            <span className="ml-2">{patient.address.street}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-500">City:</span>
                            <span className="ml-2">{patient.address.city}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-500">State:</span>
                            <span className="ml-2">{patient.address.state}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-500">Postal Code:</span>
                            <span className="ml-2">{patient.address.postalCode}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-500">Country:</span>
                            <span className="ml-2">{patient.address.country}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                        <Calendar className="w-5 h-5 mr-2" />
                        Account Details
                    </h3>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500">
                            Member since: {format(new Date(patient.createdAt), 'MMMM dd, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500">
                            Last updated: {format(new Date(patient.updatedAt), 'MMMM dd, yyyy')}
                        </p>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-medium">Emergency Contact:</p>
                            <p className="mt-1">{patient.emergencyContact}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const Box = "grid lg:grid-cols-[0.1fr_0.5fr_1fr] grid-cols-[0.3fr_0.2fr_1fr]";