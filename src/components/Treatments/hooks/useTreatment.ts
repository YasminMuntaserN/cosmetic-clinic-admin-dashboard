import {useMutation} from "@tanstack/react-query";
import {Pagination, SearchCriteria} from "../../../types/Pagination.ts";
import {
    addEntity,
    deleteEntity,
    getAllBy,
    getById,
    paginatedList,
    Search,
    UpdateEntity
} from "../../../services/BaseApi.ts";
import {Treatment} from "../../../types/treatment.ts";
import {Appointment} from "../../../types/Appointment.ts";

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

export function useTreatment(){
    const { mutate :getTreatment, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Treatment>=>getById("Treatments" ,id),
        mutationKey:["Treatments"]
    });

    return { getTreatment ,
        treatment :data ,
        isLoading: status === "pending",
        error };
}

export function useTreatmentAppointments(){
    const { mutate :getTreatmentAppointments, data, status, error } = useMutation({
        mutationFn:(id:string) :Promise <Appointment[]> =>getAllBy("Appointments" , `treatmentId/${id}`),
        mutationKey:["TreatmentAppointments"]
    });

    return { getTreatmentAppointments ,
        treatmentAppointments :data ??[],
        isLoadingTratments: status === "pending",
        errorTreatments:error };
}

export function useUpdateTreatment(){
    const { mutate :UpdateTreatment, data, status, error } = useMutation({
        mutationFn:({id ,data}: {id :string ,data:Partial<Treatment>}):Promise<Treatment>=>UpdateEntity("Treatments",id ,data),
        mutationKey:["Treatments"]
    });

    return { UpdateTreatment ,
        updatedTreatment :data ,
        updating: status === "pending",
        updateError :error};
}

export function useDeleteTreatment(){
    const { mutate :deleteTreatment, data, status, error } = useMutation({
        mutationFn:({id}:{id:string}):Promise<Treatment>=>deleteEntity("Treatments" ,id),
        mutationKey:["deleteTreatment"]
    });

    return { deleteTreatment ,
        Treatment :data ,
        isLoading: status === "pending",
        error };
}