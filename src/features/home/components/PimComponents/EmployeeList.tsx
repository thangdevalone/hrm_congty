import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { handlePrice } from '@/utils';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EditUser } from '@/models/user';
const datas = [
    {
        id: '001',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '002',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '003',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '004',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '005',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '006',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '007',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
    {
        id: '008',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        salary: 2000000,
        position: 'Intern',
    },
];

export interface Props {
    id: string;
    name: string;
    job: string;
    employmentStatus: string;
    salary: number;
    position: string;
}

export function EmployeeList() {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        name: yup.string().required(''),
        job: yup.string().required(''),
        employmentStatus: yup.string().required(''),
        salary: yup.number().required(''),
        position: yup.string().required(''),
    });

    const form = useForm<EditUser>({
        resolver: yupResolver(schema),
    });
    const handleDeleteEmloyee = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        navigate('/home/info-employee/edit-employee', {
            state: {
                data: datas.filter((item) => item.id === id),
            },
        });
    };
    const handleEditEmloyee = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
    };
    const handleSubmit: SubmitHandler<EditUser> = (data) => {
        console.log(data);
    };
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="">
                        <TableHead className="w-1/12">ID</TableHead>
                        <TableHead className="w-2/12">Name</TableHead>
                        <TableHead className="w-2/12">Job Title</TableHead>
                        <TableHead className="w-2/12">Employment Status</TableHead>
                        <TableHead className="w-2/12">salary</TableHead>
                        <TableHead className="w-2/12">position</TableHead>
                        <TableHead className=""></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {datas.map((data) => (
                        <TableRow key={data.id} className="cursor-pointer">
                            <TableCell className="w-1/12 font-medium">{data.id}</TableCell>
                            <TableCell className="w-2/12">{data.name}</TableCell>
                            <TableCell className="w-2/12">{data.job}</TableCell>
                            <TableCell className="w-2/12">{data.employmentStatus}</TableCell>
                            <TableCell className="w-2/12">{handlePrice(data.salary)}</TableCell>
                            <TableCell className="w-2/12">{data.position}</TableCell>
                            <TableCell className="w-1/12 flex gap-2">
                                <Button onClick={(e) => handleDeleteEmloyee(e, data.id)}>
                                    <TrashIcon />
                                </Button>
                                <Button onClick={(e) => handleEditEmloyee(e, data.id)}>
                                    <Pencil1Icon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <Dialog>
                <Form {...form}>
                    <form
                        className="grid grid-cols-2 gap-6 relative h-[55vh]"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="employmentStatus"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Employment Status</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Employment Status" {...field} />
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
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Job Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Position" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Salary</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Salary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=""></div>
                        <div className=""></div>
                        <div className="absolute bottom-0 right-0">
                            <Button>save</Button>
                            <Button>cancel</Button>
                        </div>
                    </form>
                </Form>
            </Dialog> */}
        </>
    );
}
