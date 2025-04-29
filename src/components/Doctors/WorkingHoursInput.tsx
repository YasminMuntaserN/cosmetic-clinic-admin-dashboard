import {Controller, useFormContext} from "react-hook-form";
import {Clock} from "lucide-react";
import {DAYS_OF_WEEK} from "../../utils/constants.ts";

interface WorkingHours {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isWorking: boolean;
}

export function WorkingHoursInput() {
    const {control, watch} = useFormContext();
    const workingHours = watch('workingHours');
    
    const validateTimes = (day: WorkingHours) => {
        if (!day.isWorking) return true;
        if (!day.startTime || !day.endTime) return false;
        return day.startTime < day.endTime;
    };

    return (
        <div>
            <div className="bg-gray-50 rounded-xl shadow-lg p-8 space-y-6 mb-4">
                <div className="flex items-center gap-3 mb-8">
                    <Clock className="w-8 h-8 text-basic"/>
                    <h1 className="lg:text-2xl font-bold text-gray-900">Working Hours</h1>
                </div>
                {DAYS_OF_WEEK.map((day, index) => (
                    <div key={day.value} className="flex flex-col sm:flex-row sm:items-center rounded-lg bg-gray-50 px-5">
                        <div className="w-56">
                            <Controller
                                name={`workingHours.${index}.isWorking`}
                                control={control}
                                render={({field}) => (
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...field}
                                            checked={workingHours[index]?.isWorking || false}
                                            className="w-4 h-4 accent-basic"
                                        />
                                        <span className="text-gray-700 text-sm ">{day.label}</span>
                                    </label>
                                )}
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="grid sm:grid-cols-2 gap-10">
                                <Controller
                                    name={`workingHours.${index}.startTime`}
                                    control={control}
                                    rules={{validate: () => validateTimes(workingHours[index])}}
                                    render={({field}) => (
                                        <input
                                            type="time"
                                            {...field}
                                            disabled={!workingHours[index]?.isWorking}
                                            className="block w-full lg:w-[80px] text-xs py-2 border border-gray-300 rounded-md disabled:cursor-not-allowed"
                                        />
                                    )}
                                />

                                <Controller
                                    name={`workingHours.${index}.endTime`}
                                    control={control}
                                    rules={{validate: () => validateTimes(workingHours[index])}}
                                    render={({field}) => (
                                        <input
                                            type="time"
                                            {...field}
                                            disabled={!workingHours[index]?.isWorking}
                                            className="block  w-full lg:w-[80px] text-xs py-2 border border-gray-300 rounded-md disabled:cursor-not-allowed"
                                        />
                                    )}
                                />
                            </div>

                            {workingHours[index]?.isWorking && !validateTimes(workingHours[index]) && (
                                <p className="text-sm text-red-600">Please set valid start and end times</p>
                            )}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

