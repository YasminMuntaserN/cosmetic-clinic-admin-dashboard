import {Column, Table} from "../../ui/Table.tsx";
import {Badge} from "../../ui/Badge.tsx";
import {format} from "date-fns";
import {useDoctorAppointments} from "../hooks/useDoctor.ts";
import {useEffect} from "react";
import {Appointment} from "../../../types/Appointment.ts";
import {ErrorMessage} from "../../ui/ErrorMessage.tsx";

export function DoctorAppointments({doctorId} :{doctorId: string}) {
    const {getDoctorAppointments , doctorAppointments , isLoading, error } =useDoctorAppointments();
    
    useEffect(() =>{
        if(doctorId)
            getDoctorAppointments(doctorId);
    } ,[doctorId]);
    
    const columns: Column<Appointment>[] = [
        {
            key: 'patientName',
            header: 'Patient',
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
            <h1 className="text-3xl font-slab mb-2">Doctor Appointments</h1>
            <Table
                data={doctorAppointments}
                columns={columns}
                isLoading={isLoading}
                className="shadow-sm" 
            />
        </div>
    );
}
