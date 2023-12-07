import { LoginForm } from './../models/auth';

import axiosClient from "./axiosClient"

const authApi = {
  login(data: LoginForm) {
    const url = "login"
    return axiosClient.post(url, data)
  },
  // register(data: RegisterForm) {
  //   const url = "auth/register"
  //   return axiosClient.post(url, form)
  // },
  hello() {
    const url = "auth/hello"
    return axiosClient.get(url)
  },
}
export default authApi
