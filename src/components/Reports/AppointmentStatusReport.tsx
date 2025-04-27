import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useAppointmentReport} from "./hook/useReport.ts";
import {useEffect} from "react";
import {Loading} from "../ui/Loading.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";
import {Report} from "../../types/Report.ts";

const getValueName = (value: string) => value === "0" ? "Scheduled" : value === "1" ? "Confirmed" : value === "2" ? "InProgress" : value === "3" ? "Completed" : "Cancelled";

function AppointmentStatusReport() {
    const {getAppointmentReport, AppointmentReport, isLoading, error} = useAppointmentReport();

    useEffect(() => {
        getAppointmentReport()
    }, []);
    const transformedData: any = AppointmentReport?.map(item => {
        const statusCounts: Record<string, number> = {
            Scheduled: 0,
            Confirmed: 0,
            InProgress: 0,
            Completed: 0,
            Cancelled: 0
        };

        item.data.forEach((status: Report) => {
            const statusName = getValueName(status.name);
            statusCounts[statusName] = status.value;
        });

        return {
            date: new Date(item.day).toLocaleDateString(),
            ...statusCounts
        };
    });

    if (isLoading || !transformedData) return <Loading/>;
    if (error) return <ErrorMessage/>;
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Appointment Status Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={transformedData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="Scheduled" stroke="#8884d8"/>
                    <Line type="monotone" dataKey="Confirmed" stroke="#82ca9d"/>
                    <Line type="monotone" dataKey="InProgress" stroke="#ffc658"/>
                    <Line type="monotone" dataKey="Completed" stroke="#ff8042"/>
                    <Line type="monotone" dataKey="Cancelled" stroke="#FC0000"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default AppointmentStatusReport;