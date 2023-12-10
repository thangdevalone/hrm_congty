/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { DataTableViewOptions } from '@/components/common';
import { DataTablePagination } from '@/components/common/DataTablePagination';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import moment from 'moment';

const data = [
    {
        id: '001',
        name: 'Nguyễn Quang Thắng',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '002',
        name: 'Nguyễn Quang Tiến',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '003',
        name: 'Nguyễn Quang Tuấn Anh',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '004',
        name: 'Nguyễn Quang Thưởng',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '005',
        name: 'Nguyễn Quang Bich',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '006',
        name: 'Nguyễn Quang Quỳnh',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '007',
        name: 'Nguyễn Quang Nghị',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '008',
        name: 'Nguyễn Quang Giang',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '009',
        name: 'Nguyễn Quang Thắng',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '010',
        name: 'Nguyễn Quang Thắng',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
    {
        id: '011',
        name: 'Nguyễn Quang Thắng',
        startDate: new Date('2023-12-08T08:57:27.930Z'),
        job: 'Nhân viên kỹ thuật',
        employmentStatus: 'Full-time',
        position: 'Intern',
        status: false,
    },
];

interface Props {
    id: string;
    name: string;
    startDate: Date;
    job: string;
    employmentStatus: string;
    position: string;
    status: boolean;
}

const columns: ColumnDef<Props>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                className="ml-1 "
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="ml-1 "
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: ({ row }) => (
            <div className="capitalize">
                {moment(row.getValue('startDate')).format('DD-MM-YYYY')}
            </div>
        ),
    },
    {
        accessorKey: 'job',
        header: () => 'Job',
        cell: ({ row }) => <div className="capitalize">{row.getValue('job')}</div>,
    },
    {
        accessorKey: 'employmentStatus',
        header: () => 'Employment Status',
        cell: ({ row }) => <div className="capitalize">{row.getValue('employmentStatus')}</div>,
    },
    {
        accessorKey: 'position',
        header: () => 'Position',
        cell: ({ row }) => <div className="capitalize">{row.getValue('position')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                            Update Status
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const LeaveList = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return (
        <>
            <div className="w-full space-y-4">
                <div className="flex items-center">
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) =>
                            table.getColumn('email')?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DataTableViewOptions table={table} />
                </div>
                <div className="rounded-md border">
                    <ScrollArea
                        style={{ height: 'calc(100vh - 220px)' }}
                        className=" relative w-full overflow-auto"
                    >
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && 'selected'}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
                <DataTablePagination table={table} />
            </div>
        </>
    );
};
