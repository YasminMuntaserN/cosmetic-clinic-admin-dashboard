import { Clock, Calendar } from 'lucide-react';
import { WORK_HOURS, Work_Days } from '../../utils/constants';

export function WorkHours() {
    const currentDay = new Date().getDay();

    return (
        <div className="rounded-lg bg-white p-6 shadow-md font-slab">
            <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-900">Clinic Hours</h2>
                <Clock className="h-6 w-6 text-basic" />
            </div>

            <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">Opening Hours</span>
                    <span className="text-gray-600">{WORK_HOURS.OPEN} - {WORK_HOURS.CLOSE}</span>
                </div>

                <div className="border-t pt-3">
                    <h3 className="mb-2 font-medium text-gray-900">Working Days</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {Object.entries(Work_Days).map(([day, value]) => (
                            <div
                                key={day}
                                className={`flex items-center justify-between rounded-md p-2 ${
                                    currentDay === value
                                        ? 'bg-gray-200 text-basic'
                                        : 'text-gray-600'
                                }`}
                            >
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                    {day}
                </span>
                                <span>{WORK_HOURS.OPEN} - {WORK_HOURS.CLOSE}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}