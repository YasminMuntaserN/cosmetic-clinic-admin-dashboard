import {Treatment} from "../../types/treatment.ts";
import {EditView} from "../ui/EditView.tsx";

interface TreatmentProps {
    treatment: Treatment;
}
export  function  TreatmentItem({treatment}:TreatmentProps) {
    return (
        <div className="flex w-full relative rounded-lg border bg-white px-6 py-5 shadow-basic shadow-sm hover:shadow-md transition-shadow font-slab">
            <div
                className="w-1/2 bg-cover bg-center rounded-lg"
                style={{backgroundImage: `url(${treatment.imageUrl})`}}
            ></div>

            <div className="w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-secondary">{treatment.name}</h3>
                    <p className="text-sm text-gray-600 m-2">{treatment.description}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">
                        <strong>Category:</strong> {treatment.category}
                    </p>
                    <p className="text-xs text-gray-500">
                        <strong>Duration:</strong> {treatment.durationMinutes} mins
                    </p>
                    <p className="text-xs text-gray-500">
                        <strong>Price:</strong> ${treatment.price.toFixed(2)}
                    </p>
                </div>
                <EditView />
            </div>
        </div>
    )
}