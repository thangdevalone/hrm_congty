import { ThemeProvider } from '@/components/theme-provider';
import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import { Navigate, Route, Routes } from 'react-router-dom';
import './app.css';
import {
    ProtectAdmin,
    ProtectAdminHrManager,
    ProtectAuth,
    ProtectHome,
} from './components/ProtectRoute';
import { NotFound } from './components/common';
import { LoginPage } from './features/auth/pages/LoginPage';
import Home from './features/home';
import { Admin, OverView, PIM, Schedule, TimeKeep } from './features/home/components';
import {
    Accounts,
    ManagerDepartment,
    ManagerJob,
    ManagerRole,
    Organization,
} from './features/home/components/AdminComponents';
import { Leave } from './features/home/components/Leave';
import { LeaveList, LeaveType } from './features/home/components/LeaveComponents';
import { EmployeeDetail, EmployeeList } from './features/home/components/PimComponents';
import {
    ConfigSchedule,
    ScheduleList,
    ScheduleReg,
    WorkShift,
} from './features/home/components/ScheduleComponents';
import { TimeKeepList, TimeKeepReg } from './features/home/components/TimeKeepComponents';
import Welcome from './features/welcome';
import { PermissionProvider } from './utils';
import { SettingsLayout } from './features/settings/SettingsLayout';
import { ManagerNotification, ManagerPass, Personalisation, Profile } from './features/settings';
import { NewPass } from './features/NewPass';
function App() {
    dayjs.locale(vi);
    const P = PermissionProvider();
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
                            <Route index element={<Navigate to="overview" />} />
                            <Route path="overview" element={<OverView />} />
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
                            <Route element={<ProtectAdminHrManager />}>
                                <Route path="info-employee" element={<PIM />}>
                                    <Route index element={<Navigate to="list-employee" />} />
                                    <Route path="list-employee" element={<EmployeeList />} />
                                    <Route path=":idEmp" element={<EmployeeDetail />} />
                                </Route>
                            </Route>
                            <Route path="time-keep" element={<TimeKeep />}>
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            to={
                                                P?.IS_ADMIN_OR_HR ? 'timekeep-list' : 'timekeep-reg'
                                            }
                                        />
                                    }
                                />
                                {P?.IS_ADMIN_OR_HR && (
                                    <Route path="timekeep-list" element={<TimeKeepList />} />
                                )}
                                {!P?.IS_ADMIN && (
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
                                            to={P?.IS_ADMIN ? 'schedule-list' : 'schedule-reg'}
                                        />
                                    }
                                />
                                {P?.IS_ADMIN && (
                                    <Route path="schedule-list" element={<ScheduleList />} />
                                )}
                                {!P?.IS_ADMIN && (
                                    <Route path="schedule-reg" element={<ScheduleReg />} />
                                )}
                                {P?.IS_ADMIN_OR_HR && (
                                    <>
                                        <Route path="work-shifts" element={<WorkShift />} />
                                        <Route
                                            path="config-schedules"
                                            element={<ConfigSchedule />}
                                        />
                                    </>
                                )}
                            </Route>
                        </Route>
                        <Route path="settings" element={<SettingsLayout />}>
                            <Route index element={<Navigate to="profile" />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="notification" element={<ManagerNotification />} />
                            <Route path="password" element={<ManagerPass />} />
                            <Route path="personalisation" element={<Personalisation />} />
                        </Route>
                    </Route>
                    <Route path='/forgot/reset-password/:token' element={<NewPass/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
