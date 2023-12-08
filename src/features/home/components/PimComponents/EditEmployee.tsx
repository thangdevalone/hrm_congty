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
import { Button } from '@/components/ui/button';
export interface Props {
    id: string;
    name: string;
    job: string;
    employmentStatus: string;
    salary: number;
    position: string;
}
export function EditEmployee() {
    const location = useLocation();
    const data = (location.state.data[0] as Props) || {};
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

    const handleSubmit: SubmitHandler<EditUser> = (data) => {
        console.log(data);
    };

    return (
        <div className="border rounded-[8px] p-5">
            <h1 className="text-[28px] capitalize font-medium mb-6">edit employee</h1>
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
        </div>
    );
}
