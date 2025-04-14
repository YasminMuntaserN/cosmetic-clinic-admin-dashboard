import {useMutation} from "@tanstack/react-query";
import {
    addEntity,
    deleteEntity,
    getAll,
    getAllBy,
    getById,
    paginatedList,
    Search,
    UpdateEntity
} from "../../../services/BaseApi.ts";
import {Pagination, SearchCriteria} from "../../../types/Pagination.ts";
import {Doctor} from "../../../types/doctor.ts";
import {Appointment} from "../../../types/Appointment.ts";

export function useDoctor(){
    const { mutate :getDoctor, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Doctor>=>getById("Doctors" ,id),
        mutationKey:["doctors"]
    });

    return { getDoctor ,
        doctor :data ,
        isLoading: status === "pending",
        error };
}

export function useDoctorsList(){
    const { mutate :getDoctorsList, data, status, error } = useMutation({
        mutationFn:():Promise<Doctor[]>=>getAll("Doctors"),
        mutationKey:["doctors"]
    });

    return { getDoctorsList ,
        doctors :data ,
        isLoading: status === "pending",
        error };
}

export function useAddDoctor(){
    const { mutate :AddDoctor, data, status, error } = useMutation({
        mutationFn:(data: Partial<Doctor>):Promise<Doctor>=>addEntity("Doctors" ,data),
        mutationKey:["doctors"]
    });

    return { AddDoctor ,
        doctor :data ,
        isLoading: status === "pending",
        error };
}

export function usePaginatedDoctorsList(){
    const { mutate :getPaginatedDoctorsList, data, status, error } = useMutation({
        mutationFn:(PaginationData :Pagination)=>paginatedList("Doctors" , PaginationData),
        mutationKey:["doctors"]
    });

    return { getPaginatedDoctorsList , 
             doctors :data?.data ,
             totalPages :data?.totalPages ,
             totalCount :data?.totalCount , 
             isLoading: status === "pending",
            error };
}

export function useSearchedDoctors() {
    const {
        mutate: getSearchedDoctors,
        data,
        status,
        error,
    } = useMutation({
        mutationFn: (searchCriteria: SearchCriteria): Promise<Doctor[]> =>
            Search("Doctors", searchCriteria),
        mutationKey: ["SearchedDoctors"],
    });

    return {
        getSearchedDoctors,
        SearchedDoctors: data ?? [],
        isLoading: status === "pending",
        error,
    };
}

export function useDoctorAppointments(){
    const { mutate :getDoctorAppointments, data, status, error } = useMutation({
        mutationFn:(id:string) :Promise <Appointment[]> =>getAllBy("Appointments" , `doctorId/${id}`),
        mutationKey:["doctorAppointments"]
    });

    return { getDoctorAppointments ,
        doctorAppointments :data ??[],
        isLoading: status === "pending",
        error };
}

export function useDeleteDoctor(){
    const { mutate :deleteDoctor, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Doctor>=>deleteEntity("Doctors" ,id),
        mutationKey:["deleteDoctors"]
    });

    return { deleteDoctor ,
        doctor :data ,
        isLoading: status === "pending",
        error };
}

export function useUpdateDoctor(){
    const { mutate :UpdateDoctor, data, status, error } = useMutation({
        mutationFn:({id ,data}: {id :string ,data:Partial<Doctor>}):Promise<Doctor>=>UpdateEntity("Doctors",id ,data),
        mutationKey:["doctors"]
    });

    return { UpdateDoctor ,
        updatedDoctor :data ,
        updating: status === "pending",
        updateError :error};
}