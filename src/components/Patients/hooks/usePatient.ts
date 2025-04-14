import {useMutation} from "@tanstack/react-query";
import {
    addEntity,
    deleteEntity,
    getAllBy,
    getById,
    paginatedList,
    Search,
    UpdateEntity
} from "../../../services/BaseApi.ts";
import {Pagination, SearchCriteria} from "../../../types/Pagination.ts";
import {Patient} from "../../../types/patient.ts";
import {Appointment} from "../../../types/Appointment.ts";

export function usePatient(){
    const { mutate :getPatient, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Patient>=>getById("Patients" ,id),
        mutationKey:["patient"]
    });
    return { getPatient ,
        patient :data ,
        isLoading: status === "pending",
        error };
}

export function useAddPatient() {
    const {
        mutate: AddPatient,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :({newData}: {newData:Partial<Patient> })=>addEntity("Patients" ,newData),
        mutationKey :["addPatient"],
    });
    return {
        AddPatient,
        Patient: data ?? [],
        isLoading:status === "pending",
        error
    }
}

export function usePaginatedPatientsList(){
    const { mutate :getPaginatedPatientsList, data, status, error } = useMutation({
        mutationFn:(PaginationData :Pagination)=>paginatedList("Patients" , PaginationData),
        mutationKey:["patients"]
    });

    return { getPaginatedPatientsList , 
             patients :data?.data ,
             totalPages :data?.totalPages ,
             totalCount :data?.totalCount , 
             isLoading: status === "pending",
            error };
}

export function useSearchedPatients() {
    const {
        mutate: getSearchedPatients,
        data,
        status,
        error,
    } = useMutation({
        mutationFn: (searchCriteria:SearchCriteria):Promise<Patient[]> =>
            Search("Patients" ,searchCriteria),
        mutationKey: ["SearchedPatients"],
    });

    return {
        getSearchedPatients,
        SearchedPatients: data ?? [],
        isLoading: status === "pending",
        error,
    };
}

export function useDeletePatient(){
    const { mutate :deletePatient, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Patient>=>deleteEntity("Patients" ,id),
        mutationKey:["deletePatients"]
    });

    return { deletePatient ,
        Patient :data ,
        isLoading: status === "pending",
        error };
}

export function usePatientAppointments(){
    const { mutate :getPatientAppointments, data, status, error } = useMutation({
        mutationFn:(id:string) :Promise <Appointment[]> =>getAllBy("Appointments" , `patientId/${id}`),
        mutationKey:["patientAppointments"]
    });

    return { getPatientAppointments ,
        PatientAppointments :data ??[],
        isLoading: status === "pending",
        error };
}

export function useUpdatePatient(){
    const { mutate :UpdatePatient, data, status, error } = useMutation({
        mutationFn:({id ,data}: {id :string ,data:Partial<Patient>}):Promise<Patient>=>UpdateEntity("Patients",id ,data),
        mutationKey:["Patients"]
    });

    return { UpdatePatient ,
        updatedPatient :data ,
        updating: status === "pending",
        updateError :error};
}