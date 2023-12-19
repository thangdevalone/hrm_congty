export interface InfoCompany{
    company_name:string,
    number_emp:number,
    tax:string,
    phone:string,
    email:string,
}
export interface InforAccount {
    name: string;
    job: string;
    employmentStatus: string;
    salary: number;
    position: string;
}

export interface InforUser{
    user_id:number
    username:string
    password:string
    user_status:boolean
    emp_name:string
}