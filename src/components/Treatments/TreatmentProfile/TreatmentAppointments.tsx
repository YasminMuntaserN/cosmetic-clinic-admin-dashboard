import {useEffect} from "react";
import {Column, Table} from "../../ui/Table.tsx";
import {Appointment} from "../../../types/Appointment.ts";
import {Badge} from "../../ui/Badge.tsx";
import {format} from "date-fns";
import {useTreatmentAppointments} from "../hooks/useTreatment.ts";

export function TreatmentAppointments({treatmentId} :{treatmentId: string}) {
    const { getTreatmentAppointments , treatmentAppointments , isLoadingTratments, errorTreatments}= useTreatmentAppointments();


    useEffect(() =>{
        if(treatmentId)
            getTreatmentAppointments(treatmentId);
    } ,[treatmentId]);
    const columns: Column<Appointment>[] = [
        {
            key: 'patientName',
            header: 'Patient',
            sortable: false,
        },
        {
            key: 'doctorName',
            header: 'Doctor ',
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

    if(errorTreatments) return <p>something get wrong..</p>
    return (
        <div className="p-6">
            <h1 className="text-3xl font-slab mb-2">Treatment Appointments</h1>
            <Table
                data={treatmentAppointments}
                columns={columns}
                isLoading={isLoadingTratments}
                className="shadow-sm"
            />
        </div>
    );
}
