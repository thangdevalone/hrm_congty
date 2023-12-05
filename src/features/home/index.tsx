import { Navbar } from '@/components/common';
import { Sidebar } from '@/components/common/SidebarLeft';
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

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
                className={`${
                    collapse ? 'basis-0 animate-slide-left' : 'basis-[200px] animate-slide-right'
                } `}
            />
            <div className="flex-1  mt-[20px] ">
                <div className="mb-4">
                    <Navbar />
                </div>
                <Outlet />
            </div>
        </div>
    );
}
