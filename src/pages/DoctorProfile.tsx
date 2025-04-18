import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CalendarDays, MessageSquareShare, User, Lock} from "lucide-react";
import {useDoctor} from "../components/Doctors/hooks/useDoctor.ts";
import {PersonalInfo} from "../components/Doctors/DoctorProfile/PersonalInfo.tsx";
import {DoctorAppointments} from "../components/Doctors/DoctorProfile/DoctorAppointments.tsx";
import {ChangePassword} from "../components/User/ChangePassword.tsx";
import {GoToChatButton} from "../components/Chat/GoToChatButton.tsx";
import {useClinic} from "../context/ClinicContext.tsx";
import {Doctor} from "../types/doctor.ts";
import {ProfileLayout} from "../components/ui/ProfileLayout.tsx";
import {Loading} from "../components/ui/Loading.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

export function DoctorProfile() {
    const {doctorId} = useParams<{ doctorId: string }>();
    const {getDoctor, doctor, isLoading, error} = useDoctor();
    const [dataToShow, setDataToShow] = useState<string>("Personal Info");
    const {setSelectedUserId} = useClinic();

    useEffect(() => {
        if (doctorId) {
            getDoctor({id: doctorId}, {
                onSuccess: (data: Doctor) => {
                    setSelectedUserId(data.userId!!);
                }
            });
        }
    }, [doctorId, getDoctor, setSelectedUserId]);

    if (error) return <ErrorMessage />;
    if (isLoading) return <Loading/>;
    if (!doctor) return null;

    const profileActions = [
        {
            icon: <User size={18} className="mr-2"/>,
            label: "Personal Info",
            onClick: () => setDataToShow("Personal Info")
        },
        {
            icon: <CalendarDays size={18} className="mr-2"/>,
            label: "Appointments",
            onClick: () => setDataToShow("Appointments")
        },
        {
            icon: <Lock size={18} className="mr-2"/>,
            label: "Change Password",
            onClick: () => setDataToShow("Change Password")
        }
    ];

    
    return (
        <ProfileLayout
            title={`Dr. ${doctor.firstName} ${doctor.lastName}`}
            imageUrl={doctor.imageUrl}
            imageAlt={doctor.firstName}
            contactInfo={{
                email: doctor.email,
                phone: doctor.phone
            }}
            actions={profileActions}
            primaryAction={<GoToChatButton text={<><MessageSquareShare className="mr-2"/> Start Chat </>}
                                           ButtonStyle="fullBackground"/>}
            backTo="/doctors"
            selectedAction={dataToShow}
            onActionChange={setDataToShow}
        >
            {dataToShow === "Personal Info" && <PersonalInfo doctor={doctor}/>}
            {dataToShow === "Appointments" && <DoctorAppointments doctorId={doctor.id}/>}
            {dataToShow === "Change Password" && <ChangePassword userId={doctor.userId}/>}
        </ProfileLayout>
    );
}