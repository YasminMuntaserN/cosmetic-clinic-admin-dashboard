import {AlertTriangle} from "lucide-react";
import {Button} from "./Button.tsx";
import {useDeleteProduct} from "../Products/hooks/useProduct.ts";
import {useDeleteTreatment} from "../Treatments/hooks/useTreatment.ts";
import toast from "react-hot-toast";
import {useDeletePatient} from "../Patients/hooks/usePatient.ts";
import {useNavigate} from "react-router-dom";
import {useDeleteDoctor} from "../Doctors/hooks/useDoctor.ts";


interface DeleteProps {
    id: string;
    dataType: "product" | "treatment" |"patient" |"doctor";
    onClose?: () => void;
}


export function Delete({id,  dataType, onClose } :DeleteProps) {
    const {
        deleteProduct,
        isLoading: productDeleting,
        error: productError
    } = useDeleteProduct();

    const {
        deleteTreatment,
        isLoading: treatmentDeleting,
        error: treatmentError
    } = useDeleteTreatment();

    const {
        deletePatient,
        isLoading: patientDeleting,
        error: patientError
    } = useDeletePatient();

    const {deleteDoctor, isLoading :doctorDeleting, error:doctorError} = useDeleteDoctor();
    
    const navigate = useNavigate();

    const deleteActions: Record<DeleteProps["dataType"], Function> = {
        product: deleteProduct,
        treatment: deleteTreatment,
        patient: deletePatient,
        doctor: deleteDoctor,
    };
    
    const handleDelete = () => {
        const deleteFn = deleteActions[dataType];
        if (!deleteFn) return;

        deleteFn(
            { id },
            {
                onSuccess: () => {
                    toast.success(`This ${dataType} deleted successfully!`);
                    onClose?.();
                    navigate(`/${dataType}s`);
                },
                onError: () => {
                    toast.error("Something went wrong");
                },
            }
        );
    };

    if (productError || treatmentError || patientError ||doctorError) return <p className="text-red-600">Something went wrong.</p>;
    
    return (
        <div className="flex flex-col items-center gap-6  text-center font-slab">
            <div className="bg-red-100 text-red-600 rounded-full p-3">
                <AlertTriangle size={32}/>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Are you sure?</h1>
            <p className="text-gray-600 max-w-md">
                This action cannot be undone. All data related to this {dataType} will be permanently deleted.
            </p>
            <div className="flex justify-center gap-4 mt-4">
                <Button variant="DeleteButton" onClick={handleDelete}>
                    {productDeleting || treatmentDeleting || patientDeleting || doctorDeleting ? "Deleting..." :"Delete" }
                </Button>
                <Button variant="CancleButton" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
