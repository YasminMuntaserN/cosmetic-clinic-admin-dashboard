import {Column, Table} from "../../ui/Table.tsx";
import {Badge} from "../../ui/Badge.tsx";
import {format} from "date-fns";
import {useEffect} from "react";
import {Appointment} from "../../../types/Appointment.ts";
import {usePatientAppointments} from "../hooks/usePatient.ts";
import {ErrorMessage} from "../../ui/ErrorMessage.tsx";

export function PatientAppointments({patientId} :{patientId: string}) {
    const {getPatientAppointments , PatientAppointments , isLoading, error } =usePatientAppointments();
    
    useEffect(() =>{
        if(patientId)
            getPatientAppointments(patientId);
    } ,[patientId]);
    
    const columns: Column<Appointment>[] = [
        {
            key: 'doctorName',
            header: 'Doctor',
            sortable: false,
        },
        {
            key: 'treatmentName',
            header: 'Treatment ',
            sortable: false,
        },
        {
            key: 'status',
            header: 'Status',
            sortable: false,
            render: (appointment: Appointment) => (
                <Badge
                    variant={appointment?.status === "Scheduled" ? "warning" : appointment?.status === "Completed" ? "success" : appointment?.status === "Cancel" ? "error" : "info"}>
                    {appointment?.status}
                </Badge>
            )
        },
        {
            key: 'scheduledDateTime',
            header: 'Scheduled Date Time',
            sortable: false,
            render: (app) => format(new Date(app.scheduledDateTime), 'PPp'),
        },
    ];
    
   if(error) return <ErrorMessage />;
    return (
        <div className="p-6">
            <h1 className="text-3xl font-slab mb-2">Patient Appointments</h1>
            <Table
                data={PatientAppointments}
                columns={columns}
                isLoading={isLoading}
                className="shadow-sm" 
            />
        </div>
    );
}
