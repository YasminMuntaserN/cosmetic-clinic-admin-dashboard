import {useNavigate} from "react-router-dom";
import {EditModal} from "./EditModal.tsx";

export function EditView({type, Id, data}: { type: string, Id: string, data: any }) {
    const navigate = useNavigate();

    return (
        <div className="mt-4 flex space-x-2">
            <EditModal dataType={type} selectedData={data} button={
                <button
                    className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Edit
                </button>}/>
            <div>
                <button
                    className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => type === "product" ? navigate(`/productProfile/${Id}`) : navigate(`/treatmentProfile/${Id}`)}>
                    View Details
                </button>
            </div>
        </div>
    )
}