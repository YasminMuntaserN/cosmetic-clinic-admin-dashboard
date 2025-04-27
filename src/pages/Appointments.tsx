import {Calendar} from "../components/Appointments/Calendar.tsx";
import {useAppointments} from "../components/Appointments/hooks/useAppointment.ts";
import { useEffect, useState} from "react";
import {Modal} from "../components/ui/Modal.tsx";
import {Appointment} from "../types/Appointment.ts";
import {Loading} from "../components/ui/Loading.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {PageLayout} from "../components/ui/PageLayout.tsx";

export function Appointments() {
    const {getAppointments, Appointments, error, isLoading} = useAppointments();
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  
    
    useEffect(() => {
        getAppointments()
    }, []);
    

    return (
        <PageLayout>
            { error && <ErrorMessage/>}
            <Modal action={() => setSelectedAppointment(null)}>
                {isLoading ? <Loading/> :
                    <Calendar selectedAppointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment}
                              appointments={Appointments ?? []}/>
                }
            </Modal>
        </PageLayout>

    );
}