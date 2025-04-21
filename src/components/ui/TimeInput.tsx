import {WORK_HOURS} from "../../utils/constants.ts";
import {ComponentProps} from "react";
import {useFormContext} from "react-hook-form";

type TimeInputProps = ComponentProps<'input'> & {
    name: string;
    time: 'Start' | 'End';
    disabled?: boolean;
};

export function TimeInput({ name, time, disabled}: TimeInputProps) {
    
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    
    return (
        <>
            <input
                type="time"
                {...register(name, {
                    required: `${time} time is required`,
                    validate: (value) => {
                        // Check if value is within the clinic's open and close hours
                        const withinRange = value >= WORK_HOURS.OPEN && value <= WORK_HOURS.CLOSE;
                        if (!withinRange) {
                            return `Time must be between ${WORK_HOURS.OPEN} and ${WORK_HOURS.CLOSE}`;
                        }

                        // For End time, check if it is after the Start time
                        if (time === "End") {
                            const startValue = watch(name.replace("endTime", "startTime"));
                            if (startValue && value <= startValue) {
                                return "End time must be after start time";
                            }
                        }

                        return true;
                    },
                })}
                disabled={disabled}
                className={StyledInput}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm">{String(errors[name].message)}</p>
            )}
        </>
    );
}
const StyledInput = "mt-1 block w-full p-2 border rounded-md text-gray-500 text-sm focus:outline-basic  ";
