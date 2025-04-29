import {Permission } from "../../types/Permission.ts";
import { ShieldAlert } from "lucide-react"; 
import { Link } from "react-router-dom";
import {usePermission} from "../User/hooks/usePermission.ts";  

interface UnauthorizedProps {
    permission: Permission;
    children: React.ReactNode;
}

function Unauthorized({ permission, children }: UnauthorizedProps) {
    const hasRequiredPermission = usePermission(permission);

    if (!hasRequiredPermission) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
                    <ShieldAlert className="h-12 w-12 text-red-600" />
                </div>

                <h1 className="mt-5 text-3xl font-bold text-gray-900">Access Denied</h1>

                <p className="mt-3 text-base text-gray-600">
                    You don't have permission to access the requested resource.
                </p>

                <div className="mt-8 space-y-3">
                    <Link
                        to="/dashboard"
                        className="block w-full px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-basic hover:bg-basic focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-basic shadow-sm text-center"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default Unauthorized;
