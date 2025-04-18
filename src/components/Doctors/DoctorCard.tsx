import {Mail, Phone,Clock10} from 'lucide-react';
import type { Doctor } from '../../types/doctor';
import {DoctorOperationButtons} from "./DoctorOperationBauttons.tsx";

interface DoctorCardProps {
    doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
    const fullName = `${doctor.firstName} ${doctor.lastName}`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-10 p-4">
            <div className="relative aspect-w-16 aspect-h-9 md:aspect-w-3 md:aspect-h-2">
                <img
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    src={doctor.imageUrl}
                    alt={`${fullName}`}
                />
                <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              doctor.isAvailable
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
          }`}>
            {doctor.isAvailable ? 'Available' : 'Unavailable'}
          </span>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                    {fullName}
                </h3>

                <div className="space-y-2">
                    <div className={styledInfo}>
                        <Mail className="h-4 w-4 text-gray-400" />
                        <p className="truncate">{doctor.email}</p>
                    </div>

                    <div className={styledInfo}>
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p>{doctor.phone}</p>
                    </div>

                    <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock10 className="h-4 w-4 text-gray-400" />
                            <span>Schedule:</span>
                        </div>
                        <ul className="ml-6 space-y-1 text-sm text-gray-500">
                            {doctor.workingHours.slice(0, 2).map((slot, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]}</span>
                                    <span>{slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <DoctorOperationButtons doctorId={doctor.id} />
            </div>
        </div>
    );
}

const styledInfo = "flex items-center gap-2 text-sm text-gray-500";