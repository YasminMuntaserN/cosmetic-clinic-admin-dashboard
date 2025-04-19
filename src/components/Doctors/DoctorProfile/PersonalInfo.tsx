import {format} from 'date-fns';
import {Mail, Phone, Award, Clock, Calendar, MapPin, UserRoundX} from 'lucide-react';
import {Doctor} from "../../../types/doctor.ts";
import {Button} from "../../ui/Button.tsx";
import {EditDoctor} from "./EditDoctor.tsx";
import {DeleteModal} from "../../ui/DeleteModal.tsx";

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function PersonalInfo({doctor}: { doctor: Doctor | undefined }) {
    
    if (!doctor) return null;
    return (
        <>
            <div className="flex p-2 mb-6 justify-between border-b-2 border-b-basic">
                <h2 className="lg:text-2xl font-semibold">Personal Information</h2>
                <div className="flex gap-5">
                    <EditDoctor selectedDoctor={doctor}/>
                    <DeleteModal id={doctor.id}  dataType="doctor" button={<Button variant="SquareButton" ><UserRoundX/></Button>}/>
                </div>
            </div>
            <div className="space-y-4">
                <div className={Box}>
                    <Mail className="w-5 h-5 text-gray-500"/>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{doctor.email}</p>
                </div>

                <div className={Box}>
                    <Phone className="w-5 h-5 text-gray-500"/>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{doctor.phone}</p>
                </div>

                <div className={Box}>
                    <Award className="w-5 h-5 text-gray-500"/>
                    <p className="text-sm text-gray-500">Specialization</p>
                    <p className="font-medium">{doctor.specialization}</p>
                </div>

                <div className={Box}>
                    <MapPin className="w-5 h-5 text-gray-500"/>
                    <p className="text-sm text-gray-500">License Number</p>
                    <p className="font-medium">{doctor.licenseNumber}</p>
                </div>
            </div>

            <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[1fr_1fr] space-y-8">
                <div className="mt-12">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Calendar className="w-5 h-5 mr-2"/>
                        Account Details
                    </h3>
                    <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-500">
                            Member since: {format(new Date(doctor.createdAt), 'MMMM dd, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500">
                            Last updated: {format(new Date(doctor.updatedAt), 'MMMM dd, yyyy')}
                        </p>
                        <div className="flex gap-5 mt-3">
                            <p className="text-sm text-gray-500">Available:</p>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    doctor.isAvailable
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-600 text-gray-100'
                                }`}>
                                {doctor.isAvailable ? 'Available' : 'Unavailable'}
                             </span>
                        </div>

                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Clock className="w-5 h-5 mr-2"/>
                        Working Hours
                    </h3>
                    <div className="space-y-2">
                        {doctor.workingHours.map((hours, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b">
                                <span className="font-medium">{DAYS_OF_WEEK[hours.dayOfWeek]}</span>
                                <span className="text-gray-600">
                  {hours.startTime} - {hours.endTime}
                </span>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </>
    );
}

const Box = "grid lg:grid-cols-[0.1fr_0.5fr_1fr] grid-cols-[0.3fr_0.2fr_1fr]";