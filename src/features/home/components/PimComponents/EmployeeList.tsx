import { EditUser } from '@/models/user';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { DataTableViewOptions } from '@/components/common';
import { DataTablePagination } from '@/components/common/DataTablePagination';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { handlePrice } from '@/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DialogTrigger } from '@radix-ui/react-dialog';
const data = [
    {
        id: '001',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '002',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '003',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '004',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '005',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '006',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '007',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '008',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '009',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '010',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '011',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
];

 interface Props {
    id: string;
    name: string;
    job: string;
    employmentStatus: string;
    salary: number;
    position: string;
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
                className="ml-2"
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="ml-2"
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
        accessorKey: 'salary',
        header: () => 'Salary',
        cell: ({ row }) => <div className="capitalize">{handlePrice(row.getValue('salary'))}</div>,
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
                        <Button variant="ghost" className="h-8 p-0">
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                            Delete User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                            <DialogTrigger>Edit User</DialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function EmployeeList() {
    const schema = yup.object().shape({
        name: yup.string().required('Cần nhập tên người dùng'),
        job: yup.string().required('Cần nhập job người dùng'),
        employmentStatus: yup.string().required('Cần nhập chức vụ'),
        salary: yup.number().required('Cần nhập lương cho nhân viên'),
        position: yup.string().required('Cần nhập chức vụ cho nhân viên'),
    });
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

    const form = useForm<EditUser>({
        resolver: yupResolver(schema),
    });

    const handleOPenDialog = (idUser: string): void => {};

    return (
        <>
            <div className="w-full space-y-4">
                <div className="flex items-center">
                    <Input
                        placeholder="Filter name..."
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={(event) =>
                            table.getColumn('name')?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DataTableViewOptions table={table} />
                </div>
                <div className="rounded-md border">
                    <Table className='overflow-y-auto'>
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
                        <TableBody >
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <Dialog>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit profile</DialogTitle>
                                                <DialogDescription>
                                                    Make changes to your profile here. Click save
                                                    when you're done.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4"></div>
                                            <DialogFooter>
                                                <Button type="submit">Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
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
                                    </Dialog>
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
                </div>
                <DataTablePagination table={table} />
            </div>
        </>
    );
}
