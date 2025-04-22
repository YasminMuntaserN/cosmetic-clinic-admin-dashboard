import {BeautyHeaven} from '../components/Dashboard/BeautyHeaven';
import {DashboardHeader} from '../components/Dashboard/DashboardHeader';
import {Stats} from "../components/Dashboard/Stats.tsx";
import {DoctorsCards} from "../components/Doctors/DocorsCards.tsx";
import {WorkHours} from "../components/Dashboard/WorkHours.tsx";
import {PageLayout} from "../components/ui/PageLayout.tsx";
import {Modal} from "../components/ui/Modal.tsx";
import {AddEditAppointmentForm} from "../components/Appointments/AddEditAppointmentForm.tsx";


export function Dashboard() {
    return (
    <PageLayout>
        <Modal>
            <div className="space-y-6">
                <DashboardHeader/>
                <Stats/>
                <BeautyHeaven/>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <DoctorsCards/>
                    </div>
                    <WorkHours/>
                </div>
            </div>
            <Modal.Window name="addAppointment">
                <AddEditAppointmentForm/>
            </Modal.Window>

        </Modal>
    </PageLayout>

)
    ;
}