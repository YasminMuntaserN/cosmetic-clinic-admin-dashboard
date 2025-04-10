import {Modal} from "../ui/Modal.tsx";
import {Button} from "../ui/Button.tsx";
import {AddEditPatientForm} from "../Patients/AddEditPatientForm.tsx";

function AddPatientForAppointment() {
    return (
        <Modal>
            <Modal.Open opens="addPatient">
                <Button type="button" variant="dashedBasic">
                    Add
                </Button >
            </Modal.Open>
            <Modal.Window name="addPatient">
                <AddEditPatientForm />
            </Modal.Window>
        </Modal>
    );
}

export default AddPatientForAppointment;