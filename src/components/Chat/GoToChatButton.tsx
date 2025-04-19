import {Button, ButtonVariant} from "../ui/Button.tsx";
import {useClinic} from "../../context/ClinicContext.tsx";
import {useUser} from "../User/useUser.ts";
import {User} from "../../types/User.ts";
import {useNavigate} from "react-router-dom";
import {ReactNode} from "react";
import {ButtonLoader} from "../ui/Loading.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";

export function GoToChatButton({ButtonStyle ,text} :{ButtonStyle?:ButtonVariant , text?:ReactNode} ) {
    const {setSelectedUser ,selectedUserId } =useClinic();
    const { getUser, isLoading, error}  =useUser();
    const navigate = useNavigate();
    
    const handleChat =()=>{
        if(selectedUserId) {
            
            getUser({id: selectedUserId},
                {
                    onSuccess: (data: User) => {
                        setSelectedUser(data);
                        navigate(`/chat/67db445d8a68fc0d9c1432e1`)
                    },
                    onError: (error) => console.error("Update failed:", error),
                });
        }
    };
    
    if(error) return <ErrorMessage />;
    return(
        <Button 
            type="button" variant={ButtonStyle!==undefined ? ButtonStyle : "dashedSecondary"} 
            onClick={handleChat}>
            {isLoading ? <><ButtonLoader /> loading...</>: text ? text :"Chat"}</Button>
    );
}

