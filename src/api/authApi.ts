import { LoginForm } from '@/models';
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
};
export default authApi;
