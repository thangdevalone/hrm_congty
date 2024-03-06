/* eslint-disable @typescript-eslint/no-explicit-any */
import timeKeepApi from '@/api/timeKeepApi';
import { RangeCalendarField } from '@/components/FormControls';
import { DataTablePagination, DataTableViewOptions } from '@/components/common';
import { DataTableColumnHeader } from '@/components/common/DataTableColumnHeader';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
import { cn } from '@/lib/utils';
import { InfoTimeKeep, ListResponse, QueryParam } from '@/models';
import { ConvertQueryParam } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';

import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
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
import { format } from 'date-fns';
import { debounce } from 'lodash';
import queryString from 'query-string';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
interface FilterDateForm {
    dateRange?: string;
}

export const TimeKeepList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [listJob, setListJob] = React.useState<InfoTimeKeep[]>([]);
    const [totalRow, setTotalRow] = React.useState<number>();
    const [pageCount, setPageCount] = React.useState<number>();
    const [loadingTable, setLoadingTable] = React.useState(false);
    const [query, setQuery] = React.useState<string>('');
    const [queryLodash, setQueryLodash] = React.useState<string>('');
    const param = queryString.parse(location.search);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const { toast } = useToast();

    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'id', desc: false }]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: Number(param?.pageIndex || 1) - 1,
        pageSize: Number(param?.pageSize || 10),
    });

    const debouncedSetQuery = React.useCallback(
        debounce((value) => setQuery(value), 500),
        []
    );
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
    const columns: ColumnDef<InfoTimeKeep>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Mã chấm công" />,
            cell: ({ row }) => <div className="ml-2">{row.getValue('id')}</div>,
        },
        {
            accessorKey: 'EmpID',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Mã nhân viên" />,
            cell: ({ row }) => <div>{row.getValue('EmpID')}</div>,
        },
        {
            accessorKey: 'EmpName',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Tên nhân viên" />,
            cell: ({ row }) => <div>{row.getValue('EmpName')}</div>,
        },
        {
            accessorKey: 'TimeIn',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Giờ đến" />,
            cell: ({ row }) => <div>{format(row.getValue('TimeIn'), 'dd/MM/yyyy hh:mm:ss')}</div>,
        },
        {
            accessorKey: 'TimeOut',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Giờ về" />,
            cell: ({ row }) => (
                <div>
                    {row.getValue('TimeOut')
                        ? format(row.getValue('TimeOut'), 'dd/MM/yyyy hh:mm:ss')
                        : 'Chưa check out'}
                </div>
            ),
        },
    ];
    const fetchData = async () => {
        try {
            setLoadingTable(true);
            const parsed = queryString.parse(
                location.search ? location.search : '?pageIndex=1&pageSize=10&query='
            ) as unknown as QueryParam;
            const timeKeepData = (await timeKeepApi.getListTimeKeepAll(
                parsed
            )) as unknown as ListResponse;
            setListJob(timeKeepData.data);
            setTotalRow(timeKeepData.total_rows);
            setPageCount(Math.ceil(timeKeepData.total_rows / table.getState().pagination.pageSize));
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
    const schema_date = yup.object().shape({
        dateRange: yup
            .string()
            .test('Check-end-date', 'Cần đủ ngày bắt đầu và ngày kết thúc', (value) => {
                if (!value) {
                    return true;
                }
                if (value) {
                    const [startDate, endDate] = value.split('-');
                    if (startDate && endDate) {
                        return true;
                    }
                    if (startDate && !endDate) {
                        return new yup.ValidationError('Cần chọn ngày kết thúc', null, 'dateRange');
                    }
                    if (!startDate && endDate) {
                        return new yup.ValidationError('Cần chọn ngày bắt đầu', null, 'dateRange');
                    }
                }
            }),
    });
    const FormDateFilter = useForm<FilterDateForm>({
        resolver: yupResolver(schema_date),
    });
    const handleFilter: SubmitHandler<FilterDateForm> = (data) => {
        let paramObject: QueryParam = {};
        if (data.dateRange) {
            const [startDateString, endDateString]: string[] = data.dateRange.split('-');

            // Convert each part into yyyy-mm-dd format
            const convertToISODate = (dateString: string): string => {
                const [day, month, year]: string[] = dateString.split('/');
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            };
            const startDateISO: string = convertToISODate(startDateString);
            const endDateISO: string = convertToISODate(endDateString);
            paramObject = {
                query: query,
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                sort_by: sorting[0].id,
                asc: !sorting[0].desc,
                filters: columnFilters,
                from: startDateISO,
                to: endDateISO,
            };
        } else {
            paramObject = {
                query: query,
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                sort_by: sorting[0].id,
                asc: !sorting[0].desc,
                filters: columnFilters,
            };
        }

        const newSearch = ConvertQueryParam(paramObject);
        navigate({ search: newSearch });
        location.search = newSearch;
        (async () => {
            try {
                setLoadingTable(true);
                const parsed = queryString.parse(
                    location.search ? location.search : '?pageIndex=1&pageSize=10&query='
                ) as unknown as QueryParam;
                const timeKeepData = (await timeKeepApi.getListTimeKeepAll(
                    parsed
                )) as unknown as ListResponse;
                setListJob(timeKeepData.data);
                setTotalRow(timeKeepData.total_rows);
                setPageCount(timeKeepData.current_page);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingTable(false);
            }
        })();
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
                    <Form {...FormDateFilter}>
                        <form onSubmit={FormDateFilter.handleSubmit(handleFilter)}>
                            <div className="flex flex-row gap-3">
                                <RangeCalendarField
                                    name="dateRange"
                                    placeholder="Chọn khoảng ngày"
                                    disableDate={false}
                                />
                                <Button type="submit" className="flex flex-row gap-2">
                                    <Icons.filter /> Lọc
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <ScrollArea style={{ height: 'calc(100vh - 270px)' }} className=" relative w-full">
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
            <DataTablePagination table={table} totalRow={totalRow || 0} />
        </div>
    );
};
