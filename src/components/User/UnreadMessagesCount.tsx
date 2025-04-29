import {Bell} from "lucide-react";
import {useUnreadMessagesCount} from "./useUser.ts";
import {useEffect} from "react";
import {useUser} from "../../context/UserContext.tsx";
import {useNavigate} from "react-router-dom";

function UnreadMessagesCount() {
    const {user}=useUser();
    const { getUnreadMessagesCount, count }=useUnreadMessagesCount();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(user)
        getUnreadMessagesCount({ id:  user.id})} ,[]);
    
    return (
        <button
            type="button"
            className=" relative rounded-full p-1 text-gray-400 hover:text-gray-500"
            onClick={() => navigate(`/chat/${user?.id}`)}
        >
            <Bell className="h-6 w-6" aria-hidden="true"/>
            <span className="absolute top-2.5 -right-2.5 font-semibold bg-basic rounded-full px-1.5 py-0.5 text-xs text-white text-center">{count}</span>
        </button>
);
}

export default UnreadMessagesCount;