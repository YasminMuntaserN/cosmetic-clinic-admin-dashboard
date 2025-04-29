import {getPermissionsForRole, hasPermission, Permission} from "../../../types/Permission.ts";
import {useUser} from "../../../context/UserContext.tsx";

/**
 * Custom hook that checks if the current user has a specific permission.
 * @param permission The permission to check for
 * @returns Boolean indicating if the user has the permission
 */
export function usePermission(permission: Permission): boolean {
    const { user } = useUser();

    if (!user) {
        return false;
    }

    const userPermissions = getPermissionsForRole(user.role);
    
    return hasPermission(userPermissions, permission );
}
