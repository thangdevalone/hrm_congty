export interface FormAccount {
    username: string;
    password: string;
    employee: string;
}

export interface EmployeeCreateForm {
    EmpName: string;
    Email: string;
    CCCD: string;
    DepID: number;
    JobID: number;
    RoleID: number;
    EmpStatus?: string;
    BankAccountNumber?: string; // Corrected typo here
    BankName?: string;
    Gender?: string;
    TaxCode?: string;
    Phone?: string;
    HireDate?: string;
    BirthDate?: string;
    Address?: string;
}
