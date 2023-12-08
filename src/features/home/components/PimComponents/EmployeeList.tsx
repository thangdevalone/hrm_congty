import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

const invoices = [
    {
        id: '001',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        Salary: '2.000.000 VND',
        Position: 'Intern',
    },
    {
        id: '002',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        Salary: '2.000.000 VND',
        Position: 'Intern',
    },
    {
        id: '003',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        Salary: '2.000.000 VND',
        Position: 'Intern',
    },
    {
        id: '004',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        Salary: '2.000.000 VND',
        Position: 'Intern',
    },
    {
        id: '005',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        Salary: '2.000.000 VND',
        Position: 'Intern',
    },
    {
        id: '006',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        Salary: '2.000.000 VND',
        Position: 'Intern',
    },
    {
        id: '007',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        Salary: '2.000.000 VND',
        Position: 'Intern',
    },
    {
        id: '008',
        name: 'Nguyễn Quang Thắng',
        job: 'Nhân viên kĩ thuật',
        employmentStatus: 'Full-time',
        Salary: '2.000.000 VND',
        Position: 'Intern',
    },
];
export function EmployeeList() {
    const handleEditEmployee = (index: string) => {
        console.log(index);
    };

    const handleDeleteEmloyee = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log(1);
    };
    const handleEditEmloyee = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log(2);
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
                        <TableHead className="w-2/12">Salary</TableHead>
                        <TableHead className="w-2/12">Position</TableHead>
                        <TableHead className=""></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow
                            key={invoice.id}
                            className="cursor-pointer"
                            onClick={() => handleEditEmployee(invoice.id)}
                        >
                            <TableCell className="w-1/12 font-medium">{invoice.id}</TableCell>
                            <TableCell className="w-2/12">{invoice.name}</TableCell>
                            <TableCell className="w-2/12">{invoice.job}</TableCell>
                            <TableCell className="w-2/12">{invoice.employmentStatus}</TableCell>
                            <TableCell className="w-2/12">{invoice.Salary}</TableCell>
                            <TableCell className="w-2/12">{invoice.Position}</TableCell>
                            <TableCell className="w-1/12 flex gap-2">
                                <Button onClick={(e) => handleDeleteEmloyee(e)}>
                                    <TrashIcon />
                                </Button>
                                <Button onClick={(e) => handleEditEmloyee(e)}>
                                    <Pencil1Icon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
