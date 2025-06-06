import {Treatment} from "../../types/treatment.ts";
import {EditView} from "../ui/EditView.tsx";

interface TreatmentProps {
    treatment: Treatment;
}
export  function  TreatmentItem({treatment}:TreatmentProps) {
    return (
        <div
            className="flex flex-col lg:flex-row w-full relative rounded-lg border bg-white px-6 py-5 shadow-basic shadow-sm hover:shadow-md transition-shadow font-slab ">
            <div className="aspect-w-3 aspect-h-2 mb-4">
                <img
                    className="w-full h-full object-cover rounded-lg"
                    src={treatment.imageUrl}
                    alt={treatment.name}
                />
            </div>

            <div className="w-full p-4 flex flex-col justify-between">
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
                <EditView type="treatment" Id={treatment.id} data={treatment}/>
            </div>
        </div>
    )
}