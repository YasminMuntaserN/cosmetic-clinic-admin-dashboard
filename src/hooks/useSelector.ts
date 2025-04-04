import {useMutation} from "@tanstack/react-query";
import {getAll} from "../services/BaseApi.ts";


export function useSelector<T>() {
    const {
        mutate: getSelectorData,
        data,
        status,
        error,
    } = useMutation({
        mutationFn: (dataName: string): Promise<T[]> => getAll<T>(dataName), 
        mutationKey: [`Selector`],
    });

    return {
        getSelectorData,
        SelectorData: data ?? [],
        isLoading: status === "pending",
        error,
    };
}