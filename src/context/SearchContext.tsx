import {createContext, useContext, useState} from "react";

interface UserContextType {
    category: string ;
    setCategory: (category: string) => void;
    search :Search ;
    setSearch: (search: Search) => void;
}

interface Search {
    term: string ;
    entity : string ;
}

const SearchContext = createContext<UserContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
   const [category, setCategory] = useState<string>("");
    const [search, setSearch] = useState<Search>({term: "", entity: ""});
    
   return (
        <SearchContext.Provider value={{category, setCategory ,search, setSearch}}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}