import {useMutation} from "@tanstack/react-query";
import {getAllBy} from "../../../services/BaseApi.ts";
import {AppointmentReport, Report} from "../../../types/Report.ts";

export function useProductCategoriesReport(){
    const { mutate :getProductCategoriesReport, data, status, error } =useMutation({
            mutationFn:()=>getAllBy("Products" ,"ProductsReports"),
            mutationKey:["ProductCategoriesReport"]
        });
    return {
        getProductCategoriesReport ,
        ProductCategoriesReport :data ,
        isLoading : status === "pending" ,
        error
    }
}

export function useTreatmentCategoriesReport(){
    const { mutate :getTreatmentCategoriesReport, data, status, error } =useMutation({
        mutationFn:()=>getAllBy("Treatments" ,"TreatmentsReports"),
        mutationKey:["TreatmentCategoriesReport"]
    });
    return {
        getTreatmentCategoriesReport ,
        TreatmentCategoriesReport :data ,
        isLoading : status === "pending" ,
        error
    }
}

export function useAppointmentReport(){
    const { mutate :getAppointmentReport, data, status, error } =useMutation({
        mutationFn:() :Promise<AppointmentReport[]>=>getAllBy("Appointments" ,"AppointmentsReports"),
        mutationKey:["AppointmentReport"]
    });
    return {
        getAppointmentReport ,
        AppointmentReport :data ,
        isLoading : status === "pending" ,
        error
    }
}

export function useStockQuantityReport(){
    const { mutate :getStockQuantityReport, data, status, error } =useMutation({
        mutationFn:() :Promise<Report[]>=>getAllBy("Products" ,"StockQuantityReport"),
        mutationKey:["StockQuantityReport"]
    });
    return {
        getStockQuantityReport ,
        StockQuantityReport :data ,
        isLoading : status === "pending" ,
        error
    }
}

export function useCountStats(){
    const { mutate :getCountStats, data, status, error } =useMutation({
        mutationFn:() :Promise<Report[]>=>getAllBy("Users" ,"counts"),
        mutationKey:["StatsCount"]
    });
    return {
        getCountStats ,
        CountStats :data ,
        isLoading : status === "pending" ,
        error
    }
}