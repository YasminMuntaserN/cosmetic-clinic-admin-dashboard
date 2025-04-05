import {useMutation} from "@tanstack/react-query";
import {addEntity, getAll, paginatedList, Search} from "../../../services/BaseApi.ts";
import {Pagination, SearchCriteria} from "../../../types/Pagination.ts";
import {Doctor} from "../../../types/doctor.ts";

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