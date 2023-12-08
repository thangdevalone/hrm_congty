import { ThemeProvider } from '@/components/theme-provider';
import { Navigate, Route, Routes } from 'react-router-dom';
import './app.css';
import { LoginPage } from './features/auth/pages/LoginPage';
import Home from './features/home';
import { Admin, PIM, TimeKeep } from './features/home/components';
import {
    ManagerEmpStatus,
    ManagerJob,
    ManagerWorkShift,
    Organization,
    Users,
} from './features/home/components/AdminComponents';
import { Leave } from './features/home/components/Leave';
import { EmployeeList } from './features/home/components/PimComponents';
import Welcome from './features/welcome';
import { EmployeeTimeSheets } from './features/home/components/LeaveComponents';

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="theme">
            <div className="w-screen h-screen relative">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<Home />}>
                        <Route index element={<Navigate to="admin" />} />
                        <Route path="admin" element={<Admin />}>
                            <Route index element={<Navigate to="users" />} />
                            <Route path="job-positions" element={<ManagerJob />} />
                            <Route path="employee-status" element={<ManagerEmpStatus />} />
                            <Route path="work-shifts" element={<ManagerWorkShift />} />
                            <Route path="users" element={<Users />} />
                            <Route path="organization" element={<Organization />} />
                        </Route>
                        <Route path="info-employee" element={<PIM />}>
                            <Route index element={<Navigate to="list-employee" />} />
                            <Route path="list-employee" element={<EmployeeList />} />
                        </Route>
                        <Route path="leave" element={<Leave />}>
                            <Route index element={<Navigate to="employee-timesheets" />} />
                            <Route path="employee-timesheets" element={<EmployeeTimeSheets />} />
                        </Route>
                        <Route path="time-keep" element={<TimeKeep />}></Route>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
