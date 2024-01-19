export interface InfoCompany {
    company_name: string;
    number_emp: number;
    tax: string;
    phone: string;
    email: string;
}
export interface InforUser {
    EmpID: number;
    EmpName: string;
    Phone: string;
    HireDate: string;
    BirthDate: string;
    Address: string;
    PhotoPath: string;
    Email: string;
    EmpStatus: boolean;
    DepID: number;
    JobID: number;
}

export interface InforEmployee {
    EmpID: number;
    EmpName: string;
    Phone: string;
    HireDate: string;
    BirthDate: string;
    Address: string;
    PhotoPath: string;
    Email: string;
    EmpStatus: string;
    Gender: string;
    TaxCode: string;
    CCCD: string;
    BankAccountNumer: string;
    BankName: string;
    DepID: number;
    JobID: number;
    RoleID: number;
    UserID: string;
    password: string;
    JobName: string;
    DepName: string;
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
    employee_count: number;
    DepID: number;
    DepName: string;
    DepShortName: string;
    ManageID?: number;
}
