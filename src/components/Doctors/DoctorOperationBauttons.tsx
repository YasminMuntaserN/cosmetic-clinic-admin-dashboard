import {Calendar, Contact, MessageSquarePlus} from "lucide-react";
import {Button} from "../ui/Button.tsx";
import {useNavigate} from "react-router-dom";
import {Doctor} from "../../types/doctor.ts";
import {Modal} from "../ui/Modal.tsx";
import {GoToChatButton} from "../Chat/GoToChatButton.tsx";
interface DoctorOperationButtonsProps {
    doctor: Doctor;
}

export function DoctorOperationButtons({ doctor }: DoctorOperationButtonsProps) {
    const navigate = useNavigate();
    return (
            <div className="flex gap-6">
                <GoToChatButton
                    ButtonStyle="SquareButton"
                    text={<MessageSquarePlus className={iconStyles} aria-hidden="true"/>}
                    userId={doctor.userId}
                    />


                <Button variant="SquareButton" onClick={() => doctor && navigate(`/doctorProfile/${doctor?.id}`)}>
                    <Contact className={iconStyles} aria-hidden="true"/>
                </Button>

                <Modal.Open opens ="addAppointment">
                    <Button variant="SquareButton">
                        <Calendar className={iconStyles} aria-hidden="true"/>
                    </Button>
                </Modal.Open>
                
            </div>
    );
}

const iconStyles = "h-5 w-5 text-basic";
