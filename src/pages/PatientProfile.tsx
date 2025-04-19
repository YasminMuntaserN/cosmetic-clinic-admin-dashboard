import { useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CalendarDays, MessageSquareShare, User, Lock, Stethoscope} from "lucide-react";
import {usePatient} from "../components/Patients/hooks/usePatient.ts";
import {GoToChatButton} from "../components/Chat/GoToChatButton.tsx";
import {useClinic} from "../context/ClinicContext.tsx";
import {ProfileLayout} from "../components/ui/ProfileLayout.tsx";
import {Patient} from "../types/patient.ts";
import {PersonalInfo} from "../components/Patients/PatientProfile/PersonalInfo.tsx";
import {MedicalRecord} from "../components/Patients/PatientProfile/MedicalRecord.tsx";
import {ChangePassword} from "../components/User/ChangePassword.tsx";
import {PatientAppointments} from "../components/Patients/PatientProfile/PatientAppointments.tsx";
import {Loading} from "../components/ui/Loading.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

export function PatientProfile() {
    const { patientId } = useParams<{ patientId: string }>();
    const {getPatient, patient, isLoading, error} = usePatient();
    const [dataToShow, setDataToShow] = useState<string>("Personal Info");
    const {setSelectedUserId} = useClinic();

    useEffect(() => {
        if (patientId) {
            getPatient({id: patientId}, {
                onSuccess: (data: Patient) => {
                    setSelectedUserId(data.userId!!);
                }
            });
        }
    }, [patientId, getPatient, setSelectedUserId]);

    if (error) return <ErrorMessage />;
    if (isLoading) return <Loading />;
    if (!patient) return null;

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
            icon: <Stethoscope   size={18} className="mr-2"/>,
            label: "Medical Record",
            onClick: () => setDataToShow("Medical Record")
        },
        {
            icon: <Lock size={18} className="mr-2"/>,
            label: "Change Password",
            onClick: () => setDataToShow("Change Password")
        }
    ];

    
    return (
        <ProfileLayout
            title={`${patient.gender === "Male" ? "Mr. " : "Ms."} ${patient.firstName} ${patient.lastName}`}
            imageUrl={patient.gender === "Male" ?"/Patient.jpg" :"/FemalePatient.png"}
            imageAlt={patient.firstName}
            contactInfo={{
                email: patient.email,
                phone: patient.phone
            }}
            actions={profileActions}
            primaryAction={<GoToChatButton text={<><MessageSquareShare className="mr-2"/> Start Chat </>}
                                           ButtonStyle="fullBackground"/>}
            backTo="/Patients"
            selectedAction={dataToShow}
            onActionChange={setDataToShow}
        >
            {dataToShow === "Personal Info" && <PersonalInfo patient={patient}/>   }
            {dataToShow === "Appointments" &&  <PatientAppointments patientId={patient.id}/>  }
            {dataToShow === "Medical Record" &&  <MedicalRecord patient={patient}/>  }
            {dataToShow === "Change Password" && <ChangePassword userId={patient.userId}/>  }
        </ProfileLayout>
    );
}