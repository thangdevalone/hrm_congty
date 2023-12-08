import { Navbar } from '@/components/common';
import { Outlet } from 'react-router-dom';

interface Props {}

export const PIM = (props: Props) => {
    const {} = props;
    return (
        <>
            <div className="nav-bs dark:border-b">
                <Navbar />
            </div>
            <div className="p-5 flex-1 overflow-hidden">
                <Outlet />
            </div>
        </>
    );
};
