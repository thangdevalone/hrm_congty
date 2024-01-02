import { ThemeProvider } from '@/components/theme-provider';
import { Navigate, Route, Routes } from 'react-router-dom';
import './app.css';
import { LoginPage } from './features/auth/pages/LoginPage';
import Home from './features/home';
import { Admin, PIM, TimeKeep } from './features/home/components';
import {
    Accounts,
    ManagerEmpStatus,
    ManagerJob,
    ManagerWorkShift,
    Organization,
} from './features/home/components/AdminComponents';
import { Leave } from './features/home/components/Leave';
import { LeaveList } from './features/home/components/LeaveComponents';
import { EmployeeList } from './features/home/components/PimComponents';
import { EmployeeTimeSheets } from './features/home/components/TimeKeepComponents';
import Welcome from './features/welcome';
import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
function App() {
    dayjs.locale(vi);
    return (
        <ThemeProvider defaultTheme="light" storageKey="theme">
            <div className="w-screen h-screen relative">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<Home />}>
                        <Route index element={<Navigate to="admin" />} />
                        <Route path="admin" element={<Admin />}>
                            <Route index element={<Navigate to="accounts" />} />
                            <Route path="job-positions" element={<ManagerJob />} />
                            <Route path="employee-status" element={<ManagerEmpStatus />} />
                            <Route path="work-shifts" element={<ManagerWorkShift />} />
                            <Route path="accounts" element={<Accounts />} />
                            <Route path="organization" element={<Organization />} />
                        </Route>
                        <Route path="info-employee" element={<PIM />}>
                            <Route index element={<Navigate to="list-employee" />} />
                            <Route path="list-employee" element={<EmployeeList />} />
                        </Route>
                        <Route path="time-keep" element={<TimeKeep />}>
                            <Route index element={<Navigate to="employee-timesheets" />} />
                            <Route path="employee-timesheets" element={<EmployeeTimeSheets />} />
                        </Route>
                        <Route path="leave" element={<Leave />}>
                            <Route index element={<Navigate to="time-leave-list" />} />
                            <Route path="time-leave-list" element={<LeaveList />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
