import {useDoctor} from "../components/Doctors/hooks/useDoctor.ts";
import {useEffect, useState} from "react";
import {useClinic} from "../context/ClinicContext.tsx";
import {Doctor} from "../types/doctor.ts";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {Loading} from "../components/ui/Loading.tsx";
import {Building, Lock, MessageSquareShare, User} from "lucide-react";
import {ProfileLayout} from "../components/ui/ProfileLayout.tsx";
import {GoToChatButton} from "../components/Chat/GoToChatButton.tsx";
import {PersonalInfo} from "../components/Doctors/DoctorProfile/PersonalInfo.tsx";
import {ChangePassword} from "../components/User/ChangePassword.tsx";
import {ClinicInfo} from "../components/Settings/ClinicInfo.tsx";

export function Settings() {
    const doctorId = "67e45e42f4197038cf6e087c";
    const {getDoctor, doctor, isLoading, error} = useDoctor();
    const [dataToShow, setDataToShow] = useState<string>("Clinic Info");
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
            icon: <Building   size={18} className="mr-2"/>,
            label: "Clinic Info",
            onClick: () => setDataToShow("Clinic Info")
        },
        {
            icon: <User size={18} className="mr-2"/>,
            label: "Personal Info",
            onClick: () => setDataToShow("Personal Info")
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
            backTo="/dashbord"
            selectedAction={dataToShow}
            onActionChange={setDataToShow}
        >
            {dataToShow === "Clinic Info" && <ClinicInfo/>}
            {dataToShow === "Personal Info" && <PersonalInfo doctor={doctor}/>}
            {dataToShow === "Change Password" && <ChangePassword userId={doctor.userId}/>}
        </ProfileLayout>
    );
}