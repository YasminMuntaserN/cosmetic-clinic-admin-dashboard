import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Appointment} from "../../types/Appointment.ts";
import '../../index.css';
import {useContext} from "react";
import {AddEditAppointmentForm} from "./AddEditAppointmentForm.tsx";
import {Modal, ModalContext} from "../ui/Modal.tsx";
import {AddModal} from "../ui/AddModal.tsx";
interface CalendarProps {
    selectedAppointment : Appointment | null;
    setSelectedAppointment: (selectedAppointment: Appointment | null) => void;
    appointments: Appointment[];
}

export function Calendar({ appointments ,selectedAppointment ,setSelectedAppointment}: CalendarProps) {
    
    const getEventColor = (status: string): string => {
        switch (status) {
            case "Scheduled":
                return "#FFD700"; 
            case "Confirmed":
                return "#32CD32"; 
            case "InProgress":
                return "#FFA500"; 
            case "Completed":
                return "#4CAF50"; 
            case "Cancelled":
                return "#FF4500"; 
            case "NoShow":
                return "#8B0000"; 
            default:
                return "#f3f3c2"; 
        }
    };

    const events = appointments.map((appointment) => ({
        id: appointment.id,
        title: `${appointment.patientName}`,
        start: new Date(appointment.scheduledDateTime),
        end: new Date(
            new Date(appointment.scheduledDateTime).getTime() +
            appointment.durationMinutes * 60 * 1000
        ),
        backgroundColor: getEventColor(appointment.status),
        textColor: "#2B2B26"
    }));

    const modalContext = useContext(ModalContext); 

    if (!modalContext) {
        throw new Error("Calendar must be used within a Modal provider");
    }

    const { open } = modalContext;


    const handleEventClick = (info: any) => {
        const appointment = appointments.find((appt) => appt.id === info.event.id);
        if (appointment) {
            setSelectedAppointment(appointment);
            open("appointmentEditModal"); 
        }
    };

    return (
        <>
        <div className="text-secondary font-slab font-bold mb-10">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events}
                eventClick={handleEventClick} 
                eventContent={(eventInfo) => (
                    <div>
                        <b>{eventInfo.event.title}</b>
                        <p>{eventInfo.timeText}</p>
                    </div>
                )}
            />
        </div>

            {selectedAppointment && (
                <Modal.Window name="appointmentEditModal">
                    <AddEditAppointmentForm
                        selectedAppointment={selectedAppointment}
                        handleSelectedAppointment={setSelectedAppointment}
                    />
                </Modal.Window>
            )}

            <AddModal onClick={()=>open("addAppointment")}/>


            <Modal.Window name="addAppointment">
                <AddEditAppointmentForm/>
            </Modal.Window>
        </>
    );
}