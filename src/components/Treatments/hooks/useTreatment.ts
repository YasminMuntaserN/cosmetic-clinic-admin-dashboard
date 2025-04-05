import {useMutation} from "@tanstack/react-query";
import {Pagination, SearchCriteria} from "../../../types/Pagination.ts";
import {addEntity, getAllBy, paginatedList, Search} from "../../../services/BaseApi.ts";
import {Treatment} from "../../../types/treatment.ts";

export function useAddTreatment() {
    const {
        mutate: AddTreatment,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :({newData}: {newData:Partial<Treatment> })=>addEntity("Treatments" ,newData),
        mutationKey :["addTreatment"],
    });
    return {
        AddTreatment,
        Treatment: data ?? [],
        isLoading:status === "pending",
        error
    }
}

export function usePaginatedTreatmentsList(){
    const { mutate :getPaginatedTreatmentsList, data, status, error } = useMutation({
        mutationFn:(PaginationData :Pagination)=>paginatedList("Treatments" , PaginationData),
        mutationKey:["Treatments"]
    });

    return { getPaginatedTreatmentsList ,
        Treatments :data?.data ,
        totalPages :data?.totalPages ,
        totalCount :data?.totalCount ,
        isLoading: status === "pending",
        error };
}

export function useTreatmentsListByCategory() {
    const {
        mutate: getTreatmentsByCategory,
        data,
        status,
        error,
    } = useMutation({
        mutationFn: (category: string):Promise<Treatment[]> =>
            getAllBy("Treatments", `getByCategory?category=${category}`), 
        mutationKey: ["TreatmentsByCategory"],
    });

    return {
        getTreatmentsByCategory,
        TreatmentsByCategory: data ?? [], 
        isLoading: status === "pending",
        error,
    };
}

export function useSearchedTreatments() {
    const {
        mutate: getSearchedTreatments,
        data,
        status,
        error,
    } = useMutation({
        mutationFn: (searchCriteria:SearchCriteria):Promise<Treatment[]> =>
            Search("Treatments" ,searchCriteria),
        mutationKey: ["SearchedTreatments"],
    });

    return {
        getSearchedTreatments,
        SearchedTreatments: data ?? [],
        isLoading: status === "pending",
        error,
    };
}
