import {useEffect, useState} from 'react';
import {DoctorList} from "../components/Doctors/DoctorList.tsx";
import {PAGE_SIZE} from "../utils/constants.ts";
import {usePaginatedDoctorsList, useSearchedDoctors} from "../components/Doctors/hooks/useDoctor.ts";
import {useClinic} from "../context/ClinicContext.tsx";
import {PaginatedResponse} from "../types/Pagination.ts";
import {Doctor} from "../types/doctor.ts";
import {AddModal} from "../components/ui/AddModal.tsx";
import {Modal} from "../components/ui/Modal.tsx";
import {AddEditDoctorForm} from "../components/Doctors/AddEditDoctorForm.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";


export function Doctors() {
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState('firstName');
    const [ascending, setAscending] = useState(true);
    const [doctorList, setDoctorList] = useState<Doctor[]>([]);
    const {getPaginatedDoctorsList, totalCount, isLoading, error} = usePaginatedDoctorsList();
    const {search} = useClinic();
    const {
        getSearchedDoctors,
        isLoading: SearchedDoctorsLoading,
        error: SearchedDoctorsError
    } = useSearchedDoctors();


    useEffect(() => {
        if (search.term) {
            getSearchedDoctors(
                {field: "firstName", value: search.term},
                {
                    onSuccess: (data: Doctor[]) => {
                        setDoctorList(data);
                    }
                }
            );
        }
    }, [search]);

    useEffect(() => {
        if (!search.term) {
            getPaginatedDoctorsList(
                {PageNumber: currentPage, PageSize: PAGE_SIZE, OrderBy: orderBy, Ascending: ascending},
                {
                    onSuccess: (data: PaginatedResponse) => {
                        setDoctorList(data.data);
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

    if (error || SearchedDoctorsError) return <ErrorMessage />;

    return (
        <Modal>
            <div className="container mx-auto">
                <DoctorList
                    doctors={doctorList || []}
                    totalCount={totalCount ?? 0}
                    onPageChange={setCurrentPage}
                    onSort={handleSort}
                    currentPage={currentPage}
                    pageSize={PAGE_SIZE}
                    isLoading={isLoading || SearchedDoctorsLoading}
                />
            </div>
            <Modal.Open opens="addDoctor" >
               <AddModal/>
            </Modal.Open>
            
            <Modal.Window name="addDoctor">
                <AddEditDoctorForm />
            </Modal.Window>
        </Modal>
    );
}