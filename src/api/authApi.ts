import { CreateAccount, LoginForm, CreateEmloyess } from '@/models';
import axiosClient from './axiosClient';

const authApi = {
    login(data: LoginForm) {
        const url = 'login';
        return axiosClient.post(url, data);
    },
    hello() {
        const url = 'auth/hello';
        return axiosClient.get(url);
    },
    createEmployee(data: CreateEmloyess) {
        const url = 'employee/create-employee';
        return axiosClient.post(url, data);
    },
    createAccount(data: CreateAccount) {
        const url = 'employee/create-useraccount';
        return axiosClient.post(url, data);
    },
};
export default authApi;
