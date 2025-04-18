import type { Doctor } from '../../types/doctor';
import {Column, Table} from "../ui/Table.tsx";
import {Badge} from "../ui/Badge.tsx";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";


interface DoctorListProps {
    doctors: Doctor[];
    totalCount: number;
    onPageChange: (page: number) => void;
    onSort: (field: string, ascending: boolean) => void;
    currentPage: number;
    pageSize: number;
    isLoading?: boolean;
}

export function DoctorList({
               doctors,
               totalCount,
               onPageChange,
               onSort,
               currentPage,
               pageSize,
               isLoading = false
           }: DoctorListProps) {
    
    const navigate = useNavigate();
    const columns: Column<Doctor>[] = [
        {
            key: 'imageUrl',
            header: '',
            sortable: false,
        },
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
            key: 'specialization',
            header: 'Specialization',
            sortable: true,
        },
        {
            key: 'email',
            header: ' Email',
            sortable: false,
        },
        {
            key: 'isAvailable',
            header: 'Status',
            sortable: false,
            render: (doctor) => (
                <Badge
                    variant={doctor.isAvailable ? 'success' : 'error'}
                >
                    {doctor.isAvailable ? 'Available' : 'Unavailable'}
                </Badge>
            ),
        },
        {
            key: 'createdAt',
            header: 'Created At',
            sortable: true,
            render: (doctor) => format(new Date(doctor.createdAt), 'PPp'),
        },
    ];

    const handleRowClick = (doctor: Doctor) => {
        navigate(`/doctorProfile/${doctor.id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-slab mb-2">Doctors</h1>
            <Table
                data={doctors}
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