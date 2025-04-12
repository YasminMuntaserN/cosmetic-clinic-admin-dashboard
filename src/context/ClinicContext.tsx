import {createContext, useContext, useState} from "react";
import {User} from "../types/User.ts";

interface UserContextType {
    category: string ;
    setCategory: (category: string) => void;
    search :Search ;
    setSearch: (search: Search) => void;
    selectedUserId :string;
    setSelectedUserId:(id: string) => void;
    selectedUser :User | null;
    setSelectedUser:(user: User | null) => void;
}

interface Search {
    term: string ;
    entity : string ;
}

const ClinicContext = createContext<UserContextType | undefined>(undefined);

export function ClinicProvider({ children }: { children: React.ReactNode }) {
   const [category, setCategory] = useState<string>("");
    const [search, setSearch] = useState<Search>({term: "", entity: ""});
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <ClinicContext.Provider value={{category, setCategory ,search, setSearch ,selectedUserId, setSelectedUserId ,selectedUser, setSelectedUser}}>
            {children}
        </ClinicContext.Provider>
    );
}

export function useClinic() {
    const context = useContext(ClinicContext);
    if (!context) {
        throw new Error('useClinic must be used within a ClinicProvider');
    }
    return context;
}