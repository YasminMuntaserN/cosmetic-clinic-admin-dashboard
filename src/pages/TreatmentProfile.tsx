import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {
    AlertCircle,
    Info,
    BadgeAlert, Shapes, NotepadText, Calendar, Syringe, X,
} from 'lucide-react';
import {Badge} from '../components/ui/Badge';
import {DetailPageLayout} from "../components/ui/DetailPageLayout.tsx";
import {useTreatment} from "../components/Treatments/hooks/useTreatment.ts";
import {Button} from "../components/ui/Button.tsx";
import {TreatmentAppointments} from "../components/Treatments/TreatmentProfile/TreatmentAppointments.tsx";
import {Loading} from "../components/ui/Loading.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";

export function TreatmentProfile() {
    const {treatmentId} = useParams<{ treatmentId: string }>();
    const {getTreatment, treatment, isLoading, error} = useTreatment();
    const [showPatiens, setShowPatiens] = useState<boolean>(false);

    useEffect(() => {
        if (treatmentId) {
            getTreatment({id: treatmentId});
        }
    }, [treatmentId, getTreatment]);
    
    if (isLoading ) return <Loading />;
    if (!treatment) return null;

    return (
        <DetailPageLayout
            dataType="treatment"
            selectedData={treatment}
            title={treatment.name}
            imageUrl={treatment.imageUrl}
            category={treatment.category}
            price={treatment.price}
            addtionalData={
                <>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5"/>
                        <span>Duration Minutes : {treatment.durationMinutes}</span>
                    </div>
                    <Button variant="grayBackground" onClick={() => setShowPatiens((pre)=>!pre)}> <Syringe size={18}/>patients
                        try this treatment</Button>
                </>
            }
            backTo="/treatments"
            updatedAt={treatment.updatedAt}
            createdAt={treatment.createdAt}
        >
            { error && <ErrorMessage/>}
            {showPatiens ?
                <div>
                    <X className="cursor-pointer" onClick={() => setShowPatiens((pre)=>!pre)}/>
                    <TreatmentAppointments treatmentId={treatmentId ?? ""} />
                </div>
                :
                <>
                    <section className="border-2 rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <Info className="w-5 h-5"/>
                            Description
                        </h2>
                        <p className="text-gray-600">{treatment.description}</p>
                    </section>

                    <section className="border-2 rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <BadgeAlert className="w-5 h-5"/>
                            Risks
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {treatment.risks.map((risk, index) => (
                                <Badge
                                    key={index}
                                    variant="warning"
                                >
                                    {risk}
                                </Badge>
                            ))}
                        </div>
                    </section>

                    <section className="border-2 rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <NotepadText className="w-5 h-5"/>
                            PreRequisites
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            {treatment.preRequisites.map((preRequisite, index) => (
                                <li key={index} className="text-gray-600">{preRequisite}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="border-2 rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5"/>
                            After Care
                        </h2>
                        <ul className="list-disc list-inside space-y-2">
                            {treatment.afterCare.map((af, index) => (
                                <li key={index} className="text-gray-600">{af}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="border-2 rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <Shapes className="w-5 h-5"/>
                            Required Equipments
                        </h2>
                        <p className="text-gray-600">{treatment.requiredEquipments}</p>
                    </section>
                </>
            }
        </DetailPageLayout>
    );
}