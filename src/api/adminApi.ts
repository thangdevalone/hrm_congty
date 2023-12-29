import { QueryParam } from '@/models';
import { ConvertQueryParam } from '@/utils';
import axiosClient from './axiosClient';

export const adminApi = {
    getListEmployee(param?: QueryParam) {
        const url = `employee/list-employee${ConvertQueryParam(param)}`;
        return axiosClient.get(url);
    },
    getListTimeSheet(param?: QueryParam) {
        const url = `timesheet/list-timesheet${ConvertQueryParam(param)}`;
        return axiosClient.get(url);
    },
    getListAccount(param?: QueryParam) {
        const url = `employee/list-account${ConvertQueryParam(param)}`;
        return axiosClient.get(url);
    },
    getUserAccount(param?: QueryParam) {
        const url = `employee/list-username${ConvertQueryParam(param)}`;
        return axiosClient.get(url);
    },
    getListLeave(param?: QueryParam) {
        const url = `leave/list-leave${ConvertQueryParam(param)}`;
        return axiosClient.get(url);
    },
    getJob() {
        const url = 'job/list-job';
        return axiosClient.get(url);
    },
    getDepartment() {
        const url = 'department/list-department';
        return axiosClient.get(url);
    },
};
