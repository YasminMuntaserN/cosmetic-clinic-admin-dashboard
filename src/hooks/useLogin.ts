import {useMutation} from "@tanstack/react-query";
import {AuthRequest} from "../types/login.ts";
import {login} from "../services/AuthService.ts";

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