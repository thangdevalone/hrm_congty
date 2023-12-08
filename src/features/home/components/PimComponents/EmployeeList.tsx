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
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { DialogTrigger } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
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
        name: 'Nguyễn Quang Tiến',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '003',
        name: 'Nguyễn Quang Tuấn Anh',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '004',
        name: 'Nguyễn Quang Thưởng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '005',
        name: 'Nguyễn Quang Bich',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '006',
        name: 'Nguyễn Quang Quỳnh',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '007',
        name: 'Nguyễn Quang Nghị',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '008',
        name: 'Nguyễn Quang Giang',
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
                        <DropdownMenuItem className="cursor-pointer">Delete User</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
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
    const handleSubmit: SubmitHandler<EditUser> = (data) => {
        console.log(data);
    };
    return (
        <>
            <div className="w-full space-y-4">
                <div className="flex items-center">
                    <Input placeholder="Filter name..." className="max-w-sm" />
                    <DataTableViewOptions table={table} />
                </div>
                <div className="rounded-md border">
                    <Table className="overflow-y-auto">
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
                                    <Dialog key={row.id}>
                                        <DialogContent className=" border-black/70">
                                            <DialogHeader className="">
                                                <DialogTitle>
                                                    Edit User ID: {row.original.id}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    <Form {...form}>
                                                        <form
                                                            className="grid grid-cols-2 gap-3 "
                                                            onSubmit={form.handleSubmit(
                                                                handleSubmit
                                                            )}
                                                        >
                                                            <FormField
                                                                defaultValue={row.original.name}
                                                                control={form.control}
                                                                name="name"
                                                                render={({ field }) => (
                                                                    <FormItem className="">
                                                                        <FormLabel className="text-black">
                                                                            Name
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Enter name"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                defaultValue={
                                                                    row.original.employmentStatus
                                                                }
                                                                control={form.control}
                                                                name="employmentStatus"
                                                                render={({ field }) => (
                                                                    <FormItem className="">
                                                                        <FormLabel className="text-black">
                                                                            Employment Status
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Enter Employment Status"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                defaultValue={row.original.job}
                                                                control={form.control}
                                                                name="job"
                                                                render={({ field }) => (
                                                                    <FormItem className="">
                                                                        <FormLabel className="text-black">
                                                                            Job Title
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Enter Job Title"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                defaultValue={row.original.position}
                                                                control={form.control}
                                                                name="position"
                                                                render={({ field }) => (
                                                                    <FormItem className="">
                                                                        <FormLabel className="text-black">
                                                                            Position
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Enter Position"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                defaultValue={row.original.salary}
                                                                control={form.control}
                                                                name="salary"
                                                                render={({ field }) => (
                                                                    <FormItem className="">
                                                                        <FormLabel className="text-black">
                                                                            Salary
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="Enter Salary"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <div className="grid gap-4 py-4"></div>
                                                            <DialogFooter className=""></DialogFooter>
                                                            <DialogFooter className="">
                                                                <Button type="submit">Save</Button>
                                                            </DialogFooter>
                                                        </form>
                                                    </Form>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                        <TableRow data-state={row.getIsSelected() && 'selected'}>
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
