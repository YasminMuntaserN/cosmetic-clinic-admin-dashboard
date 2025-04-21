import {PaginatedResponse, Pagination, SearchCriteria} from "../types/Pagination.ts";
import {apiClient} from "../utils/constants.ts";


export async function addEntity(entityName:string,data:any) {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.post( `/${entityName}`, data, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`, 
                Accept: "text/plain", 
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error adding doctor:", error);
        throw error;
    }
}

export async function UpdateEntity(entityName:string,Id:string,data:any) {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.put( `/${entityName}/${Id}`, data, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                Accept: "text/plain",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error adding doctor:", error);
        throw error;
    }
}

export async function ChangePassword(userId:string,currentPassword:string ,newPassword:string) {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.put( `/Users?userId=${userId}&currentPassword=${currentPassword}&newPassword=${newPassword}`, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                Accept: "text/plain",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error adding doctor:", error);
        throw error;
    }
}

export async function paginatedList(
    entityName: string,
    pagination: Pagination): Promise<PaginatedResponse> {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.get<PaginatedResponse>(
            `/${entityName}/paginated?PageNumber=${pagination.PageNumber}&PageSize=${pagination.PageSize}&OrderBy=${pagination.OrderBy}`,{
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                Accept: "text/plain",
            }
        },
        );

        return response.data; 
    } catch (error) {
        console.error(`Error fetching paginated ${entityName}:`, error);
        throw error; 
    }
}

export async function getAll<T>(entityName: string): Promise<T[]> {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.get<T[]>(`/${entityName}`,
            {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    Accept: "text/plain",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching paginated ${entityName}:`, error);
        throw error;
    }
}

export async function getAllSelectorData<T>(entityName: string): Promise<T[]> {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.get<T[]>(`/${entityName}`,
            {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    Accept: "text/plain",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching paginated ${entityName}:`, error);
        throw error;
    }
}

export async function getAllBy<T>(entityName: string, value: string): Promise<T[]> {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.get<T[]>(
            `/${entityName}/${value}`,
            {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    Accept: "text/plain",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching paginated ${entityName}:`, error);
        throw error;
    }
}

export async function getById<T>(entityName: string, Id: string): Promise<T> {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.get<T>(
            `/${entityName}/${Id}`,
            {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    Accept: "text/plain",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${entityName} with Id:`, error);
        throw error;
    }
}

export async function Search<T>( entityName:string ,searchCriteria :SearchCriteria): Promise<T[]> {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.post<T[]>(`/${entityName}/search`, searchCriteria,
            {
                headers: {
                    Authorization: `Bearer ${AUTH_TOKEN}`,
                    Accept: "text/plain",
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error searching ${entityName}:`, error);
        throw error;
    }
}

export async function deleteEntity(entityName:string,id:any) {
    const AUTH_TOKEN = localStorage.getItem('accessToken');
    try {
        const response = await apiClient.delete( `/${entityName}/${id}`, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
                Accept: "text/plain",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting doctor:", error);
        throw error;
    }
}
