import {Modal} from "../../ui/Modal.tsx";
import {MedicalHistoryForm} from "./MedicalHistoryForm.tsx";
import {Stethoscope} from "lucide-react";

function MedicalHistory() {
    return (
        <Modal>
            <Modal.Open opens="addMedicalHistory">
                <button type="button" className="flex border-2 border-primary w-full  py-2 px-4 rounded-md font-bold text-secondary  justify-center">
                    <Stethoscope className="w-6 h-6 mr-6"/>  Add Medical History 
                </button >
            </Modal.Open>
            <Modal.Window name="addMedicalHistory">
                <MedicalHistoryForm />
            </Modal.Window>
        </Modal>
    );
}

export default MedicalHistory;