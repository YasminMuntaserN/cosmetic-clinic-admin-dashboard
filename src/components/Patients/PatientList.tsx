import {Column, Table} from "../ui/Table.tsx";
import {Badge} from "../ui/Badge.tsx";
import {Patient} from "../../types/patient.ts";
import {useNavigate} from "react-router-dom";


interface PatientListProps {
    Patients: Patient[];
    totalCount: number;
    onPageChange: (page: number) => void;
    onSort: (field: string, ascending: boolean) => void;
    currentPage: number;
    pageSize: number;
    isLoading?: boolean;
}

export function PatientList({
                                Patients,
                                totalCount,
                                onPageChange,
                                onSort,
                                currentPage,
                                pageSize,
                                isLoading = false
                            }: PatientListProps) {
    const navigate = useNavigate();
    const columns: Column<Patient>[] = [
        {
            key: 'firstName',
            header: 'First Name',
            sortable: true,
        },
        {
            key: 'lastName',
            header: 'Last Name',
            sortable: true,
        },
        {
            key: 'email',
            header: 'Email',
            sortable: true,
        },
        {
            key: 'phone',
            header: 'Phone',
            sortable: false,
        },
        {
            key: 'dateOfBirth',
            header: 'Age',
            sortable: false,
            render: (patient) =>(patient.dateOfBirth && Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))) || 'N/A',
        },
        {
            key: 'gender',
            header: 'Gender',
            sortable: false,
            render: (Patient) => (
                <Badge variant={Patient.gender === 'Male' ? 'Male' : 'Female'}>
                    {Patient.gender === 'Male' ? 'Male' : 'Female'}
                </Badge>
            ),
        },
        {
            key: 'address.city',
            header: 'City',
            sortable: false,
            render: (patient) => patient.address?.city || 'N/A',
        },
        {
            key: 'allergies',
            header: 'Allergies',
            sortable: false,
            render: (patient) =>
                patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {patient.allergies.map((allergy, index) => (
                            <Badge key={index} variant='info'>
                                {allergy}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    'No allergies'
                ),
        }
    ];
    const handleRowClick = (Patient: Patient) => {
        navigate(`/patientProfile/${Patient.id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-slab mb-2">Patients</h1>
            <Table
                data={Patients}
                columns={columns}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={onPageChange}
                onRowClick={handleRowClick}
                totalItems={totalCount}
                isLoading={isLoading}
                onSort={onSort}
                className="shadow-sm"
            />
        </div>
    );
}