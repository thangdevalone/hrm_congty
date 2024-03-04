import { ChangePass, LoginForm } from '@/models';
import axiosClient from './axiosClient';
import { useInfoUser } from '@/hooks';
import { NewPassForm } from '@/features/NewPass';

const authApi = {
    login(data: LoginForm) {
        const url = 'login';
        return axiosClient.post(url, data);
    },
    hello() {
        const url = 'auth/hello';
        return axiosClient.get(url);
    },
    changePass(id:number,data:ChangePass){
        const postData={
            current_password:data.current_password,
            new_password:data.new_password
        }
        const url = `account/change-password/${id}`;
        return axiosClient.post(url,postData);
    },
    forgotPass(gmail:string){
        const url='forgot/forgot-password'
        return axiosClient.post(url,{email:gmail})
    },
    resetPass(token:string,data:NewPassForm){
        const url=`forgot/reset-password/${token}`
        return axiosClient.post(url,data)
    }
};
export default authApi;
