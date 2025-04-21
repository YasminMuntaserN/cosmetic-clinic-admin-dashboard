import TextInput from "../ui/TextInput.tsx";
import {useForm} from "react-hook-form";
import {Button} from "../ui/Button.tsx";
import {useChangePassword} from "./useUser.ts";
import toast from "react-hot-toast";
import {Loading} from "../ui/Loading.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";

interface PasswordForm  {
    currentPassword: string;
    password: string;
    confirmPassword: string;
}

export function ChangePassword({userId}: { userId: string | undefined }) {
    const {
        control,
        handleSubmit,
        watch,
        reset
    } = useForm<PasswordForm>();
    const { getChangePassword, isLoading, error} =useChangePassword();

    const onSubmit = (data: PasswordForm) => {
        if(userId)
        getChangePassword({id:userId , currentPassword :data.currentPassword ,newPassword :data.password} ,{
            onSuccess:()=> toast.success("Password changed successfully"),
            onError:()=> toast.error("Password changed failed"),
        })
        reset();
    };

    const password = watch("password");

    if(error) return <ErrorMessage />;
    
    if(isLoading) return <Loading />;
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <h2 className="text-2xl font-semibold">Change Password</h2>

            <TextInput
                control={control}
                label="Current Password"
                name="currentPassword"
                placeholder="Current Password"
                value="Password"
            />
            
            <TextInput
                control={control}
                type="password"
                label="New Password"
                name="password"
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    },
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                        message: "Password must include uppercase, lowercase, and a number"
                    }
                }}
            />

            <TextInput
                control={control}
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                rules={{
                    required: "Please confirm your password",
                    validate: value =>
                        value === password || "Passwords do not match"
                }}
            />

            <Button type="submit">Save Changes</Button>
        </form>
    );
}


