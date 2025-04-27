import {useEffect, useState} from "react";
import {
    usePaginatedTreatmentsList,
    useTreatmentsListByCategory,
    useSearchedTreatments
} from "../components/Treatments/hooks/useTreatment.ts";
import {useClinic} from "../context/ClinicContext.tsx";
import {PaginatedResponse} from "../types/Pagination.ts";
import {TreatmentList} from "../components/Treatments/TreatmentList.tsx";
import {Treatment} from "../types/treatment.ts";
import {Modal} from "../components/ui/Modal.tsx";
import {AddModal} from "../components/ui/AddModal.tsx";
import {AddEditTreatmentForm} from "../components/Treatments/AddEditTreatmentForm.tsx";
import {ErrorMessage} from "../components/ui/ErrorMessage.tsx";
import {PageLayout} from "../components/ui/PageLayout.tsx";

export function Treatments() {
    const [currentPage, setCurrentPage] = useState(1);
    const [orderBy, setOrderBy] = useState('name');
    const [TreatmentsList, setTreatmentList] = useState<Treatment[]>([]);
    const {getPaginatedTreatmentsList, totalPages, isLoading, error} = usePaginatedTreatmentsList();
    const {
        getTreatmentsByCategory,
        isLoading: TreatmentsCategoryLoading,
        error: TreatmentsCategoryError
    } = useTreatmentsListByCategory();
    const {
        getSearchedTreatments,
        isLoading: SearchedTreatmentsLoading,
        error: SearchedTreatmentsError
    } = useSearchedTreatments();
    const {category, search} = useClinic();


    useEffect(() => {
        if (search.term) {
            getSearchedTreatments(
                {field: "name", value: search.term},
                {
                    onSuccess: (data: Treatment[]) => {
                        setTreatmentList(data);
                    }
                }
            );
        }
    }, [search]);

    useEffect(() => {
        if (!search.term) {
            if (category) {
                getTreatmentsByCategory(
                    category,
                    {
                        onSuccess: (data: Treatment[]) => {
                            setTreatmentList(data);
                        }
                    }
                );
            } else {
                getPaginatedTreatmentsList(
                    {PageNumber: currentPage, PageSize: 4, OrderBy: orderBy},
                    {
                        onSuccess: (data: PaginatedResponse) => {
                            setTreatmentList(data.data);
                        }
                    }
                );
            }
        }
    }, [currentPage, orderBy, category, search.term]);

    const handleSort = (field: string) => {
        setOrderBy(field);
        setCurrentPage(1);
    };

    return (
        <PageLayout>
            <Modal>
                {(error || TreatmentsCategoryError || SearchedTreatmentsError) && <ErrorMessage/>}
                <div className="space-y-6">
                    <TreatmentList
                        treatments={TreatmentsList ?? []}
                        totalPages={totalPages ?? 0}
                        onPageChange={setCurrentPage}
                        onSort={handleSort}
                        currentPage={currentPage}
                        isLoading={isLoading || TreatmentsCategoryLoading || SearchedTreatmentsLoading}
                    />
                </div>
                <Modal.Open opens="addTreatment">
                    <AddModal/>
                </Modal.Open>
                <Modal.Window name="addTreatment">
                    <AddEditTreatmentForm/>
                </Modal.Window>
            </Modal>
        </PageLayout>

    );
}