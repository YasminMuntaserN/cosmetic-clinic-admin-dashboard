import { format } from 'date-fns';
import {Column, Table} from "../components/ui/Table.tsx";
import {Badge} from "../components/ui/Badge.tsx";
import {Appointment} from "../types/Appointment.ts";
import {useEffect} from "react";
import {useTodaySchedule} from "../components/Appointments/hooks/useAppointment.ts";
import {Calendar, MessageSquarePlus} from "lucide-react";


export function Schedule() {
    const {getTodaySchedule, TodaySchedule, error, isLoading} = useTodaySchedule();
    const columns: Column<Appointment>[] = [
        {
            key: 'doctorName',
            header: 'Doctor Name',
            sortable: false,
            render:(appointment :Appointment) =>
                (<div className="grid grid-cols-2 "><p> Dr. {appointment.doctorName}</p> <MessageSquarePlus className={Icon} /></div>)
        },
        {
            key: 'patientName',
            header: 'Patient Name',
            sortable: false,
            render:(appointment :Appointment) =>
                (<div className="grid grid-cols-2 gap-4"><p> {appointment.patientName}</p> <MessageSquarePlus className={Icon} /></div>)
        },
        {
            key: 'durationMinutes',
            header: 'Duration / In minutes',
            sortable: false,
        },
        {
            key: 'treatmentName',
            header: 'Treatment Name',
            sortable: false,
        },
        {
            key: 'status',
            header: 'Status',
            sortable: false,
            render: (appointment :Appointment) => (
                <Badge variant={appointment?.status === "Scheduled" ? "warning" :appointment?.status === "Completed" ? "success" :appointment?.status === "Cancel" ?"error" :"info"}>
                    {appointment?.status}
                </Badge>
            )
        }
    ];
    useEffect(() => {
        getTodaySchedule();
    }, []);
    
    if(error) return <p>Something worng happend</p>
    return (
        <div className="space-y-12 font-slab" >
            <div className="flex items-center justify-between mx-10">
                <h1 className="text-2xl font-semibold text-gray-900">Today's Schedule</h1>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500 flex gap-5"> <Calendar className="text-basic font-extrabold"  /> {format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
                </div>
            </div>

            <Table
                data={TodaySchedule}
                columns={columns}
                isLoading={isLoading}
                className="shadow-sm"
            />
        </div>
    );
}

const Icon ="text-green-700 cursor-pointer";