import {Calendar, Contact, MessageSquarePlus} from "lucide-react";
import {Button} from "../ui/Button.tsx";
interface DoctorOperationButtonsProps {
    doctorId: string;
}

export function DoctorOperationButtons({ doctorId }: DoctorOperationButtonsProps) {
    const handleChatClick=()=>{
        console.log(doctorId)
    }
    return (
        <div className="flex gap-6">
            <Button variant="SquareButton" onClick={handleChatClick}>
                <MessageSquarePlus className={iconStyles} aria-hidden="true" />
            </Button>

            <Button variant="SquareButton">
                <Contact className={iconStyles} aria-hidden="true" />
            </Button>

            <Button variant="SquareButton">
                <Calendar className={iconStyles} aria-hidden="true" />
            </Button>
        </div>
    );
}

const iconStyles = "h-5 w-5 text-basic";
