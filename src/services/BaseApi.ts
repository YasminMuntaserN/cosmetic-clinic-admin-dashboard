import {PaginatedResponse, Pagination, SearchCriteria} from "../types/Pagination.ts";
import {apiClient} from "../utils/constants.ts";

export async function addEntity(entityName: string, data: any) {
    try {
        const response = await apiClient.post(`/${entityName}`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding entity:", error);
        throw error;
    }
}

export async function UpdateEntity(entityName: string, Id: string, data: any) {
    try {
        const response = await apiClient.put(`/${entityName}/${Id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating entity:", error);
        throw error;
    }
}

export async function ChangePassword(userId: string, currentPassword: string, newPassword: string) {
    try {
        const response = await apiClient.put(`/Users?userId=${userId}&currentPassword=${currentPassword}&newPassword=${newPassword}`);
        return response.data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
}

export async function paginatedList(
    entityName: string,
    pagination: Pagination
): Promise<PaginatedResponse> {
    try {
        const response = await apiClient.get<PaginatedResponse>(
            `/${entityName}/paginated?PageNumber=${pagination.PageNumber}&PageSize=${pagination.PageSize}&OrderBy=${pagination.OrderBy}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching paginated ${entityName}:`, error);
        throw error;
    }
}

export async function getAll<T>(entityName: string): Promise<T[]> {
    try {
        const response = await apiClient.get<T[]>(`/${entityName}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching all ${entityName}:`, error);
        throw error;
    }
}

export async function getAllSelectorData<T>(entityName: string): Promise<T[]> {
    try {
        const response = await apiClient.get<T[]>(`/${entityName}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching selector data for ${entityName}:`, error);
        throw error;
    }
}

export async function getAllBy<T>(entityName: string, value: string): Promise<T[]> {
    try {
        const response = await apiClient.get<T[]>(`/${entityName}/${value}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${entityName} by value:`, error);
        throw error;
    }
}

export async function getById<T>(entityName: string, Id: string): Promise<T> {
    try {
        const response = await apiClient.get<T>(`/${entityName}/${Id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${entityName} by ID:`, error);
        throw error;
    }
}

export async function Search<T>(entityName: string, searchCriteria: SearchCriteria): Promise<T[]> {
    try {
        const response = await apiClient.post<T[]>(`/${entityName}/search`, searchCriteria);
        return response.data;
    } catch (error) {
        console.error(`Error searching ${entityName}:`, error);
        throw error;
    }
}

export async function deleteEntity(entityName: string, id: any) {
    try {
        const response = await apiClient.delete(`/${entityName}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting ${entityName}:`, error);
        throw error;
    }
}

export async function getBy(entityName: string, criterion: string , value:string) {
    try {
        const response = await apiClient.get(`/${entityName}/${criterion}${value}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${entityName} by ${criterion}:`, error);
        throw error;
    }
}