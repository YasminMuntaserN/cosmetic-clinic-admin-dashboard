import { Permission} from "../../types/Permission.ts";
import {Modal} from "../ui/Modal.tsx";
import {usePermission} from "./hooks/usePermission.ts";
import {LockKeyhole} from "lucide-react";



interface PermissionGuardProps {
    permission: Permission;
    children: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
                                                             permission,
                                                             children
                                                         }) => {
    const hasRequiredPermission= usePermission(permission);
    
    return (
        <Modal>
            <Modal.Open opens="permission-denied">
                <div onClick={(e) => {
                    if (!hasRequiredPermission) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }}>
                    {children}
                </div>
            </Modal.Open>

            {!hasRequiredPermission && (
                <Modal.Window name="permission-denied">
                    <div className="flex flex-col items-center justify-center p-6 space-y-4">
                        <div className="text-red-500">
                            <LockKeyhole size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
                        <p className="text-center text-gray-600 max-w-sm">
                            You don't have permission to perform this action.
                        </p>
                    </div>
                </Modal.Window>
            )}
        </Modal>
    );
};

export default PermissionGuard;