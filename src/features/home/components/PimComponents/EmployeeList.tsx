/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { adminApi } from '@/api/adminApi';
import { DataTableViewOptions } from '@/components/common';
import { DataTablePagination } from '@/components/common/DataTablePagination';
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
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
import { CreateEmloyess, InfoAccount, InfoDepartment, InfoJob, InforUser } from '@/models';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import authApi from '@/api/authApi';
import { useToast } from '@/components/ui/use-toast';

export function EmployeeList() {
    const columns: ColumnDef<CreateEmloyess>[] = [
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
            accessorKey: 'JobName',
            header: () => 'Job',
            cell: ({ row }) => <div className="">{row.getValue('JobName')}</div>,
        },
        {
            accessorKey: 'DepName',
            header: () => 'Phòng ban',
            cell: ({ row }) => <div className="">{row.getValue('DepName')}</div>,
        },
        {
            accessorKey: 'EmpStatus',
            header: () => 'Trạng thái',
            // cell: ({ row }) => <div className="">{row.getValue('EmpStatus') ? '123' : 'abc'}</div>,
            cell: ({ row }) => (
                <Badge className={`${row.getValue('EmpStatus') == 1 ? 'bg-[green]' : 'bg-[red]'}`}>
                    {row.getValue('EmpStatus') == 1 ? 'Hoạt động' : 'Ngưng hoạt động'}
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
                            <DialogTrigger onClick={() => setDataEdit(row)} className="w-full">
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
    const [data, setData] = React.useState<CreateEmloyess[]>([]);
    const [listJob, setListJob] = React.useState<InfoJob[]>([]);
    const [listDepartment, setListDepartment] = React.useState<InfoDepartment[]>([]);
    const [openJob, setOpenJob] = React.useState<boolean>(false);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const { toast } = useToast();
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

    const setDataEdit = (data: Row<CreateEmloyess>) => {
        formEdit.setValue('EmpName', data.original.EmpName);
        formEdit.setValue(
            'employmentStatus',
            `${Boolean(data.original.employmentStatus) === true ? '1' : '0'}`
        );
        formEdit.setValue('job', data.original.job);
        formEdit.setValue('department', data.original.department);
    };
    const schema = yup.object().shape({
        EmpName: yup.string().required('Cần nhập tên người dùng'),
        job: yup.string().required('Cần nhập job người dùng'),
        employmentStatus: yup.string().required('Cần chọn chức vụ'),
        department: yup.string().required('Cần chọn phòng ban'),
    });
    const form = useForm<CreateEmloyess>({
        resolver: yupResolver(schema),
    });

    const createEmployee = async (data: CreateEmloyess) => {
        const newData: unknown = {
            EmpName: data.EmpName,
            depStatus: data.employmentStatus === 'hoạt động' ? 1 : 0,
            JobID: Number(data.job),
            DepID: Number(data.department),
        };
        const response = await authApi.createEmployee(newData as CreateEmloyess);
        if (!response.status) {
            toast({
                title: 'Tạo thất bại !',
                description: 'Có lỗi khi tạo !',
                variant: 'destructive',
            });
        } else {
            toast({
                title: 'Tạo thành công !',
                description: 'Tạo thành công nhân viên!',
                variant: 'destructive',
            });
        }
    };

    const editEmployee = async (data: CreateEmloyess) => {
        console.log(data);
    };

    const schemaEdit = yup.object().shape({
        EmpName: yup.string().required('Cần nhập tên người dùng'),
        job: yup.string().required('Cần nhập job người dùng'),
        employmentStatus: yup.string().required('Cần chọn chức vụ'),
        department: yup.string().required('Cần chọn phòng ban'),
    });
    const formEdit = useForm<CreateEmloyess>({
        resolver: yupResolver(schemaEdit),
    });

    const handleSubmit: SubmitHandler<CreateEmloyess> = (data) => {
        createEmployee(data);
    };

    const handleEditEmp: SubmitHandler<CreateEmloyess> = (data) => {
        editEmployee(data);
    };

    React.useEffect(() => {
        try {
            const fetchData = async () => {
                const [empResponse, jobResponse, departmentResponse] = await Promise.all([
                    adminApi.getListEmployee(),
                    adminApi.getJob(),
                    adminApi.getDepartment(),
                ]);
                if (empResponse.status && jobResponse.status && departmentResponse.status) {
                    setData(empResponse.data);
                    setListJob(jobResponse.data);
                    setListDepartment(departmentResponse.data);
                }
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <div className="w-full space-y-4">
                <div className="flex items-center gap-4">
                    <Input placeholder="Filter name..." className="max-w-sm" />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="btn flex gap-2" variant="default">
                                <PlusCircledIcon />
                                Tạo mới
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className="">
                                <DialogTitle className="mb-2">
                                    Tạo mới thông tin nhân viên
                                </DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)}>
                                    <div className="grid grid-cols-2 gap-3 ">
                                        <FormField
                                            defaultValue=""
                                            control={form.control}
                                            name="EmpName"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        Tên nhân viên
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
                                            defaultValue="0"
                                            control={form.control}
                                            name="employmentStatus"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        Trạng thái nhân viên
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            defaultValue="1"
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger {...field} className="">
                                                                <SelectValue placeholder="Select a fruit" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="1">
                                                                        Hoạt động
                                                                    </SelectItem>
                                                                    <SelectItem value="0">
                                                                        Ngừng hoạt động
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
                                            control={form.control}
                                            name="job"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        Job Title
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Popover
                                                            open={openJob}
                                                            onOpenChange={setOpenJob}
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
                                                                        ? listJob.find(
                                                                              (job) =>
                                                                                  `${job.JobID}` ===
                                                                                  field.value
                                                                          )?.JobName
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
                                                                        {listJob.map((job) => (
                                                                            <CommandItem
                                                                                key={job.JobID}
                                                                                value={`${job.JobID}`}
                                                                                onSelect={(
                                                                                    currentValue
                                                                                ) => {
                                                                                    form.setValue(
                                                                                        'job',
                                                                                        (field.value =
                                                                                            currentValue ===
                                                                                            `${field.value}`
                                                                                                ? currentValue
                                                                                                : currentValue)
                                                                                    );
                                                                                    setOpenJob(
                                                                                        false
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        field.value ===
                                                                                            `${job.JobID}`
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0'
                                                                                    )}
                                                                                />
                                                                                {job.JobName}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="department"
                                            render={({ field }) => (
                                                <FormItem className="">
                                                    <FormLabel className="text-black">
                                                        Phòng ban
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger {...field} className="">
                                                                <SelectValue placeholder="Select a fruit" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {listDepartment.map(
                                                                        (department, index) => (
                                                                            <SelectItem
                                                                                value={`${department.DepID}`}
                                                                                key={index}
                                                                            >
                                                                                {department.DepName}
                                                                            </SelectItem>
                                                                        )
                                                                    )}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
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
                                        <Dialog key={row.id}>
                                            <DialogContent>
                                                <DialogHeader className="">
                                                    <DialogTitle className="mb-2">
                                                        Sửa mới thông tin nhân viên
                                                    </DialogTitle>
                                                    <DialogDescription></DialogDescription>
                                                </DialogHeader>
                                                <Form {...formEdit}>
                                                    <form
                                                        className="grid grid-cols-2 gap-3 "
                                                        onSubmit={formEdit.handleSubmit(
                                                            handleEditEmp
                                                        )}
                                                    >
                                                        <FormField
                                                            defaultValue={row.original.EmpName}
                                                            control={formEdit.control}
                                                            name="EmpName"
                                                            render={({ field }) => (
                                                                <FormItem className="">
                                                                    <FormLabel className="text-black">
                                                                        Tên nhân viên
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            defaultValue={
                                                                                field.name
                                                                            }
                                                                            placeholder="Enter name"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={formEdit.control}
                                                            name="employmentStatus"
                                                            render={({ field }) => (
                                                                <FormItem className="">
                                                                    <FormLabel className="text-black">
                                                                        Trạng thái
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Select
                                                                            onValueChange={
                                                                                field.onChange
                                                                            }
                                                                            value={field.value}
                                                                        >
                                                                            <SelectTrigger
                                                                                {...field}
                                                                                className=""
                                                                            >
                                                                                <SelectValue placeholder="Chọn trạng thái" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectGroup>
                                                                                    <SelectItem
                                                                                        value={'1'}
                                                                                    >
                                                                                        <Badge className="bg-[green]">
                                                                                            Hoạt
                                                                                            động
                                                                                        </Badge>
                                                                                    </SelectItem>
                                                                                    <SelectItem
                                                                                        value={'0'}
                                                                                    >
                                                                                        <Badge className="bg-[red]">
                                                                                            Ngưng
                                                                                            hoạt
                                                                                            động
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
                                                        {/* <FormField
                                                            control={formEdit.control}
                                                            name="job"
                                                            render={({ field }) => (
                                                                <FormItem className="">
                                                                    <FormLabel className="text-black">
                                                                        Job Title
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Popover
                                                                            open={openJob}
                                                                            onOpenChange={
                                                                                setOpenJob
                                                                            }
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
                                                                                        ? listJob.find(
                                                                                              (
                                                                                                  job
                                                                                              ) =>
                                                                                                  `${job.JobID}` ===
                                                                                                  field.value
                                                                                          )?.JobName
                                                                                        : 'Select a job...'}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-[200px] p-0">
                                                                                <Command>
                                                                                    <CommandInput placeholder="Search ..." />
                                                                                    <CommandEmpty>
                                                                                        No job
                                                                                        found.
                                                                                    </CommandEmpty>
                                                                                    <CommandGroup
                                                                                        {...field}
                                                                                    >
                                                                                        {listJob.map(
                                                                                            (
                                                                                                job
                                                                                            ) => (
                                                                                                <CommandItem
                                                                                                    key={
                                                                                                        job.JobID
                                                                                                    }
                                                                                                    value={`${job.JobID}`}
                                                                                                    onSelect={(
                                                                                                        currentValue
                                                                                                    ) => {
                                                                                                        form.setValue(
                                                                                                            'job',
                                                                                                            (field.value =
                                                                                                                currentValue ===
                                                                                                                `${field.value}`
                                                                                                                    ? currentValue
                                                                                                                    : currentValue)
                                                                                                        );
                                                                                                        setOpenJob(
                                                                                                            false
                                                                                                        );
                                                                                                    }}
                                                                                                >
                                                                                                    <Check
                                                                                                        className={cn(
                                                                                                            'mr-2 h-4 w-4',
                                                                                                            field.value ===
                                                                                                                `${job.JobID}`
                                                                                                                ? 'opacity-100'
                                                                                                                : 'opacity-0'
                                                                                                        )}
                                                                                                    />
                                                                                                    {
                                                                                                        job.JobName
                                                                                                    }
                                                                                                </CommandItem>
                                                                                            )
                                                                                        )}
                                                                                    </CommandGroup>
                                                                                </Command>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        /> */}
                                                        <FormField
                                                            control={formEdit.control}
                                                            name="job"
                                                            render={({ field }) => (
                                                                <FormItem className="">
                                                                    <FormLabel className="text-black">
                                                                        Job
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Select
                                                                            onValueChange={
                                                                                field.onChange
                                                                            }
                                                                            value={field.value}
                                                                        >
                                                                            <SelectTrigger
                                                                                {...field}
                                                                                className=""
                                                                            >
                                                                                <SelectValue placeholder="Select a fruit" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectGroup>
                                                                                    {listJob.map(
                                                                                        (
                                                                                            job,
                                                                                            index
                                                                                        ) => (
                                                                                            <SelectItem
                                                                                                value={`${job.JobID}`}
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    job.JobName
                                                                                                }
                                                                                            </SelectItem>
                                                                                        )
                                                                                    )}
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
                                                            name="department"
                                                            render={({ field }) => (
                                                                <FormItem className="">
                                                                    <FormLabel className="text-black">
                                                                        Phòng ban
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Select
                                                                            onValueChange={
                                                                                field.onChange
                                                                            }
                                                                            value={field.value}
                                                                        >
                                                                            <SelectTrigger
                                                                                {...field}
                                                                                className=""
                                                                            >
                                                                                <SelectValue placeholder="Select a fruit" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectGroup>
                                                                                    {listDepartment.map(
                                                                                        (
                                                                                            department,
                                                                                            index
                                                                                        ) => (
                                                                                            <SelectItem
                                                                                                value={`${department.DepID}`}
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    department.DepName
                                                                                                }
                                                                                            </SelectItem>
                                                                                        )
                                                                                    )}
                                                                                </SelectGroup>
                                                                            </SelectContent>
                                                                        </Select>
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
                                            </DialogContent>
                                            <TableRow
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
                    </ScrollArea>
                </div>
                <DataTablePagination table={table} />
            </div>
        </>
    );
}
