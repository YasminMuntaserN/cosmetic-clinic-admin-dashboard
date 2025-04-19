import {useMutation} from "@tanstack/react-query";
import {login} from "../services/BaseApi.ts";
import {AuthRequest} from "../types/login.ts";

export function useLogin() {
    const {
        mutate: checkLogin,
        data,
        status,
        error,
    } = useMutation({
        mutationFn: (data :AuthRequest)=> login(data),
        mutationKey: [`login`],
    });

    return {
        checkLogin,
        isValid: data ?? [],
        isLoading: status === "pending",
        error,
    };
}