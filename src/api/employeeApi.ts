import { ConvertQueryParam } from '@/utils';
import axiosClient from './axiosClient';
import { EmployeeCreateForm, QueryParam } from '@/models';

const employeeApi = {
    getListEmployee(param?: QueryParam) {
        const url = `employee/list-employee${ConvertQueryParam(param)}`;
        return axiosClient.get(url);
    },
    createEmployee(data:EmployeeCreateForm){
        const url="employee/create-employee"
        return axiosClient.post(url,data)
    }
};
export default employeeApi;
