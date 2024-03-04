/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminApi } from '@/api/adminApi';
import employeeApi from '@/api/employeeApi';
import { SearchField, SelectionField, TextField, TextareaField } from '@/components/FormControls';
import { DataTablePagination, DataTableViewOptions } from '@/components/common';
import { DataTableColumnHeader } from '@/components/common/DataTableColumnHeader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
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
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SelectItem } from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import {
    DepartmentCreateForm,
    DepartmentEditForm,
    InfoDepartment,
    ListResponse,
    QueryParam,
} from '@/models';
import { ConvertQueryParam } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon, PlusCircledIcon, ReloadIcon } from '@radix-ui/react-icons';
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { debounce } from 'lodash';
import queryString from 'query-string';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export const ManagerDepartment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(false);
    const [totalRow, setTotalRow] = React.useState<number>();
    const [listDepartment, setListDepartment] = React.useState<InfoDepartment[]>([]);
    const [pageCount, setPageCount] = React.useState<number>();
    const [loadingTable, setLoadingTable] = React.useState(false);
    const [query, setQuery] = React.useState<string>('');
    const [queryLodash, setQueryLodash] = React.useState<string>('');
    const param = queryString.parse(location.search);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [selectRowDelete, setSelectRowDelete] = React.useState<InfoDepartment | null>(null);
    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'DepID', desc: false }]);
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const [openCreateForm, setOpenCreateForm] = React.useState(false);
    const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: Number(param?.pageIndex || 1) - 1,
        pageSize: Number(param?.pageSize || 10),
    });
    const handleNavigateQuery = () => {
        const paramObject: QueryParam = {
            query: query,
            pageIndex: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
            sort_by: sorting[0].id,
            asc: !sorting[0].desc,
            filters: columnFilters,
        };
        const newSearch = ConvertQueryParam(paramObject);
        navigate({ search: newSearch });
        location.search = newSearch;
    };

    const fetchData = async () => {
        try {
            setLoadingTable(true);
            const parsed = queryString.parse(
                location.search ? location.search : '?pageIndex=1&pageSize=10&query='
            ) as unknown as QueryParam;
            const response = (await adminApi.getDepartment(parsed)) as unknown as ListResponse;
            setListDepartment(response.data);
            setTotalRow(response.total_rows);
            setPageCount(Math.ceil(response.total_rows / table.getState().pagination.pageSize));
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingTable(false);
        }
    };
    React.useEffect(() => {
        handleNavigateQuery();
        fetchData();
    }, [query, sorting, columnFilters, pagination]);
    const columns: ColumnDef<InfoDepartment>[] = [
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
            enableHiding: false,
        },
        {
            accessorKey: 'DepName',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Phòng ban" />,
            cell: ({ row }) => <div>{row.getValue('DepName')}</div>,
        },
        {
            accessorKey: 'DepShortName',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tên ngắn" />,
            cell: ({ row }) => <div>{row.getValue('DepShortName')}</div>,
        },
        {
            accessorKey: 'employee_count',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Số nhân viên" />,
            cell: ({ row }) => <div>{row.getValue('employee_count')}</div>,
        },
        {
            accessorKey: 'EmpName',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Quản lý" />,
            cell: ({ row }) => <div>{row.getValue('EmpName')}</div>,
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
                            <DropdownMenuItem
                                onClick={() => {
                                    handleValueEdit(row.original);
                                }}
                                className="cursor-pointer"
                            >
                                Chỉnh sửa phòng ban
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectRowDelete(row.original);
                                    setOpenDeleteForm(true);
                                }}
                                className="cursor-pointer"
                            >
                                Xóa phòng ban
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    const handleValueEdit = (data: InfoDepartment) => {
        formEdit.setValue('DepID', data.DepID);
        formEdit.setValue('DepName', data.DepName);
        formEdit.setValue('DepShortName', data.DepShortName);
        if (data.ManageID) {
            formEdit.setValue('ManageID', data.ManageID);
        }
        setOpenEditForm(true);
        console.log(formEdit, data.DepID);
    };
    const table = useReactTable({
        data: listDepartment,
        columns,
        pageCount,
        manualPagination: true,
        autoResetPageIndex: false,
        manualSorting: true,
        manualFiltering: true,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            pagination,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSetQuery = React.useCallback(
        debounce((value) => setQuery(value), 500),
        []
    );

    const schema_create = yup.object().shape({
        DepName: yup.string().required('Cần chọn phòng ban'),
        DepShortName: yup.string().required('Cần nhập tên viết tắt của phòng ban'),
        ManageID: yup.number().required('Cần chọn người quản lý'),
    });
    const schema_edit = yup.object().shape({
        DepName: yup.string().required('Cần chọn phòng ban'),
   
        ManageID: yup.number().required('Cần chọn người quản lý'),
    });

    const formCreate = useForm<DepartmentCreateForm>({
        resolver: yupResolver(schema_create),
    });
    const formEdit = useForm<DepartmentEditForm>({
        resolver: yupResolver(schema_edit),
    });

    const handleEdit: SubmitHandler<DepartmentEditForm> = (data) => {
        (async () => {
            try {
                if (data?.DepID !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { DepID, DepShortName, ...postData } = data;
                    setLoading(true);
                    await adminApi.editDepartment(DepID, postData);
                    fetchData();
                    setOpenEditForm(false);
                    toast({
                        title: 'Thành công',
                        description: 'Sửa phòng ban thành công',
                    });
                }
            } catch (error: any) {
                toast({
                    variant: 'destructive',
                    title: 'Có lỗi xảy ra',
                    description: 'Vui lòng thử lại sau',
                });
            } finally {
                setLoading(false);
            }
        })();
    };
    const handleCreate: SubmitHandler<DepartmentCreateForm> = (data) => {
        (async () => {
            try {
                setLoading(true);
                await adminApi.createDepartment(data);
                setOpenCreateForm(false);
                fetchData()
                toast({
                    title: 'Thành công',
                    description: 'Tạo phòng ban thành công',
                });
            } catch (error: any) {
                toast({
                    variant: 'destructive',
                    title: 'Có lỗi xảy ra',
                    description: error.error,
                });
            } finally {
                setLoading(false);
            }
        })();
    };

    const handleDeleteDepartment = async (id: string) => {
        try {
            setLoading(true);
            await adminApi.deleteDepartment(id);
            setSelectRowDelete(null);
            toast({
                title: 'Thành công',
                description: 'Xóa thành công',
            });
            fetchData();
            setOpenDeleteForm(false)
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Có lỗi xảy ra',
                description: error.error,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center">
                <div className="flex flex-row gap-4">
                    <Input
                        placeholder="Tìm kiếm trên bảng..."
                        value={queryLodash}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const { value } = event.target;
                            setQueryLodash(value);
                            debouncedSetQuery(value);
                        }}
                    />
                    <Dialog open={openCreateForm} onOpenChange={setOpenCreateForm}>
                        <DialogTrigger asChild>
                            <Button className="btn flex gap-2">
                                <PlusCircledIcon />
                                Tạo
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className="">
                                <DialogTitle className="text-xl uppercase">
                                    Tạo mới phòng ban
                                </DialogTitle>
                            </DialogHeader>
                            <Form {...formCreate}>
                                <form onSubmit={formCreate.handleSubmit(handleCreate)}>
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <TextField
                                            name="DepName"
                                            label="Tên phòng ban"
                                            placeholder="Công nghệ thông tin,..."
                                            require={true}
                                        />
                                        <TextField
                                            name="DepShortName"
                                            label="Tên viết tắt"
                                            placeholder="DE,DA,..."
                                            require={true}
                                        />

                                        <SearchField
                                            name="ManageID"
                                            label="Quản lý"
                                            placeholder="Chọn quản lý"
                                            typeApi="employee"
                                            require={true}
                                        />
                                    </div>
                                    <DialogFooter className="w-full sticky mt-4">
                                        <DialogClose asChild>
                                            <Button
                                                onClick={() => {
                                                    formCreate.reset();
                                                }}
                                                type="button"
                                                variant="outline"
                                            >
                                                Hủy
                                            </Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={loading}>
                                            {loading && (
                                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                            )}{' '}
                                            Lưu
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <ScrollArea style={{ height: 'calc(100vh - 250px)' }} className=" relative w-full">
                    <Table>
                        <TableHeader className="sticky top-0 z-[2] bg-[hsl(var(--background))]">
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
                        {!loadingTable && (
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
                        )}
                    </Table>
                    {loadingTable && (
                        <div
                            style={{ height: 'calc(100vh - 270px)' }}
                            className="w-full flex items-center justify-center"
                        >
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Đang tải
                        </div>
                    )}
                </ScrollArea>
            </div>
            <Dialog open={openDeleteForm} onOpenChange={setOpenDeleteForm}>
                <DialogContent>
                    <DialogHeader className="">
                        <DialogTitle>Xác nhận xóa phòng ban?</DialogTitle>
                    </DialogHeader>
                    <p>
                        Bạn có chắc chắn xóa phòng ban <strong>{selectRowDelete?.DepName}</strong>?
                    </p>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                onClick={() => {
                                    setOpenDeleteForm(false);
                                }}
                                type="button"
                                variant="outline"
                            >
                                Hủy
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            autoFocus
                            onClick={() => handleDeleteDepartment(selectRowDelete?.DepID + '')}
                            disabled={loading}
                        >
                            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />} Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={openEditForm} onOpenChange={setOpenEditForm}>
                <DialogContent>
                    <DialogHeader className="">
                        <DialogTitle className="text-xl uppercase">Chỉnh sửa phòng ban</DialogTitle>
                    </DialogHeader>
                    <Form {...formEdit}>
                        <form onSubmit={formEdit.handleSubmit(handleEdit)}>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <TextField
                                    name="DepName"
                                    label="Tên phòng ban"
                                    placeholder="Công nghệ thông tin,..."
                                    require={true}
                                />
                                <TextField
                                    name="DepShortName"
                                    label="Tên viết tắt"
                                    placeholder="DE,DA,..."
                                    require={true}
                                    disabled={true}
                                />

                                <SearchField
                                    name="ManageID"
                                    label="Phòng ban"
                                    placeholder="Chọn quản lý"
                                    typeApi="employee"
                                    require={true}
                                />
                            </div>
                            <DialogFooter className="w-full sticky mt-4">
                                <DialogClose asChild>
                                    <Button
                                        onClick={() => {
                                            setOpenEditForm(false);
                                        }}
                                        type="button"
                                        variant="outline"
                                    >
                                        Hủy
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={loading}>
                                    {loading && (
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    )}{' '}
                                    Lưu
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            <DataTablePagination table={table} totalRow={totalRow || 0} />
        </div>
    );
};
