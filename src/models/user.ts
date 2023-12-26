export interface ListUser<T> {
    total_rows: number;
    current_page: number;
    data: T[];
    status: number;
}

export interface User {
    EmpID: number;
    EmpName: string;
    Phone: string | null;
    HireDate: string | null;
    BirthDate: string | null;
    Address: string | null;
    PhotoPath: string | null;
    Email: string | null;
    EmpStatus: boolean;
    DepID: number;
    JobID: number;
    JobName: string;
    DepName: string;
    UserID: string;
    password: string;
}

export interface UserAccount {
    UserID: string;
    password: string;
}

export interface LeaveUser {
    EmpID: number;
    EmpName: string;
    Phone?: string;
    HireDate?: string;
    BirthDate?: string;
    Address?: string;
    PhotoPath?: string;
    Email?: string;
    EmpStatus: boolean;
    DepID: number;
    JobID: number;
    LeaveID: number;
    LeaveStartDate: string;
    LeaveEndDate: string;
    Reason: string;
    LeaveStatus: string;
    LeaveTypeID: number;
}

export interface TimeSheetUser {
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
    TimeID: number;
    TimeIn: string;
    TimeOut: string;
}
