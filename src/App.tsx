import { ThemeProvider } from '@/components/theme-provider';
import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import { Navigate, Route, Routes } from 'react-router-dom';
import './app.css';
import { LoginPage } from './features/auth/pages/LoginPage';
import Home from './features/home';
import { Admin, PIM, Schedule, TimeKeep } from './features/home/components';
import {
    Accounts,
    ManagerDepartment,
    ManagerJob,
    ManagerRole,
    Organization,
} from './features/home/components/AdminComponents';
import { Leave } from './features/home/components/Leave';
import { LeaveList, LeaveType } from './features/home/components/LeaveComponents';
import { EmployeeList } from './features/home/components/PimComponents';
import {
    ConfigSchedule,
    ScheduleList,
    ScheduleReg,
    WorkShift,
} from './features/home/components/ScheduleComponents';
import { TimeKeepList, TimeKeepReg } from './features/home/components/TimeKeepComponents';
import Welcome from './features/welcome';
import { useInfoUser } from './hooks';
import { NotFound } from './components/common';
import { ProtectAdmin, ProtectAuth, ProtectHome } from './components/ProtectRoute';
function App() {
    dayjs.locale(vi);
    const user = useInfoUser();
    return (
        <ThemeProvider defaultTheme="light" storageKey="theme">
            <div className="w-screen h-screen relative">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route element={<ProtectAuth />}>
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                    <Route element={<ProtectHome />}>
                        <Route path="/home" element={<Home />}>
                            <Route index element={<Navigate to="admin" />} />
                            <Route element={<ProtectAdmin />}>
                                <Route path="admin" element={<Admin />}>
                                    <Route index element={<Navigate to="accounts" />} />
                                    <Route path="job" element={<ManagerJob />} />
                                    <Route path="role" element={<ManagerRole />} />

                                    <Route path="department" element={<ManagerDepartment />} />
                                    <Route path="accounts" element={<Accounts />} />
                                    <Route path="organization" element={<Organization />} />
                                </Route>
                            </Route>
                            <Route path="info-employee" element={<PIM />}>
                                <Route index element={<Navigate to="list-employee" />} />
                                <Route path="list-employee" element={<EmployeeList />} />
                            </Route>
                            <Route path="time-keep" element={<TimeKeep />}>
                                 <Route
                                    index
                                    element={
                                        <Navigate
                                            to={
                                                (user?.RoleName == 'Admin' ||
                                                user?.RoleName == 'User')
                                                    ? 'timekeep-list'
                                                    : 'timekeep-reg'
                                            }
                                        />
                                    }
                                /> 
                                {(user?.RoleName == 'Admin' ||
                                    user?.RoleName == 'Hr') && (
                                        <Route path="timekeep-list" element={<TimeKeepList />} />
                                    )}
                                {user?.RoleName !== 'Admin' && (
                                    <Route path="timekeep-reg" element={<TimeKeepReg />} />
                                )}
                            </Route>
                            <Route path="leave" element={<Leave />}>
                                <Route index element={<Navigate to="time-leave-list" />} />
                                <Route path="time-leave-list" element={<LeaveList />} />
                                <Route path="leave-type" element={<LeaveType />} />
                            </Route>
                            <Route path="schedules" element={<Schedule />}>
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            to={
                                                user?.RoleName == 'Admin'
                                                    ? 'schedule-list'
                                                    : 'schedule-reg'
                                            }
                                        />
                                    }
                                />
                                {user?.RoleName == 'Admin' && (
                                    <Route path="schedule-list" element={<ScheduleList />} />
                                )}
                                {user?.RoleName !== 'Admin' && (
                                    <Route path="schedule-reg" element={<ScheduleReg />} />
                                )}
                                <Route path="work-shifts" element={<WorkShift />} />
                                <Route path="config-schedules" element={<ConfigSchedule />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
