import { DataTablePagination, DataTableViewOptions } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CaretSortIcon, DotsHorizontalIcon, PlusCircledIcon } from '@radix-ui/react-icons';
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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InforAccount } from '@/models';
import * as yup from 'yup';
import { DialogTrigger } from '@radix-ui/react-dialog';
const data: InforAccount[] = [];

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<InforAccount>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                className="ml-2"
                onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="ml-2"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'username',
        header: 'Tên tài khoản',
        cell: ({ row }) => <div className="capitalize">{row.getValue('username')}</div>,
    },
    {
        accessorKey: 'password',
        header: 'Mật khẩu',
        cell: ({ row }) => <div className="lowercase">{row.getValue('password')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function Accounts() {
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
    const schema_create = yup.object().shape({
        name: yup.string().required('Cần nhập tên người dùng'),
        job: yup.string().required('Cần nhập job người dùng'),
        employmentStatus: yup.string().required('Cần nhập chức vụ'),
        salary: yup.number().required('Cần nhập lương cho nhân viên'),
        position: yup.string().required('Cần nhập chức vụ cho nhân viên'),
    });
    const formCreate = useForm<InforAccount>({
        resolver: yupResolver(schema_create),
    });
    const handleCreate: SubmitHandler<InforAccount> = (data) => {
        console.log(data);
    };
    return (
        <div className="w-full space-y-4">
            <div className="flex items-center">
                <div className="flex flex-row gap-4">
                    <Input
                        placeholder="Tìm kiếm trên bảng..."
                        value={''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            table.getColumn('email')?.setFilterValue(event.target.value)
                        }
                    />
                    <Button className="btn flex gap-2" variant="outline">
                        <Icons.filter />
                        Lọc
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="btn flex gap-2" variant="default">
                                <PlusCircledIcon />
                                Tạo mới
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className="">
                                <DialogTitle className="mb-2">Tạo mới tài khoản</DialogTitle>
                            </DialogHeader>
                            <Form {...formCreate}>
                                <form onSubmit={formCreate.handleSubmit(handleCreate)}>
                                    <div className="grid grid-cols-2 gap-3 ">
                                        <FormField
                                            defaultValue=""
                                            control={formCreate.control}
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
                                            defaultValue=""
                                            control={formCreate.control}
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
                                            control={formCreate.control}
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
                                            control={formCreate.control}
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
                                            control={formCreate.control}
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
                                    </div>
                                    <DialogFooter className="w-full mt-2">
                                        <Button type="submit">Lưu</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <ScrollArea style={{ height: 'calc(100vh - 260px)' }} className=" relative w-full">
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
    );
}
