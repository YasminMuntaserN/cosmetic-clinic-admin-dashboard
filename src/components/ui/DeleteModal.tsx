import {Modal} from "../ui/Modal.tsx";
import {ReactNode} from "react";
import {Delete} from "./Delete.tsx";

interface DeleteModalProps {
    id: string;
    button: ReactNode;
    dataType: "product" | "treatment" |"patient" |"doctor";
}

export function DeleteModal({ id, button, dataType }: DeleteModalProps) {
    return (
        <Modal>
            <Modal.Open opens={`delete-${dataType}`}>
                <div>{button}</div>
            </Modal.Open>

            <Modal.Window name={`delete-${dataType}`}>
                 <Delete  id={id} dataType={dataType}  />
            </Modal.Window>
        </Modal>
    );
}