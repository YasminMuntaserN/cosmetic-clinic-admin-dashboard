import {Appointment, AppointmentStatus} from "../../types/Appointment.ts";
import {useForm} from "react-hook-form";
import {Selector} from "../ui/Selector.tsx";
import {useEffect} from "react";
import {useAddAppointment, useUpdateAppointment} from "./hooks/useAppointment.ts";
import {timeToMinutes} from "../../utils/helper.ts";
import {Today, WORK_HOURS} from "../../utils/constants.ts";

interface AddEditAppointmentFormProps {
    selectedAppointment?: Appointment | null;
    handleSelectedAppointment?: (selectedAppointment: Appointment | null) => void;
    onClose?: () => void;
}

export function AddEditAppointmentForm({
                                           selectedAppointment,
                                           handleSelectedAppointment,
                                           onClose
                                       }: AddEditAppointmentFormProps) {
    const isAdd = selectedAppointment === undefined;
    const {register, handleSubmit, setValue,watch ,formState: { errors }} = useForm();
    const {updateAppointment, isLoading: updating, error: updateError} = useUpdateAppointment();
    const {AddAppointment, isLoading: Adding, error: AddError} = useAddAppointment();

    const onSubmit = (data: any) => {
        if (isAdd) {
            const newAppointment = {
                patientId :data?.Patients,
                doctorId:data?.Doctors,
                treatmentId:data?.Treatments,
                scheduledDateTime:data?.scheduledDateTime,
                durationMinutes: timeToMinutes(data.endTime) - timeToMinutes(data.startTime),
                notes :data?.notes
            };
            AddAppointment({newData : newAppointment},
                {
                    onSuccess: () => {
                        if (onClose) onClose();
                        if (handleSelectedAppointment) handleSelectedAppointment(null);
                    },
                    onError: (error) => console.error("Update failed:", error),
                }
            );
        } else {
            const newAppointment = {
                id: selectedAppointment?.id,
                patientId: data?.Patients,
                doctorId: data?.Doctors,
                treatmentId: data?.Treatments,
                scheduledDateTime: new Date(data.scheduledDateTime),
                durationMinutes: timeToMinutes(data.endTime) - timeToMinutes(data.startTime),
                status: data?.status,
                notes: data?.notes,
                cancellationReason: selectedAppointment?.cancellationReason ?? "",
                createdAt: selectedAppointment?.createdAt,
                updatedAt: new Date().toISOString(),
            };

            updateAppointment(
                {id: selectedAppointment?.id ?? "", updatedData: newAppointment},
                {
                    onSuccess: () => {
                        if (onClose) onClose();
                        if (handleSelectedAppointment) handleSelectedAppointment(null);
                    },
                    onError: (error) => console.error("Update failed:", error),
                }
            );
        }
    };

    useEffect(() => {
        if (selectedAppointment) {
            setValue("patientName", selectedAppointment.patientName);
            setValue("doctorName", selectedAppointment.doctorName);
            setValue("scheduledDateTime", selectedAppointment.scheduledDateTime);
            setValue("status", selectedAppointment.status);
            setValue("notes", selectedAppointment.notes || "");
        }
    }, [selectedAppointment, setValue]);

    if (updateError || AddError) return <p>something get worng</p>
    return (
        <div className="p-4 font-slab mt-[-20px]">
            <h3 className="text-xl font-bold text-secondary mb-5">
                {isAdd ? "Add New Appointment" : "Edit Appointment"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div className="form-group">
                    <label className={StyledLabel}>Patient Name:</label>
                    <div className="grid grid-cols-[2fr_0.2fr_0.2fr] gap-6">
                        <Selector
                            dataName="Patients"
                            register={register("Patients" ,{required: "Patient Name is required"})}
                            defaultValue={selectedAppointment?.patientName}
                        />
                        <button className="border-2 border-dashed border-basic text-basic px-4 py-2 ">Add
                        </button>
                        {!isAdd && (
                            <button className="border-2 border-dashed border-secondary text-secondary px-4 py-2 ">Chat</button>)}
                    </div>
                </div>

                <div className="form-group">
                    <label className={StyledLabel}>Doctor Name:</label>
                    <div className="grid grid-cols-[2.2fr_0.2fr] gap-6">
                        <Selector
                            dataName="Doctors"
                            register={register("Doctors" ,{required: "Doctor Name is required"})}
                            defaultValue={selectedAppointment?.doctorName}
                        />
                        {!isAdd && (
                            <button
                                className="border-2 border-dashed border-secondary text-secondary px-4 py-2 ">Chat</button>)}
                    </div>
                </div>

                <div className="form-group">
                    <label className={StyledLabel}>Treatment Type:</label>
                    <Selector
                        dataName="Treatments"
                        register={register("Treatments" ,{required: "Treatments is required"})}
                        defaultValue={selectedAppointment?.treatmentName}
                    />
                </div>

                <div className={Box}>
                    <label className={StyledLabel}>Scheduled Date:</label>
                    <input
                        type="date"
                        {...register("scheduledDateTime", {
                            required: "Please select a date",
                            validate: (value) => value >= Today || "Date cannot be in the past",
                        })}
                        min={Today} 
                        className={StyledInput}
                    />
                    {errors.scheduledDateTime && (
                        <p className="text-red-500 text-sm">{String(errors.scheduledDateTime.message)}</p>
                    )}
                </div>

                <div className="flex form-group space-x-8 ">
                    <div className={Box}>
                        <label className={StyledLabel}>Start Time:</label>
                        <input
                            type="time"
                            {...register("startTime", {
                                required: "Start time is required",
                                validate: (value) =>
                                    value >= WORK_HOURS.OPEN && value <= WORK_HOURS.CLOSE ||
                                    `Time must be between ${WORK_HOURS.OPEN} and ${WORK_HOURS.CLOSE}`,
                            })}
                            min={WORK_HOURS.OPEN}
                            max={WORK_HOURS.CLOSE}
                            className={StyledInput}
                        />
                    </div>
                    <div className={Box}>
                        <label className={StyledLabel}>End Time:</label>
                        <input
                            type="time"
                            {...register("endTime", {
                                required: "End time is required",
                                validate: (value) =>
                                    value >= WORK_HOURS.OPEN &&
                                    value <= WORK_HOURS.CLOSE &&
                                    value > watch("startTime") ||
                                    `Time must be between ${WORK_HOURS.OPEN} and ${WORK_HOURS.CLOSE}, and after start time`,
                            })}
                            min={WORK_HOURS.OPEN}
                            max={WORK_HOURS.CLOSE}
                            className={StyledInput}
                        />

                    </div>
                </div>
                {errors.startTime && (
                    <p className="text-red-500 text-sm">{String(errors.startTime.message)}</p>
                )}
                {errors.endTime && (
                    <p className="text-red-500 text-sm">{String(errors.endTime.message)}</p>
                )}
                <div className={Box}>
                    <label className={StyledLabel}>Status:</label>
                    <select
                        {...register("status")}
                        className={StyledInput}
                        defaultValue={selectedAppointment?.status}
                    >
                        {AppointmentStatus.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={Box}>
                    <label className={StyledLabel}>Notes:</label>
                    <textarea
                        {...register("notes")}
                        className={StyledInput}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-secondary text-basic w-full  py-2 px-4 rounded-md">
                    {(updating || Adding) ? "loading..." : isAdd ? "Add Appointment" : "Save Changes"}
                </button>
            </form>
        </div>
    );
}

const StyledLabel = "block text-sm m-2 mt-4";
const Box = "form-group grid grid-cols-[0.7fr_2fr]";
const StyledInput = "mt-1 block w-full p-2 border rounded-md text-gray-500 text-sm focus:outline-basic  ";