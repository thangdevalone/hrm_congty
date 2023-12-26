import { DataTablePagination, DataTableViewOptions } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DotsHorizontalIcon, PlusCircledIcon } from '@radix-ui/react-icons';
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
import authApi from '@/api/authApi';
import { Icons } from '@/components/icons';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { CreateAccount, InfoAccount, User, UserAccount } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Check, ChevronsUpDown } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<UserAccount>[] = [
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
        accessorKey: 'UserID',
        header: 'Tên tài khoản',
        cell: ({ row }) => <div className="capitalize">{row.getValue('UserID')}</div>,
    },
    {
        accessorKey: 'password',
        header: 'Mật khẩu',
        cell: ({ row }) => <div className="lowercase">{row.getValue('password')}</div>,
    },
    // {
    //     id: 'actions',
    //     enableHiding: false,
    //     cell: () => {
    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <DotsHorizontalIcon className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View customer</DropdownMenuItem>
    //                     <DropdownMenuItem>View payment details</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];

export function Accounts() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [listEmployess, setListEmployess] = React.useState<User[]>([]);
    const [listAccount, setListAccount] = React.useState<UserAccount[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const { toast } = useToast();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [empResponse, accResponse] = await Promise.all([
                    await adminApi.getListEmployee(),
                    await adminApi.getUserAccount(),
                ]);
                if (empResponse.status && accResponse.data) {
                    setListAccount(accResponse.data);
                    setListEmployess(empResponse.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const table = useReactTable({
        data: listAccount,
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
        UserID: yup.string().required('Cần nhập tên tài khoản'),
        UserStatus: yup.string().required('Cần nhập trạng thái của nhân viên'),
        password: yup.string().required('Cần nhập mật khẩu'),
        EmpID: yup.string().required('Cần chọn tài khoản cho một nhân viên'),
    });
    const formCreate = useForm<InfoAccount>({
        resolver: yupResolver(schema_create),
    });

    const handleCreateAccount = async (data: InfoAccount) => {
        try {
            const newData = {
                UserID: data.UserID,
                password: data.password,
                UserStatus: Number(data.UserStatus),
                EmpID: Number(data.EmpID),
            };
            const response = await authApi.createAccount(newData as CreateAccount);
            if (response.status === 201) {
                toast({
                    title: 'Tạo thành công !',
                    description: 'Bạn đã tạo thành công cho nhân viên !',
                });
                setTimeout(function () {
                    setOpenDialog(false);
                }, 1000);
            }
        } catch (error) {
            toast({
                title: 'Tạo thất bại !',
                description: 'Có lỗi khi tạo tài khoản cho nhân viên!',
                variant: 'destructive',
            });
            console.log(error);
        }
    };

    const handleCreate: SubmitHandler<InfoAccount> = (data) => {
        handleCreateAccount(data);
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
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
                                            name="UserID"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        Tài khoản đăng nhập
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter UserID"
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
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter Password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={formCreate.control}
                                            name="UserStatus"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        User Status
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger {...field} className="">
                                                                <SelectValue placeholder="Select a status" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>
                                                                        Hãy chọn trạng thái cho tài
                                                                        khoản
                                                                    </SelectLabel>
                                                                    <SelectItem value={'1'}>
                                                                        Activate
                                                                    </SelectItem>
                                                                    <SelectItem value={'0'}>
                                                                        Not Activate
                                                                    </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            defaultValue=""
                                            control={formCreate.control}
                                            name="EmpID"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        EmpID
                                                    </FormLabel>
                                                    <FormControl>
                                                        <FormControl>
                                                            <Popover
                                                                open={open}
                                                                onOpenChange={setOpen}
                                                                {...field}
                                                            >
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        // aria-expanded={open}
                                                                        className="w-full justify-between"
                                                                    >
                                                                        {field.value
                                                                            ? listEmployess.find(
                                                                                  (epl) =>
                                                                                      `${epl.EmpID}` ===
                                                                                      field.value
                                                                              )?.EmpName
                                                                            : 'Select a job...'}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <CommandInput placeholder="Search ..." />
                                                                        <CommandEmpty>
                                                                            No job found.
                                                                        </CommandEmpty>
                                                                        <CommandGroup {...field}>
                                                                            {listEmployess.map(
                                                                                (epl) => (
                                                                                    <CommandItem
                                                                                        key={
                                                                                            epl.EmpID
                                                                                        }
                                                                                        value={`${epl.EmpID}`}
                                                                                        onSelect={(
                                                                                            currentValue
                                                                                        ) => {
                                                                                            formCreate.setValue(
                                                                                                'EmpID',
                                                                                                (field.value =
                                                                                                    currentValue ===
                                                                                                    `${field.value}`
                                                                                                        ? currentValue
                                                                                                        : currentValue)
                                                                                            );
                                                                                            setOpen(
                                                                                                false
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <Check
                                                                                            className={cn(
                                                                                                'mr-2 h-4 w-4',
                                                                                                field.value ===
                                                                                                    `${epl.EmpID}`
                                                                                                    ? 'opacity-100'
                                                                                                    : 'opacity-0'
                                                                                            )}
                                                                                        />
                                                                                        {
                                                                                            epl.EmpName
                                                                                        }
                                                                                    </CommandItem>
                                                                                )
                                                                            )}
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </FormControl>
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
