import { QueryParam, JobCreateForm, DepartmentCreateForm } from '@/models';
import { ConvertQueryParam } from '@/utils';
import axiosClient from './axiosClient';

export const adminApi = {
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
    getJob(param?: QueryParam) {
        const url = `job/list-job${ConvertQueryParam(param)}`;
        return axiosClient.get(url);
    },
    getDepartment(param?: QueryParam) {
        const url = `department/list-department${ConvertQueryParam(param)}`;
        return axiosClient.get(url);
    },
    createJob(data: JobCreateForm) {
        const url = 'job/create-job';
        return axiosClient.post(url, data);
    },
    createDepartment(data: DepartmentCreateForm) {
        const url = 'department/create-department';
        return axiosClient.post(url, data);
    },
    deleteJob(id: string) {
        const url = `job/delete-job/${id}`;
        return axiosClient.delete(url);
    },
    deleteDepartment(id: string) {
        const url = `department/delete-department/${id}`;
        return axiosClient.delete(url);
    },
};
