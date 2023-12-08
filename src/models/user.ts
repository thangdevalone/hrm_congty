export interface EditUser {
    name: string;
    job: string;
    employmentStatus: string;
    salary: number;
    position: string;
}

export interface Root {
    total_employees: number;
    current_page: number;
    data: User[];
    status: number;
}

export interface User {
    user_id: number;
    last_login: Date | null;
    is_superuser: boolean;
    email: string;
    name: string;
    is_active: boolean;
    is_staff: boolean;
    username: string;
    first_name: string | null;
    last_name: string | null;
    phone_number: any;
    address: string;
    date_of_birth: any;
    date_of_hire: string;
    status: string;
    position_id: string;
    groups: string[];
    user_permissions: string[];
}
