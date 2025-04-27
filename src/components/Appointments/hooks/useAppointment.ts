import {useMutation} from "@tanstack/react-query";
import {addEntity, deleteEntity, getAll, getAllBy, UpdateEntity} from "../../../services/BaseApi.ts";
import {Appointment} from "../../../types/Appointment.ts";

export function useAppointments() {
    const {
        mutate: getAppointments,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :():Promise<Appointment[]>=>getAll("Appointments"),
        mutationKey :["Appointments"],
        });
    return {
        getAppointments,
        Appointments: data ?? [],
        isLoading:status === "pending",
        error
    }
}

export function useUpdateAppointment() {
    const {
        mutate: updateAppointment,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :({id, updatedData}: {id:string ,updatedData:any})=>UpdateEntity("Appointments" ,id ,updatedData),
        mutationKey :["updateAppointment"],
    });
    return {
        updateAppointment,
        Appointment: data ?? [],
        isLoading:status === "pending",
        error
    }
}

export function useAddAppointment() {
    const {
        mutate: AddAppointment,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :({newData}: {newData:any})=>addEntity("Appointments" ,newData),
        mutationKey :["addAppointment"],
    });
    return {
        AddAppointment,
        Appointment: data ?? [],
        isLoading:status === "pending",
        error
    }
}

export function useTodaySchedule() {
    const {
        mutate: getTodaySchedule,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :():Promise<Appointment[]>=>getAllBy("Appointments" ,"TodaySchedule"),
        mutationKey :["TodaySchedule"],
    });
    return {
        getTodaySchedule,
        TodaySchedule: data ?? [],
        isLoading:status === "pending",
        error
    }
}

export function useDeleteAppointment(){
    const { mutate :deleteAppointment, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Appointment>=>deleteEntity("Appointments" ,id),
        mutationKey:["deleteAppointments"]
    });

    return { deleteAppointment ,
        Appointment :data ,
        isLoading: status === "pending",
        error };
}