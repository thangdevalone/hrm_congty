import { adminApi } from '@/api/adminApi';
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
    InfoDepartment,
    InforUser,
    ListResponse,
    QueryParam,
} from '@/models';
import { ConvertQueryParam } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { DialogTrigger } from '@radix-ui/react-dialog';
import { SelectionField, TextField } from '@/components/FormControls';
import { SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import employeeApi from '@/api/employeeApi';

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
    const [listUser, setListUser] = React.useState<InforUser[]>([]);
    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'DepID', desc: false }]);
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
            setPageCount(response.current_page);
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
            accessorKey: 'employee_count',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Số nhân viên" />,
            cell: ({ row }) => <div>{row.getValue('employee_count')}</div>,
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
                            <DialogTrigger className="w-full">
                                <DropdownMenuItem className="cursor-pointer">
                                    Chỉnh sửa phòng ban
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger
                                asChild
                                className="w-full"
                                onClick={() => {
                                    setSelectRowDelete(row.original);
                                }}
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    Xóa phòng ban
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    React.useEffect(() => {
        const fetchDataEmp = async () => {
            try {
                const response = (await employeeApi.getListEmployee()) as unknown as ListResponse;
                setListUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataEmp();
    }, []);

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
    const debouncedSetQuery = React.useCallback(
        debounce((value) => setQuery(value), 500),
        []
    );

    const schema_create = yup.object().shape({
        DepName: yup.string().required('Cần chọn phòng ban'),
        DepShortName: yup.string().required('Cần nhập tên viết tắt của phòng ban'),
        ManageID: yup.number().required('Cần chọn người quản lý'),
    });

    const formCreate = useForm<DepartmentCreateForm>({
        resolver: yupResolver(schema_create),
    });

    const handleCreate: SubmitHandler<DepartmentCreateForm> = (data) => {
        (async () => {
            try {
                setLoading(true);
                const res = adminApi.createDepartment(data);
                console.log(res);
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
            const response = await adminApi.deleteDepartment(id);
            setSelectRowDelete(null);
            console.log(response);
            toast({
                title: 'Thành công',
                description: 'Xóa thành công',
            });
            fetchData();
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="btn flex gap-2">
                                <PlusCircledIcon />
                                Tạo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                            <DialogHeader className="">
                                <DialogTitle className="text-xl uppercase">
                                    Tạo mới phòng ban
                                </DialogTitle>
                            </DialogHeader>
                            <Form {...formCreate}>
                                <form onSubmit={formCreate.handleSubmit(handleCreate)}>
                                    <ScrollArea className="h-[400px]">
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <TextField
                                                name="DepShortName"
                                                label="Tên viết tắt"
                                                placeholder="DE,DA,..."
                                                require={true}
                                            />
                                            <TextField
                                                name="DepName"
                                                label="Tên phòng ban"
                                                placeholder="Công nghệ thông tin,..."
                                                require={true}
                                            />
                                            <SelectionField
                                                name="ManageID"
                                                label="Người quản lý"
                                                placeholder="Chọn người quản lý"
                                                require={true}
                                            >
                                                {listUser.map((item, index) => (
                                                    <SelectItem
                                                        key={index + index + item.DepID}
                                                        value={item.EmpID + ''}
                                                    >
                                                        {item.EmpName}
                                                    </SelectItem>
                                                ))}
                                            </SelectionField>
                                            <div className="col-span-2 px-2">
                                                <p className="mb-2  font-semibold">Mô tả</p>
                                                <Textarea className="min-h-[150px]"></Textarea>
                                            </div>
                                        </div>
                                    </ScrollArea>
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
            <Dialog>
                <div className="rounded-md border">
                    <ScrollArea
                        style={{ height: 'calc(100vh - 250px)' }}
                        className=" relative w-full"
                    >
                        <Table>
                            <TableHeader className="sticky top-0 z-[2] bg-[hsl(var(--background))]">
                                {table.getHeaderGroups().map((headerGroup: any) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header: any) => {
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
                                style={{ height: 'calc(100vh - 260px)' }}
                                className="w-full flex items-center justify-center"
                            >
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Đang tải
                            </div>
                        )}
                    </ScrollArea>
                </div>
                {selectRowDelete && (
                    <DialogContent>
                        <DialogHeader className="">
                            <DialogTitle className="text-xl uppercase">
                                Xóa phòng ban {selectRowDelete?.DepName}
                            </DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    onClick={() => {
                                        setSelectRowDelete(null);
                                    }}
                                    type="button"
                                    variant="outline"
                                >
                                    Hủy
                                </Button>
                            </DialogClose>
                            <Button
                                type="button"
                                onClick={() => handleDeleteDepartment(selectRowDelete?.DepID + '')}
                                disabled={loading}
                            >
                                {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{' '}
                                Xóa
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
            <DataTablePagination table={table} totalRow={totalRow || 0} />
        </div>
    );
};
