import {Mail, Phone,Clock10} from 'lucide-react';
import type { Doctor } from '../../types/doctor';
import {DoctorOperationButtons} from "./DoctorOperationBauttons.tsx";

interface DoctorCardProps {
    doctor: Doctor;
}

export function DoctorCard({ doctor}: DoctorCardProps) {
    const fullName = `${doctor.firstName} ${doctor.lastName}`;

    return (
        <div className="grid grid-cols-2 gap-10">
            <div className="aspect-w-3 aspect-h-2 mb-4">
                <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={doctor.imageUrl}
                    alt={`${fullName}`}
                />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-secondary mb-5">
                    {fullName}
                </h3>

                <div  className={StyledInfo}>
                    <Mail size={16}/>
                    <p>{doctor.email}</p>
                </div>

                <div className={StyledInfo}>
                    <Phone size={16}/>
                    <p>{doctor.phone}</p>
                </div>

                <div className={StyledInfo}>
                    <Clock10 size={16}/>
                    <span> Schedule:</span>
                    <ul className="list-disc pl-4">
                        {doctor.workingHours.slice(0, 2).map((slot, index) => (
                            <li key={index}>
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]}: {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <DoctorOperationButtons />
            </div>
        </div>
    );
}

const StyledInfo="mt-2 text-sm text-gray-500 flex gap-x-5";