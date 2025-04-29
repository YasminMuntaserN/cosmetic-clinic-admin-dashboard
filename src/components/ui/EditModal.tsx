import {Modal} from "../ui/Modal.tsx";
import {ReactNode} from "react";
import {AddEditTreatmentForm} from "../Treatments/AddEditTreatmentForm.tsx";
import {AddEditProductForm} from "../Products/AddEditProductForm.tsx";

interface EditModalProps{
    selectedData:any ;
    button:ReactNode;
    dataType :string;
};

export function EditModal({selectedData ,button ,dataType}:EditModalProps) {
    return (
        <Modal>
            <Modal.Open opens={`edit${dataType}`}>
                    <div>{button}</div>
            </Modal.Open>
            <Modal.Window name={`edit${dataType}`}>
                {
                    dataType === 'treatment' ?
                        <AddEditTreatmentForm selectedTreatment={selectedData}  />
                        :<AddEditProductForm  selectedProduct={selectedData}/>
                }
            </Modal.Window>
        </Modal>
    );
}
