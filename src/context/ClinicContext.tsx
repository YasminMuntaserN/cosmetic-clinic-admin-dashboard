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
    clinicName :string;
    setClinicName:(clinicName: string) => void;
    clinicAddress :string;
    setClinicAddress:(clinicName: string) => void;
    formMode :FormMode;
    setFormMode:(formMode :FormMode)  =>void;
}

interface Search {
    term: string ;
    entity : string ;
}
interface FormMode {
    formName: string ;
    isAdd : boolean ;
}
const ClinicContext = createContext<UserContextType | undefined>(undefined);

export function ClinicProvider({ children }: { children: React.ReactNode }) {
   const [category, setCategory] = useState<string>("");
    const [search, setSearch] = useState<Search>({term: "", entity: ""});
    const [selectedUserId, setSelectedUserId] = useState<string>("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [clinicName ,setClinicName] = useState("Yara Choice");
    const [clinicAddress ,setClinicAddress ]= useState("United Arab Emirates _ Abu Dhabi _ Corniche Street");
    const [formMode ,setFormMode ]= useState<FormMode>({formName:"" ,isAdd : false});

    return (
        <ClinicContext.Provider value={{
            category, setCategory ,search, setSearch ,
            selectedUserId, setSelectedUserId ,selectedUser, setSelectedUser,
            clinicName ,setClinicName ,clinicAddress ,setClinicAddress ,formMode ,setFormMode}}>
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