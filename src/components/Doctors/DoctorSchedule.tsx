import { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Doctor } from '../../types/doctor';
import { format, addDays, isSameDay, startOfToday } from 'date-fns';

interface TimeSlot {
    time: string;
    available: boolean;
}

const TIME_SLOTS: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '09:30', available: false },
    { time: '10:00', available: true },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: false },
    { time: '12:00', available: true },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: false },
    { time: '15:30', available: true },
    { time: '16:00', available: true },
];

interface DoctorScheduleProps {
    doctor: Doctor;
    onClose: () => void;
    onSchedule: (date: Date, time: string) => void;
}

export function DoctorSchedule({ doctor, onClose, onSchedule }: DoctorScheduleProps) {
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const dates = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

    const fullName = `${doctor.firstName} ${doctor.lastName}`;

    const handleSchedule = () => {
        if (selectedDate && selectedTime) {
            const [hours, minutes] = selectedTime.split(':');
            const appointmentDate = new Date(selectedDate);
            appointmentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
            onSchedule(appointmentDate, selectedTime);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src={doctor.imageUrl}
                            alt={fullName}
                            className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">{fullName}</h2>
                            <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        </div>
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

                <div className="border-t border-b border-gray-200 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-semibold text-gray-900">Select Date</h3>
                        <div className="flex space-x-2">
                            <button className="p-1 rounded-full hover:bg-gray-100">
                                <ChevronLeft className="h-5 w-5 text-gray-500" />
                            </button>
                            <button className="p-1 rounded-full hover:bg-gray-100">
                                <ChevronRight className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {dates.map((date) => (
                            <button
                                key={date.toISOString()}
                                onClick={() => setSelectedDate(date)}
                                className={`p-2 text-center rounded-lg ${
                                    isSameDay(date, selectedDate)
                                        ? 'bg-indigo-600 text-white'
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="text-xs mb-1">{format(date, 'EEE')}</div>
                                <div className="text-sm font-semibold">{format(date, 'd')}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="py-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Available Times</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => (
                            <button
                                key={slot.time}
                                onClick={() => setSelectedTime(slot.time)}
                                disabled={!slot.available}
                                className={`p-2 text-center rounded-lg ${
                                    !slot.available
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : selectedTime === slot.time
                                            ? 'bg-indigo-600 text-white'
                                            : 'hover:bg-gray-50 text-gray-900'
                                }`}
                            >
                                <Clock className="h-4 w-4 mx-auto mb-1" />
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSchedule}
                        disabled={!selectedDate || !selectedTime}
                        className={`flex-1 px-4 py-2 rounded-md text-white flex items-center justify-center ${
                            selectedDate && selectedTime
                                ? 'bg-indigo-600 hover:bg-indigo-500'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        <Calendar className="h-5 w-5 mr-2" />
                        Schedule Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}