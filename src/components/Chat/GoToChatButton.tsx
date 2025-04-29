import {Button, ButtonVariant} from "../ui/Button.tsx";
import {useClinic} from "../../context/ClinicContext.tsx";
import {useUser} from "../User/useUser.ts";
import {User} from "../../types/User.ts";
import {useNavigate} from "react-router-dom";
import {ReactNode} from "react";
import {ButtonLoader} from "../ui/Loading.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";
import {useUser as getAdmin} from "../../context/UserContext.tsx";
import {Permission} from "../../types/Permission.ts";
import PermissionGuard from "../User/PermissionGuard.tsx";
import {usePermission} from "../User/hooks/usePermission.ts";


export function GoToChatButton({ButtonStyle ,text ,userId} :{ButtonStyle?:ButtonVariant , text?:ReactNode ,userId?:string} ) {
    const {setSelectedUser ,selectedUserId :contextUserId } =useClinic();
    const { getUser, isLoading, error}  =useUser();
    const navigate = useNavigate();
    const {user} =getAdmin();
    const hasRequierdPermisson =usePermission(Permission.MangeChats);
    const selectedUserId =userId ?userId : contextUserId;
    
    
    const handleChat =()=>{
        if(selectedUserId && hasRequierdPermisson) {
            
            getUser({id: selectedUserId},
                {
                    onSuccess: (data: User) => {
                        setSelectedUser(data);
                        if(user)
                        navigate(`/chat/${user?.id}`)
                    },
                    onError: (error) => console.error("Update failed:", error),
                });
        }
    };
    
    if(error) return <ErrorMessage />;
    return(
        <PermissionGuard permission={Permission.MangeChats}>
        <Button 
            type="button" variant={ButtonStyle!==undefined ? ButtonStyle : "dashedSecondary"} 
            onClick={handleChat}>
            {isLoading ? <><ButtonLoader /> loading...</>: text ? text :"Chat"}</Button>
        </PermissionGuard>
    );
}

