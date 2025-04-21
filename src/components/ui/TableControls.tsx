import {useClinic} from "../../context/ClinicContext.tsx";
import {Filter, SlidersHorizontal} from "lucide-react";

interface TableControlsProps {
    CategoriesOptions :string[];
    onSort: (field: string, ascending: boolean) => void;
    SortOptions:string[];
}
export function TableControls({CategoriesOptions ,SortOptions, onSort}:TableControlsProps ){
    const {setCategory} =useClinic();
    
    return (
        <div  className="flex items-center space-x-4 justify-end sm:text-sm">
        <div className="flex items-center space-x-2">
        <SlidersHorizontal className={Icon}/>
        <select onChange={(e)=>onSort(e.target.value ,true)}
         className={Selector}>
        {SortOptions.map((sortOption) =>(
                <option key={sortOption} value={sortOption}>{sortOption}</option>
))}
    </select>
    </div>

    <div className="flex items-center space-x-2">
    <Filter className={Icon}/>
    <select onChange={(e)=>setCategory(e.target.value )}
            className={Selector}>
    <option value="">All Categories</option>
    {CategoriesOptions.map((categoriesOption) =>(
        <option key={categoriesOption} value={categoriesOption}>{categoriesOption}</option>
    ))}
    </select>
    </div>
    </div>
);
}

const Icon ="lg:h-5 lg:w-5 h-3 w-3";
const Selector ="rounded-md border-0 p-2 lg:py-3 lg:pl-3 lg:pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-basic sm:text-sm sm:leading-6";