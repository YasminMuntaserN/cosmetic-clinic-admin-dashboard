import {User} from "lucide-react";
import {useUser} from "../../context/UserContext.tsx";
import {useMediaQuery} from "../../hooks/useMediaQuery.ts";
import {useNavigate} from "react-router-dom";

function UserHeader() {
    const {user} =useUser();
    const isMobile =useMediaQuery("(max-width: 600px)");
    const navigate = useNavigate();
    return (
        <button
            type="button"
            className="flex gap-3 rounded-full bg-gray-100 p-1 text-gray-400 hover:text-gray-500"
            onClick={()=>navigate("/settings")}
        >
            <span className="sr-only">View profile</span>
            <User className="h-7 w-7 text-basic" aria-hidden="true"/>
            {!isMobile && <span className="text-sm mt-1 text-gray-500 font-bold">Dr. {user?.firstName} {user?.lastName}</span>}
        </button>
    );
}

export default UserHeader;