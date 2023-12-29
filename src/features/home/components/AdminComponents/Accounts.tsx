import { DataTablePagination, DataTableViewOptions } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DotsHorizontalIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import {
    ColumnDef,
    ColumnFiltersState,
    Row,
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
import { Badge } from '@/components/ui/badge';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem
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
    DropdownMenuTrigger
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
import { InputPassword } from '@/components/ui/inputPassword';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SearchSelection } from '@/components/ui/searchSelection';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
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
import { CreateAccount, InfoAccount, ListAccount } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Check, ChevronsUpDown } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

// eslint-disable-next-line react-refresh/only-export-components

export function Accounts() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [listAccount, setListAccount] = React.useState<InfoAccount[]>([]);
    const [listEmployees, setListEmployees] = React.useState<ListAccount[]>([]);
    const [open, setOpen] = React.useState<boolean>(false);
    const [chooseEmp, setChooseEmp] = React.useState<string>("");
    const [editEmp, setEditEmp] = React.useState<string>("");
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [searchEmp, setSearchEmp] = React.useState<string>('');
    const { toast } = useToast();
  
    const columns: ColumnDef<InfoAccount>[] = [
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
            header: 'Tên đăng nhập',
            cell: ({ row }) => <div>{row.getValue('UserID')}</div>,
        },
        {
            accessorKey: 'password',
            header: 'Mật khẩu',
            cell: ({ row }) => <div>{row.getValue('password')}</div>,
        },
 
        {
            accessorKey: 'EmpName',
            header: 'Thuộc về',
            cell: ({ row }) => <div>{row.getValue('EmpName')}</div>,
        },
        {
            accessorKey: 'UserStatus',
            header: 'Trạng thái',
            cell: ({ row }) => (
                <Badge className={`${row.getValue('UserStatus') == 1 ? 'bg-[green]' : 'bg-[red]'}`}>
                    {row.getValue('UserStatus') == 1 ? 'Hoạt động' : 'Ngưng hoạt động'}
                </Badge>
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
                                Delete User
                            </DropdownMenuItem>
                                <DialogTrigger
                                    onClick={() => setDataEdit(row)}
                                    className="w-full"
                                >
                                    <DropdownMenuItem className="cursor-pointer">
                                        Edit User
                                    </DropdownMenuItem>
                                </DialogTrigger>
                               
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [empResponse, accResponse] = await Promise.all([
                    await adminApi.getListAccount(),
                    await adminApi.getUserAccount(),
                ]);
                if (empResponse.status && accResponse.data) {
                    setListAccount(accResponse.data);
                    setListEmployees(empResponse.data);
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
    const setDataEdit=(data:Row<InfoAccount>)=>{
        // formEdit.setValue("EmpID",EmpID)
        formEdit.setValue("UserID",data.original.UserID)
        formEdit.setValue("UserStatus",`${Boolean(data.original.UserStatus)===true?"1":"0"}`)
        formEdit.setValue("password",data.original.password)
        formEdit.setValue("EmpID",data.original.EmpID)
        setEditEmp(data.getValue("EmpName"))
    }

    const schema_create = yup.object().shape({
        UserID: yup.string().required('Cần nhập tên tài khoản'),
        UserStatus: yup.string().required('Cần nhập trạng thái của nhân viên'),
        password: yup.string().required('Cần nhập mật khẩu'),
        EmpID: yup.string().required('Cần chọn tài khoản cho một nhân viên'),
    });
    const formCreate = useForm<InfoAccount>({
        resolver: yupResolver(schema_create),
    });
    const formEdit = useForm<InfoAccount>({
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
                description: 'Nhân viên đã có tài khoản!',
                variant: 'destructive',
            });
        }
    };
    const handleEditAccount = async (data: InfoAccount) => {
        alert("Chưa có api")
    };
    const handleSearchEmp = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchEmp(e.target.value);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await adminApi.getListAccount({ query: e.target.value });
        setListEmployees(data.data);
    };
    const handleCreate: SubmitHandler<InfoAccount> = (data) => {
        handleCreateAccount(data);
    };
    const handleEdit: SubmitHandler<InfoAccount> = (data) => {
        handleEditAccount(data);
    };
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
                                                        Tên đăng nhập
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập tên đăng nhập"
                                                            autoComplete="true"
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
                                                        Mật khẩu
                                                    </FormLabel>
                                                    <FormControl>
                                                        <InputPassword
                                                            placeholder="Nhập mật khẩu"
                                                            autoComplete="true"
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
                                                        Trạng thái
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger {...field} className="">
                                                                <SelectValue placeholder="Chọn trạng thái" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value={'1'}>
                                                                        <Badge className="bg-[green]">
                                                                            Hoạt động
                                                                        </Badge>
                                                                    </SelectItem>
                                                                    <SelectItem value={'0'}>
                                                                        <Badge className="bg-[red]">
                                                                            Ngưng hoạt động
                                                                        </Badge>
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
                                            control={formCreate.control}
                                            name="EmpID"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        Nhân viên
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
                                                                        className="w-full justify-between"
                                                                    >
                                                                        {chooseEmp
                                                                            ? chooseEmp
                                                                            : 'Chọn nhân viên'}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[200px] p-0">
                                                                    <Command>
                                                                        <SearchSelection
                                                                            value={searchEmp}
                                                                            onChange={
                                                                                handleSearchEmp
                                                                            }
                                                                            placeholder="Search ..."
                                                                        />
                                                                        <ScrollArea className=" max-h-[200px]">
                                                                            {listEmployees.length >
                                                                            0 ? (
                                                                                <CommandGroup
                                                                                    {...field}
                                                                                >
                                                                                    {listEmployees.map(
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
                                                                                                        currentValue
                                                                                                    );
                                                                                                    setChooseEmp(
                                                                                                        epl.EmpName
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
                                                                                                            String(
                                                                                                                epl.EmpID
                                                                                                            )
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
                                                                            ) : (
                                                                                <CommandEmpty>
                                                                                    Không tìm thấy
                                                                                    nhân viên
                                                                                </CommandEmpty>
                                                                            )}
                                                                        </ScrollArea>
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
                                    <DialogFooter className="w-full mt-4">
                                        <Button type="submit">Lưu</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </div>
                    <DataTableViewOptions table={table} />
                </div>
                <div className="rounded-md border">
                    <ScrollArea
                        style={{ height: 'calc(100vh - 260px)' }}
                        className=" relative w-full"
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
                                <Dialog>
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
                                 <DialogContent>
                                    <DialogHeader className="">
                                        <DialogTitle className="mb-2">
                                            Sửa mới tài khoản
                                        </DialogTitle>
                                    </DialogHeader>
                                    <Form {...formEdit}>
                                        <form onSubmit={formEdit.handleSubmit(handleEdit)}>
                                            <div className="grid grid-cols-2 gap-3 ">
                                                <FormField
                                                    control={formEdit.control}
                                                    name="UserID"
                                                    render={({ field }) => {
                                             
                                                        return (
                                                            <FormItem className="">
                                                                <FormLabel className="text-black">
                                                                    Tên đăng nhập
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                    
                                                                        placeholder="Nhập tên đăng nhập"
                                                                        autoComplete="true"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                                <FormField
                                                    control={formEdit.control}
                                                    name="password"
                                                    disabled
                                                    render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormLabel className="text-black">
                                                                Mật khẩu
                                                            </FormLabel>
                                                            <FormControl>
                                                                <InputPassword
                                                                    
                                                                    placeholder="Nhập mật khẩu"
                                                                    autoComplete="true"
                                                                    {...field}
                                                                    
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={formEdit.control}
                                                    name="UserStatus"
                                                    render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormLabel className="text-black">
                                                                Trạng thái
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    value={field.value}
                                                                >
                                                                    <SelectTrigger
                                                                        {...field}
                                                                    
                                                                    >
                                                                        <SelectValue placeholder="Chọn trạng thái" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectItem value={'1'}>
                                                                                <Badge className="bg-[green]">
                                                                                    Hoạt động
                                                                                </Badge>
                                                                            </SelectItem>
                                                                            <SelectItem value={'0'}>
                                                                                <Badge className="bg-[red]">
                                                                                    Ngưng hoạt động
                                                                                </Badge>
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
                                                    control={formEdit.control}
                                                    name="EmpID"
                                                    render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormLabel className="text-black">
                                                                Nhân viên
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
                                                                                className="w-full justify-between"
                                                                            >
                                                                                {editEmp
                                                                                    ? editEmp
                                                                                    : 'Chọn nhân viên'}
                                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                            </Button>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent className="w-[200px] p-0">
                                                                            <Command>
                                                                                <SearchSelection
                                                                                    value={
                                                                                        searchEmp
                                                                                    }
                                                                                    onChange={
                                                                                        handleSearchEmp
                                                                                    }
                                                                                    placeholder="Search ..."
                                                                                />
                                                                                <ScrollArea className=" max-h-[200px]">
                                                                                    {listEmployees.length >
                                                                                    0 ? (
                                                                                        <CommandGroup
                                                                                            {...field}
                                                                                        >
                                                                                            {listEmployees.map(
                                                                                                (
                                                                                                    epl
                                                                                                ) => (
                                                                                                    <CommandItem
                                                                                                        key={
                                                                                                            epl.EmpID
                                                                                                        }
                                                                                                        value={`${epl.EmpID}`}
                                                                                                        onSelect={(
                                                                                                            currentValue
                                                                                                        ) => {
                                                                                                            formEdit.setValue(
                                                                                                                'EmpID',
                                                                                                                currentValue
                                                                                                            );
                                                                                                            setEditEmp(
                                                                                                                epl.EmpName
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
                                                                                                                    String(
                                                                                                                        epl.EmpID
                                                                                                                    )
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
                                                                                    ) : (
                                                                                        <CommandEmpty>
                                                                                            Không
                                                                                            tìm thấy
                                                                                            nhân
                                                                                            viên
                                                                                        </CommandEmpty>
                                                                                    )}
                                                                                </ScrollArea>
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
                                            <DialogFooter className="w-full mt-4">
                                                <Button type="submit">Lưu</Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                         
                                </Dialog>
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
                <DataTablePagination table={table} />
            </div>
        </Dialog>
    );
}
