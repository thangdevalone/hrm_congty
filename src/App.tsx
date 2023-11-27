import { ThemeProvider } from '@/components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import './app.css';
import { LoginPage } from './features/auth/pages/LoginPage';
import Welcome from './features/welcome';
import Home from './features/home';
import Dashboard from './features/home/components/dashboard';
import Group from './features/home/components/group';
import Calendar from './features/home/components/calendar';
import User from './features/home/components/user';
function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="theme">
            <div className="w-screen h-screen relative">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<Home />}>
                        <Route path="dashboard" element={<Dashboard />}></Route>
                        <Route path="group" element={<Group />}></Route>
                        <Route path="time" element={<Calendar />}></Route>
                        <Route path="user" element={<User />}></Route>
                    </Route>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
