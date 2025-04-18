import React, {useState} from 'react';
import {ChevronDown, ChevronUp, ChevronsUpDown} from 'lucide-react';
import {cn} from '../../utils/cn';
import {Pagination} from "./Pagination.tsx";
import {Loading} from "./Loading.tsx";

export interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    className?: string;
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    rowClassName?: string;
    className?: string;
    pageSize?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    totalItems?: number;
    isLoading?: boolean;
    emptyMessage?: string;
    sortable?: boolean;
    onSort?: (field: string, ascending: boolean) => void;
}

type SortDirection = 'asc' | 'desc' | null;

export function Table<T>({
                             data,
                             columns,
                             onRowClick,
                             rowClassName,
                             className,
                             pageSize = 10,
                             currentPage = 1,
                             onPageChange,
                             totalItems,
                             isLoading = false,
                             emptyMessage = 'No data available',
                             sortable = true,
                             onSort,
                         }: TableProps<T>) {
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: SortDirection;
    }>({key: '', direction: null});

    const handleSort = (key: string) => {
        if (!sortable || !onSort) return;

        setSortConfig(current => {
            const newDirection =
                current.key === key ? current.direction === 'asc' ? 'desc'
                        : current.direction === 'desc' ? null : 'asc'
                    : 'asc';

            if (newDirection !== null) {
                onSort(key, newDirection === 'asc');
            }

            return {
                key,
                direction: newDirection,
            };
        });
    };

    const totalPages = totalItems
        ? Math.ceil(totalItems / pageSize)
        : Math.ceil(data.length / pageSize);

    const paginatedData = totalItems
        ? data
        : data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const getSortIcon = (column: Column<T>) => {
        if (!sortable || !column.sortable) return null;

        if (sortConfig.key === column.key) {
            return sortConfig.direction === 'asc' ? (
                <ChevronUp className="w-6 h-6 text-basic "/>
            ) : sortConfig.direction === 'desc' ? (
                <ChevronDown className="w-6 h-6 text-basic "/>
            ) : (
                <ChevronsUpDown className="w-4 h-4 text-gray-400"/>
            );
        }
        return <ChevronsUpDown className="w-4 h-4 text-gray-400"/>;
    };

    if (isLoading)  return <Loading /> ;

    return (
        <div className="w-full font-slab ">
            <div className="overflow-x-auto ">
                <table className={cn('min-w-full', className)}>
                    <thead className="bg-gray-200">
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.key}
                                onClick={() => column.sortable && handleSort(column.key)}
                                className={cn(
                                    'px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                    column.sortable && 'cursor-pointer hover:bg-gray-100',
                                    column.className
                                )}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{column.header}</span>
                                    {column.sortable && getSortIcon(column)}
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => (
                            <tr
                                key={index}
                                onClick={() => onRowClick?.(item)}
                                className={cn(
                                    'hover:bg-gray-50',
                                    onRowClick && 'cursor-pointer',
                                    rowClassName
                                )}
                            >
                                {columns.map(column => (
                                    <td
                                        key={column.key}
                                        className={cn('px-6 py-4 whitespace-nowrap', column.className)}
                                    >
                                        {column.key === "imageUrl" ? (
                                            <img className="h-12 w-12 rounded-lg" src={`${(item as any)[column.key]}`}
                                                 alt=""/>
                                        ) : (
                                            <>{column.render ? column.render(item) : (item as any)[column.key]}
                                            </>)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-4 text-center text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-5 bg-white border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Results{' '}
                                <span className="font-medium">
                                  {(currentPage - 1) * pageSize + 1}
                                </span>{' '}
                                to{' '}
                                <span className="font-medium">
                              {Math.min(currentPage * pageSize, totalItems || data.length)}
                            </span>{' '}
                                out of {' '}
                                <span className="font-medium">{totalItems || data.length}</span>
                            </p>
                        </div>
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                </div>
            )}
        </div>
    );
}