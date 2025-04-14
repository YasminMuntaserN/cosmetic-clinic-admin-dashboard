import {useMutation} from "@tanstack/react-query";
import {ChangePassword, getById} from "../../services/BaseApi.ts";
import {User} from "../../types/User.ts";

export function useUser() {
    const {
        mutate: getUser,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :({id}: {id:string}) :Promise<User>=>getById("Users" ,id),
        mutationKey :["users"],
    });
    return {
        getUser,
        User: data ?? [],
        isLoading:status === "pending",
        error
    }
}

export function useChangePassword() {
    const {
        mutate: getChangePassword,
        data,
        status,
        error,
    } =useMutation({
        mutationFn :({id , currentPassword ,newPassword}: {id:string , currentPassword:string ,newPassword :string})
            :Promise<boolean>=>ChangePassword(id ,currentPassword ,newPassword),
        mutationKey :["users"],
    });
    return {
        getChangePassword,
        result: data ?? [],
        isLoading:status === "pending",
        error
    }
}