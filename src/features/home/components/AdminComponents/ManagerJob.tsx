import { adminApi } from '@/api/adminApi';
import { SelectionField, TextField, TextareaField } from '@/components/FormControls';
import { DataTablePagination, DataTableViewOptions } from '@/components/common';
import { DataTableColumnHeader } from '@/components/common/DataTableColumnHeader';
import { DataTableFilter } from '@/components/common/DataTableFilter';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { InfoDepartment, InfoJob, JobCreateForm, ListResponse, QueryParam } from '@/models';
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

export const ManagerJob = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [listJob, setListJob] = React.useState<InfoJob[]>([]);
    const [totalRow, setTotalRow] = React.useState<number>();
    const [pageCount, setPageCount] = React.useState<number>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [listDepartment, setListDepartment] = React.useState<InfoDepartment[]>([]);
    const [loadingTable, setLoadingTable] = React.useState(false);
    const [query, setQuery] = React.useState<string>('');
    const [queryLodash, setQueryLodash] = React.useState<string>('');
    const param = queryString.parse(location.search);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const { toast } = useToast();
    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'JobID', desc: false }]);
    const [selectRowDelete, setSelectRowDelete] = React.useState<InfoJob | null>(null);
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
    const columns: ColumnDef<InfoJob>[] = [
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
            accessorKey: 'JobName',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Chức vụ" />,
            cell: ({ row }) => <div>{row.getValue('JobName')}</div>,
        },
        {
            accessorKey: 'DepName',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Phòng ban" />,
            cell: ({ row }) => <div>{row.getValue('DepName')}</div>,
        },
        {
            accessorKey: 'Descriptions',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Mô tả" />,
            cell: ({ row }) => <div>{row.getValue('Descriptions')}</div>,
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
                                    Chỉnh sửa chức vụ
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger
                                onClick={() => {
                                    setSelectRowDelete(row.original);
                                }}
                                className="w-full"
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    Xóa chức vụ
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const debouncedSetQuery = React.useCallback(
        debounce((value) => setQuery(value), 500),
        []
    );

    React.useEffect(() => {
        const fetchDataDepartment = async () => {
            try {
                const res = (await adminApi.getDepartment()) as unknown as ListResponse;
                setListDepartment(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataDepartment();
    }, []);
    const fetchData = async () => {
        try {
            setLoadingTable(true);
            const parsed = queryString.parse(
                location.search ? location.search : '?pageIndex=1&pageSize=10&query='
            ) as unknown as QueryParam;
            const jobData = (await adminApi.getJob(parsed)) as unknown as ListResponse;
            setListJob(jobData.data);
            setTotalRow(jobData.total_rows);
            setPageCount(jobData.current_page);
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

    const table = useReactTable({
        data: listJob,
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

    const schema_create = yup.object().shape({
        DepID: yup.number().required('Cần chọn phòng ban'),
        JobName: yup.string().required('Cần nhập tên chức vụ'),
        Descriptions: yup.string().required('Cần nhập mô tả chức vụ'),
    });

    const formCreate = useForm<JobCreateForm>({
        resolver: yupResolver(schema_create),
    });

    const handleCreate: SubmitHandler<JobCreateForm> = (data) => {
        (async () => {
            try {
                setLoading(true);
                const res = await adminApi.createJob(data);
                toast({
                    title: 'Thành công',
                    description: 'Tạo chức vụ thành công',
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

    const handleDeleteJob = async (id: string) => {
        try {
            setLoading(true);
            const response = await adminApi.deleteJob(id);
            setSelectRowDelete(null);
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
                    {table.getColumn('DepName') && (
                        <DataTableFilter
                            column={table.getColumn('DepName')}
                            title="Phòng ban"
                            options={null}
                            api="department"
                        />
                    )}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="btn flex gap-2">
                                <PlusCircledIcon />
                                Tạo
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className="">
                                <DialogTitle className="text-xl uppercase">
                                    Tạo mới chức vụ
                                </DialogTitle>
                            </DialogHeader>
                            <Form {...formCreate}>
                                <form onSubmit={formCreate.handleSubmit(handleCreate)}>
                                    <ScrollArea className="h-[320px] ">
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <TextField
                                                name="JobName"
                                                label="Chức vụ"
                                                placeholder="Business analyst"
                                                require={true}
                                            />
                                            <SelectionField
                                                name="DepID"
                                                label="Tên phòng ban"
                                                placeholder="Chọn phòng ban"
                                                require={true}
                                            >
                                                {listDepartment.map((item, index) => (
                                                    <SelectItem
                                                        className="cursor-pointer"
                                                        key={index + index + item.DepName}
                                                        value={item.DepID + ''}
                                                    >
                                                        {item.DepName}
                                                    </SelectItem>
                                                ))}
                                            </SelectionField>
                                            <div className="col-span-2 px-2">
                                                <TextareaField
                                                    require={true}
                                                    name="Descriptions"
                                                    label="Mô tả"
                                                />
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
                        style={{ height: 'calc(100vh - 260px)' }}
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
                                style={{ height: 'calc(100vh - 220px)' }}
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
                                Xóa chức vụ {selectRowDelete?.JobName}
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
                                onClick={() => handleDeleteJob(selectRowDelete?.JobID + '')}
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
