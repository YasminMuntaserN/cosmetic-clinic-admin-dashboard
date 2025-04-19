import {Modal} from "../../ui/Modal.tsx";
import {Button} from "../../ui/Button.tsx";
import {UserCog} from "lucide-react";
import {AddEditPatientForm} from "../AddEditPatientForm.tsx";
import {Patient} from "../../../types/patient.ts";

export function EditPatient({selectedPatient} :{selectedPatient :Patient}) {
    return (
        <Modal>
            <Modal.Open opens="editPatient">
                <Button variant="SquareButton"><UserCog/></Button>
            </Modal.Open>
            <Modal.Window name="editPatient">
                <AddEditPatientForm selectedPatient={selectedPatient} />
            </Modal.Window>
        </Modal>
    );
}
