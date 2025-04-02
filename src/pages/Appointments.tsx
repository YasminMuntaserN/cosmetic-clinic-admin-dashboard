import {Calendar} from "../components/Appointments/Calendar.tsx";
import {useAppointments} from "../components/Appointments/hooks/useAppointment.ts";
import {useEffect, useState} from "react";
import {Modal} from "../components/ui/Modal.tsx";
import {Appointment} from "../types/Appointment.ts";

export function Appointments() {
    const {getAppointments, Appointments, error, isLoading} = useAppointments();
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        getAppointments()
    }, []);

    if (error) return <p>Something wrong happened</p>
    
    return (
        <Modal action={()=>setSelectedAppointment(null)}>
            {isLoading ? <p>loading....</p> :
            <Calendar selectedAppointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} appointments={Appointments ?? []}/>
            }
            </Modal>
    )
        ;
}