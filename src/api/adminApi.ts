import { QueryParam } from "@/models";
import { ConvertQueryParam } from "@/utils";
import axiosClient from "./axiosClient";

export const adminApi={
    getListEmployee(param?:QueryParam){
        const url=`employee/list-employee${ConvertQueryParam(param)}`
        return axiosClient.get(url)
    }
}