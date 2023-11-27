import { cn } from '@/lib/utils';
import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    collapse: boolean;
    setCollapse: (newCollapse: boolean) => void;
}

export function Sidebar({ className, collapse, setCollapse }: SidebarProps) {
    const navitage = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const handleNavitage = (router: string) => {
        navitage(`/home/${router.toLowerCase()}`);
    };

    return (
        <div className={cn('pb-12', className)}>
            <div className="space-y-4 py-4 ">
                <div className="mb-4 px-2 flex-row flex items-center justify-center">
                    {/* <img src="/assets/logo-black.jpg" alt="" className="w-[60%]" /> */}
                    <Button size="icon" onClick={() => setCollapse(!collapse)}>
                        <TextAlignJustifyIcon />
                    </Button>
                </div>
                <div className="px-3 py-2">
                    <div className="space-y-4">
                        <Button
                            onClick={() => handleNavitage('Dashboard')}
                            variant={
                                location.pathname.includes('dashboard') ? 'secondary' : 'ghost'
                            }
                            className="w-full gap-2 justify-start"
                        >
                            <Icons.dashboard color={theme.theme === 'dark' ? '#ffffff' : ''} />
                            {!collapse && 'Dashboard'}
                        </Button>
                        <Button
                            onClick={() => handleNavitage('Group')}
                            variant={location.pathname.includes('group') ? 'secondary' : 'ghost'}
                            className="w-full gap-2 justify-start"
                        >
                            <Icons.group color={theme.theme === 'dark' ? '#ffffff' : ''} />
                            {!collapse && 'Group'}
                        </Button>
                        <Button
                            onClick={() => handleNavitage('User')}
                            variant={location.pathname.includes('user') ? 'secondary' : 'ghost'}
                            className="w-full gap-2 justify-start"
                        >
                            <Icons.user color={theme.theme === 'dark' ? '#ffffff' : ''} />
                            {!collapse && 'User'}
                        </Button>
                        <Button
                            onClick={() => handleNavitage('Time')}
                            variant={location.pathname.includes('time') ? 'secondary' : 'ghost'}
                            className="w-full gap-2 justify-start"
                        >
                            <Icons.time color={theme.theme === 'dark' ? '#ffffff' : ''} />
                            {!collapse && 'Time'}
                        </Button>
                    </div>
                </div>
                <div className="mb-4 px-[28px] gap-1 fixed bottom-[50px] flex-row flex items-center justify-center">
                    <img
                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/387096162_1010374856956433_1269973518960313897_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4c3iUDbhTKwAX8x8TpP&_nc_ht=scontent.fhan17-1.fna&oh=00_AfA8pN-ZBScsHT5pZfUVAV2G6u2QxPTv_nn5hD5xqjaOWQ&oe=656932DF"
                        alt="avatar default"
                        className="w-8 h-8 rounded-full"
                    />
                    {!collapse && <span>Thắng Dev Alone</span>}
                </div>
            </div>
        </div>
    );
}
