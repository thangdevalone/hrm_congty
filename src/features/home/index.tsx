import { Sidebar } from '@/components/common/sidebarLeft';
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/navbar';
export default function Home() {
    const [collapse, setCollapse] = useState<boolean>(false);

    return (
        <div className="flex-row flex">
            <div className="fixed right-[20px] top-[20px]">
                <ModeToggle />
            </div>
            <Sidebar
                setCollapse={setCollapse}
                collapse={collapse}
                className={`${collapse ? 'basis-0' : 'basis-[200px]'}`}
            />
            <div className="flex-1 mt-[20px] border border-white">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}
