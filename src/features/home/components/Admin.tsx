import { Navbar } from '@/components/common';
import { Outlet } from 'react-router-dom';
export const Admin = () => {
    return (
        <>
            <div className="nav-bs dark:border-b">
                <Navbar />
            </div>
            <div className='p-5 flex-1'>
                <Outlet />
            </div>
        </>
    );
};
