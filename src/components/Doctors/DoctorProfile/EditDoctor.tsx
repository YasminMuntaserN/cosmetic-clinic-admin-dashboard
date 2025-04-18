import {Doctor} from "../../../types/doctor.ts";
import {Modal} from "../../ui/Modal.tsx";
import {Button} from "../../ui/Button.tsx";
import {UserCog} from "lucide-react";
import {AddEditDoctorForm} from "../AddEditDoctorForm.tsx";

export function EditDoctor({selectedDoctor} :{selectedDoctor :Doctor}) {
    return (
        <Modal>
            <Modal.Open opens="editDoctor">
                <Button variant="SquareButton"><UserCog/></Button>
            </Modal.Open>
            <Modal.Window name="editDoctor">
                <AddEditDoctorForm selectedDoctor={selectedDoctor} />
            </Modal.Window>
        </Modal>
    );
}

