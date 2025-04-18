import {CategoriesOptions, Treatment} from "../../types/treatment.ts";
import {Pagination} from "../ui/Pagination.tsx";
import {TreatmentItem} from "./TreatmentItem.tsx";
import {TableControls} from "../ui/TableControls.tsx";


interface TreatmentListProps {
    treatments: Treatment[];
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage: number;
    isLoading?: boolean;
    onSort: (field: string, ascending: boolean) => void;
}

export function TreatmentList({treatments, currentPage, totalPages, onPageChange, onSort}: TreatmentListProps) {
    return (
        <>
            <TableControls onSort={onSort} CategoriesOptions={CategoriesOptions} SortOptions={["name","price", "createdAt"]}/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {treatments.length > 0 ? (
                    treatments.map((treatment) => (
                        <TreatmentItem key={treatment.id} treatment={treatment}/>
                    ))
                ) : (
                    <p className="text-gray-600">No treatments available</p>
                )}
            </div>
            <div className="flex justify-center align-items-center ">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>
        </>
    )
}