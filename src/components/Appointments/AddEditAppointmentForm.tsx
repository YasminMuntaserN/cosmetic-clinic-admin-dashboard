import {Appointment, AppointmentStatus} from "../../types/Appointment.ts";
import {FormProvider, useForm} from "react-hook-form";
import {Selector} from "../ui/Selector.tsx";
import {useAddAppointment, useUpdateAppointment} from "./hooks/useAppointment.ts";
import {formatTime, getEndDateTime, getStartDateTime, timeToMinutes} from "../../utils/helper.ts";
import {Today} from "../../utils/constants.ts";
import {Button} from "../ui/Button.tsx";
import {TimeInput} from "../ui/TimeInput.tsx";
import AddPatientForAppointment from "./AddPatientForAppointment.tsx";
import {GoToChatButton} from "../Chat/GoToChatButton.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";
import PermissionGuard from "../User/PermissionGuard.tsx";
import {Permission} from "../../types/Permission.ts";
import {usePermission} from "../User/hooks/usePermission.ts";

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

    const methods = useForm({
        defaultValues: {
            patientId: selectedAppointment?.patientId || '',
            doctorId: selectedAppointment?.doctorId || '',
            treatmentId: selectedAppointment?.treatmentId || '',
            scheduledDateTime: selectedAppointment?.scheduledDateTime
                ? new Date(selectedAppointment.scheduledDateTime).toISOString().split("T")[0]
                : "",
            startTime: formatTime(getStartDateTime(
                selectedAppointment?.scheduledDateTime
                    ? new Date(selectedAppointment.scheduledDateTime)
                    : undefined
            )),
            endTime: formatTime(getEndDateTime(
                selectedAppointment?.scheduledDateTime
                    ? new Date(selectedAppointment.scheduledDateTime)
                    : undefined,
                selectedAppointment?.durationMinutes
            )),
            status :selectedAppointment?.status  || '',
            notes: selectedAppointment?.notes || ''
        }
    });
    const {register, handleSubmit,  formState: {errors}} =methods;
    const {updateAppointment, isLoading: updating, error: updateError} = useUpdateAppointment();
    const {AddAppointment, isLoading: Adding, error: AddError} = useAddAppointment();
    const hasPermission = usePermission(isAdd ? Permission.CreateAppointment : Permission.MangeAppointment);
    const onSubmit = (data: any) => {
        if(hasPermission) return;
        
        if (isAdd) {
            const newAppointment = {
                patientId: data?.Patients,
                doctorId: data?.Doctors,
                treatmentId: data?.Treatments,
                scheduledDateTime: data?.scheduledDateTime,
                durationMinutes: timeToMinutes(data.endTime) - timeToMinutes(data.startTime),
                notes: data?.notes
            };
            AddAppointment({newData: newAppointment},
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
    
    if (updateError || AddError) return <ErrorMessage />;

    return (
        <FormProvider {...methods}>
            <div className="p-4 font-slab mt-[-20px]">
                <h3 className="text-xl font-bold text-secondary mb-5">
                    {isAdd ? "Add New Appointment" : "Edit Appointment"}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="form-group">
                        <label className={StyledLabel}>Patient Name:</label>
                        <div className="grid lg:grid-cols-[2fr_0.2fr_0.2fr] gap-6">
                            <Selector
                                dataName="Patients"
                                defaultValue={selectedAppointment?.patientName}
                            />
                            <AddPatientForAppointment/>
                            {!isAdd && <GoToChatButton/>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className={StyledLabel}>Doctor Name:</label>
                        <div className="grid lg:grid-cols-[2.2fr_0.2fr] gap-6">
                            <Selector
                                dataName="Doctors"
                                defaultValue={selectedAppointment?.doctorName}
                            />
                            {!isAdd && <GoToChatButton/>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className={StyledLabel}>Treatment Type:</label>
                        <Selector
                            dataName="Treatments"
                            defaultValue={selectedAppointment?.treatmentName}
                        />
                    </div>

                    <div className={Box}>
                        <label className={StyledLabel}>Scheduled Date:</label>
                        <input
                            type="date"
                            {...register("scheduledDateTime", {
                                required: "Please select a date",
                                validate: (value) => value>= Today || "Date cannot be in the past",
                            })}
                            min={Today}
                            className={StyledInput}
                        />
                        {errors.scheduledDateTime && (
                            <p className="text-red-500 text-sm">{String(errors.scheduledDateTime.message)}</p>
                        )}
                    </div>

                    <div className="flex form-group space-x-8 flex-row ">
                        <div className={Box}>
                            <label className={StyledLabel}>Start Time:</label>
                            <TimeInput name="startTime" time="Start" />
                        </div>
                        <div className={Box}>
                            <label className={StyledLabel}>End Time:</label>
                            <TimeInput name="endTime" time="End" />
                        </div>
                    </div>

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
                    <PermissionGuard permission={isAdd ? Permission.CreateAppointment : Permission.MangeAppointment}>
                        <Button type="submit">
                            {(updating || Adding) ? "loading..." : isAdd ? "Add Appointment" : "Save Changes"}
                        </Button>
                    </PermissionGuard>

                </form>
            </div>
        </FormProvider>
    );
}

const StyledLabel = "block text-sm m-2 mt-4";
const Box = "form-group flex gap-x-5 lg:flex-row flex-col";
const StyledInput = "mt-1 block w-full p-2 border rounded-md text-gray-500 text-sm focus:outline-basic  ";