import {format} from 'date-fns';
import {Column, Table} from "../components/ui/Table.tsx";
import {Badge} from "../components/ui/Badge.tsx";
import {Appointment} from "../types/Appointment.ts";
import {useEffect} from "react";
import {useTodaySchedule} from "../components/Appointments/hooks/useAppointment.ts";
import {ArrowLeft, Calendar} from "lucide-react";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {PageLayout} from "../components/ui/PageLayout.tsx";
import {Button} from "../components/ui/Button.tsx";
import {useNavigate} from "react-router-dom";


export function Schedule() {
    const {getTodaySchedule, TodaySchedule, error, isLoading} = useTodaySchedule();
    const navigate = useNavigate();
    const columns: Column<Appointment>[] = [
        {
            key: 'doctorName',
            header: 'Doctor Name',
            sortable: false,
            render: (appointment: Appointment) => <p> Dr. {appointment.doctorName}</p>
        },
        {
            key: 'patientName',
            header: 'Patient Name',
            sortable: false,
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
            render: (appointment: Appointment) => (
                <Badge
                    variant={appointment?.status === "Scheduled" ? "warning" : appointment?.status === "Completed" ? "success" : appointment?.status === "Cancel" ? "error" : "info"}>
                    {appointment?.status}
                </Badge>
            )
        }
    ];
    useEffect(() => {
        getTodaySchedule();
    }, []);
    
    return (
        <PageLayout>
            { error && <ErrorMessage/>}
            <div className="space-y-12 font-slab">
                <div className="flex items-center justify-between mx-10">
                    <div className="flex gap-6">
                        <Button
                            variant="SquareDashedButton"
                            onClick={() => navigate("/dashboard")}
                        >
                            <ArrowLeft/>
                        </Button>

                        <h1 className="text-2xl font-semibold text-gray-900">Today's Schedule</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500 flex gap-5"> <Calendar
                            className="text-basic font-extrabold"/> {format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                </div>

                <Table
                    data={TodaySchedule}
                    columns={columns}
                    isLoading={isLoading}
                    className="shadow-sm"
                />
            </div>
        </PageLayout>
    );
}

