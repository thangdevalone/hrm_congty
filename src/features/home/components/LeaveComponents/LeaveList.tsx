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

import { adminApi } from '@/api/adminApi';
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
import { LeaveUser } from '@/models';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';

const columns: ColumnDef<LeaveUser>[] = [
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
    // {
    //     accessorKey: 'EmpID',
    //     header: 'ID',
    //     cell: ({ row }) => <div className="capitalize">{row.getValue('EmpID')}</div>,
    // },
    {
        accessorKey: 'EmpName',
        header: 'Tên nhân viên',
        cell: ({ row }) => <div className="">{row.getValue('EmpName')}</div>,
    },
    {
        accessorKey: 'Email',
        header: 'Email',
        cell: ({ row }) => <div className="">{row.getValue('Email')}</div>,
    },
    {
        accessorKey: 'LeaveStartDate',
        header: () => 'Ngày bắt đầu nghỉ',
        cell: ({ row }) => (
            <div className="capitalize">
                {dayjs(row.getValue('LeaveStartDate')).format('M/D/YYYY')}
            </div>
        ),
    },
    {
        accessorKey: 'LeaveEndDate',
        header: () => 'Ngày đi làm trở lại',
        cell: ({ row }) => (
            <div className="capitalize">
                {dayjs(row.getValue('LeaveEndDate')).format('M/D/YYYY')}
            </div>
        ),
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
    const [data, setData] = React.useState<LeaveUser[]>([]);

    React.useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await adminApi.getListLeave();
                if (response.status) {
                    setData(response.data);
                }
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, []);

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
                        // value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
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
                            <TableHeader className="sticky top-0 z-[2] bg-[hsl(var(--secondary))]">
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
