import { ThemeProvider } from '@/components/theme-provider';
import { Route, Routes, Navigate } from 'react-router-dom';
import './app.css';
import { LoginPage } from './features/auth/pages/LoginPage';
import Welcome from './features/welcome';
import Home from './features/home';
import { Admin, PIM, TimeKeep } from './features/home/components';
import {
    ManagerJob,
    ManagerEmpStatus,
    ManagerWorkShift,
    Employyee,
    Organization,
} from './features/home/components/AdminComponents';
import { EmployeeList, EditEmployee } from './features/home/components/PimComponents';
import { Leave } from './features/home/components/Leave';

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
                            <Route index element={<Navigate to="employee" />} />
                            <Route path="job-positions" element={<ManagerJob />} />
                            <Route path="employee-status" element={<ManagerEmpStatus />} />
                            <Route path="work-shifts" element={<ManagerWorkShift />} />
                            <Route path="employee" element={<Employyee />} />
                            <Route path="organization" element={<Organization />} />
                        </Route>
                        <Route path="info-employee" element={<PIM />}>
                            <Route index element={<Navigate to="list-employee" />} />
                            <Route path="list-employee" element={<EmployeeList />} />
                            <Route path="edit-employee" element={<EditEmployee />} />
                        </Route>
                        <Route path="leave" element={<Leave />}></Route>
                        <Route path="time-keep" element={<TimeKeep />}></Route>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
