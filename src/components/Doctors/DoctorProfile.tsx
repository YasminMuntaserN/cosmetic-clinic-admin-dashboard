import { Mail, Phone, Calendar, Award } from 'lucide-react';
import type { Doctor } from '../../types/doctor';

const DAYS_OF_WEEK = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

interface DoctorProfileProps {
    doctor: Doctor;
    onClose: () => void;
    onSchedule: (doctor: Doctor) => void;
}

export function DoctorProfile({ doctor, onClose, onSchedule }: DoctorProfileProps) {
    const fullName = `${doctor.firstName} ${doctor.lastName}`;

    return (
        <div className="bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
            <div className="relative h-32 bg-indigo-600 rounded-t-lg">
                <div className="absolute -bottom-16 left-8">
                    <img
                        src={doctor.imageUrl}
                        alt={fullName}
                        className="h-32 w-32 rounded-full border-4 border-white object-cover"
                    />
                </div>
            </div>

            <div className="pt-20 px-8 pb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
                        <p className="text-lg text-gray-600">{doctor.specialization}</p>
                    </div>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            doctor.isAvailable
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                    >
            {doctor.isAvailable ? 'Available' : 'Unavailable'}
          </span>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="h-5 w-5" />
                            <span>{doctor.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Phone className="h-5 w-5" />
                            <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Award className="h-5 w-5" />
                            <span>License: {doctor.licenseNumber}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Working Hours</h3>
                        <div className="space-y-2">
                            {doctor.workingHours.map((hours) => (
                                <div key={hours.dayOfWeek} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">{DAYS_OF_WEEK[hours.dayOfWeek]}</span>
                                    <span className="text-gray-900">
                    {hours.startTime} - {hours.endTime}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex space-x-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => onSchedule(doctor)}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 flex items-center justify-center"
                    >
                        <Calendar className="h-5 w-5 mr-2" />
                        Schedule Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}