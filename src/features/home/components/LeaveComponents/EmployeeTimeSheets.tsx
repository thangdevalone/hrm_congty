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
export interface Columns {
    id: string;
    name: string;
    PipelineStatus: string;
    date: Date;
}

const data: Columns[] = [
    {
        id: 'ID-1',
        name: 'Name-1',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-2',
        name: 'Name-2',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-3',
        name: 'Name-3',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-4',
        name: 'Name-4',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-5',
        name: 'Name-5',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-6',
        name: 'Name-6',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-7',
        name: 'Name-7',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-8',
        name: 'Name-8',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-9',
        name: 'Name-9',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
    {
        id: 'ID-10',
        name: 'Name-10',
        PipelineStatus: 'Success',
        date: new Date('2023-12-08T08:57:27.930Z'),
    },
];

const columns: ColumnDef<Columns>[] = [
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
        accessorKey: 'PipelineStatus',
        header: () => 'Pipeline Status',
        cell: ({ row }) => (
            <div className="capitalize bg-green-400 w-fit px-5 py-1 rounded-sm text-white">
                {row.getValue('PipelineStatus')}
            </div>
        ),
    },
    {
        accessorKey: 'date',
        header: () => 'Date',
        cell: ({ row }) => (
            <div className="capitalize"> {moment(row.getValue('date')).format('DD-MM-YYYY')}</div>
        ),
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
                        <DropdownMenuItem className="cursor-pointer">
                            Update Pipeline Status
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function EmployeeTimeSheets() {
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
}
