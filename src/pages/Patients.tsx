import {useEffect, useState} from "react";
import {PAGE_SIZE} from "../utils/constants.ts";
import {usePaginatedPatientsList} from "../components/Patients/hooks/usePatient.ts";
import {useSearchedPatients} from "../components/Patients/hooks/usePatient.ts";
import {useClinic} from "../context/ClinicContext.tsx";
import {PaginatedResponse} from "../types/Pagination.ts";
import {Patient} from "../types/patient.ts";
import {PatientList} from "../components/Patients/PatientList.tsx";
import {AddModal} from "../components/ui/AddModal.tsx";
import {Modal} from "../components/ui/Modal.tsx";
import {AddEditPatientForm} from "../components/Patients/AddEditPatientForm.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {PageLayout} from "../components/ui/PageLayout.tsx";

export function Patients() {
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState('firstName');
    const [ascending, setAscending] = useState(true);
    const [patientList, setPatientList] = useState<Patient[]>([]);
    const {getPaginatedPatientsList, totalCount, isLoading, error} = usePaginatedPatientsList();
    const {search} = useClinic();
    const {
        getSearchedPatients,
        isLoading: SearchedPatientsLoading,
        error: SearchedPatientsError
    } = useSearchedPatients();


    useEffect(() => {
        if (search.term) {
            getSearchedPatients(
                {field: "firstName", value: search.term},
                {
                    onSuccess: (data: Patient[]) => {
                        setPatientList(data);
                    }
                }
            );
        }
    }, [search]);

    useEffect(() => {
        if (!search.term) {
            getPaginatedPatientsList(
                {PageNumber: currentPage, PageSize: PAGE_SIZE, OrderBy: orderBy, Ascending: ascending},
                {
                    onSuccess: (data: PaginatedResponse) => {
                        setPatientList(data.data);
                    }
                }
            );
        }
    }, [currentPage, orderBy, search.term]);

    const handleSort = (field: string, isAscending: boolean) => {
        setOrderBy(field);
        setAscending(isAscending);
        setCurrentPage(1);
    };
    

    return (
        <PageLayout>
            { (error || SearchedPatientsError) && <ErrorMessage/>}
            <Modal>
                <div className="container mx-auto">
                    <PatientList
                        Patients={patientList || []}
                        totalCount={totalCount ?? 0}
                        onPageChange={setCurrentPage}
                        onSort={handleSort}
                        currentPage={currentPage}
                        pageSize={PAGE_SIZE}
                        isLoading={isLoading || SearchedPatientsLoading}
                    />
                </div>
                <Modal.Open opens="addPatient">
                    <AddModal/>
                </Modal.Open>
                <Modal.Window name="addPatient">
                    <AddEditPatientForm/>
                </Modal.Window>
            </Modal>
        </PageLayout>

    );
}