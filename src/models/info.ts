export interface InfoCompany {
    company_name: string;
    number_emp: number;
    tax: string;
    phone: string;
    email: string;
}
export interface InforAccount {
    name: string;
    job: string;
    employmentStatus: string;
    department: string;
}

export interface CreateEmloyess {
    EmpName: string;
    job: number;
    employmentStatus: number;
    department: number;
}

export interface InfoAccount {
    UserID: string;
    password: string;
    UserStatus: string;
    EmpID: string;
}

export interface CreateAccount {
    UserID: string;
    password: string;
    UserStatus: number;
    EmpID: number;
}

export interface InforUser {
    user_id: number;
    username: string;
    password: string;
    user_status: boolean;
    emp_name: string;
}

export interface InfoJob {
    JobID: number;
    JobName: string;
    JobChangeHour: string;
    DepID: number;
    DepName: string;
}

export interface InfoDepartment {
    DepID: number;
    DepName: string;
}
