import axios from "axios";
import {PaginatedResponse, Pagination, SearchCriteria} from "../types/Pagination.ts";

//const AUTH_TOKEN = localStorage.getItem('accessToken');
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2N2RiNDQ1ZDhhNjhmYzBkOWMxNDMyZTEiLCJlbWFpbCI6InlhcmFAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiUGVybWlzc2lvbnMiOiI0MTk0MzAzIiwibmJmIjoxNzQzODg1MDExLCJleHAiOjE3NDM4OTIyMTEsImlhdCI6MTc0Mzg4NTAxMSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3QiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMvIn0.w6lnIGqp46XEdGkeSWXnFcOnXsPrGZPRUUWpLNjsViE";
const apiClient = axios.create({
    baseURL: "http://localhost:5030/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`,
    },
});

export async function addEntity(entityName:string,data:any) {
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

export async function paginatedList(
    entityName: string,
    pagination: Pagination): Promise<PaginatedResponse> {
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

export async function Search<T>( entityName:string ,searchCriteria :SearchCriteria): Promise<T[]> {
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