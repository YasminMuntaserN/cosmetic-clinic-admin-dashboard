import { BeautyHeaven } from '../components/Dashboard/BeautyHeaven';
import { DashboardHeader } from '../components/Dashboard/DashboardHeader';
import {Stats} from "../components/Dashboard/Stats.tsx";
import {DoctorsCards} from "../components/Doctors/DocorsCards.tsx";


export function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <Stats />
      <BeautyHeaven />
        <div className="grid grid-cols-2">
            <DoctorsCards />
           <div>patient review</div> 
        </div>
      {/* <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h2 className="text-base font-semibold text-gray-900">Today's Appointments</h2>
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Patient</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Doctor</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Treatment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          {appointment.patient}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.doctor}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.time}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.treatment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}