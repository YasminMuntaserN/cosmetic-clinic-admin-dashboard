import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useClinic } from "../../context/ClinicContext.tsx";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce.ts";

export function Searchbar() {
    const location = useLocation();
    const pageName = location.pathname.toString();
    const { setSearch } = useClinic();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm);

    const pathToEntity: Record<string, string> = {
        "/doctors": "Doctors",
        "/patients": "Patients",
        "/products": "Products",
        "/treatments": "Treatments",
    };

    const Entity = pathToEntity[pageName] ?? "";

    useEffect(() => {
        if(debouncedSearchTerm)
            setSearch({ term: debouncedSearchTerm, entity: Entity });
        else
            setSearch({ term: "", entity: "" });
    }, [debouncedSearchTerm, Entity, setSearch]);

    return (
        <div className="flex flex-1">
            <div className="flex w-full max-w-lg">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex  items-center pl-3">
                        <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        id="search"
                        name="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full rounded-xl py-3 pl-10 pr-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-none sm:text-sm sm:leading-6"
                        placeholder={Entity === "" ? "Search..." : `Search for ${Entity}`}
                        type="search"
                    />
                </div>
            </div>
        </div>
    );
}
