import { useTheme } from '@/components/theme-provider';
import { useInfoUser } from '@/hooks';
import { cn } from '@/lib/utils';
import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icons } from '../icons';
import { Button } from '../ui/button';

interface SidebarProps {
    collapse: boolean;
    className:string;
    setCollapse: (newCollapse: boolean) => void;
}

export const SidebarLeft=({ className, collapse, setCollapse }: SidebarProps)=> {
    const navitage = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const handleNavitage = (router: string) => {
        if (location.pathname.includes(router)) return;
        navitage(`/home/${router}`);
    };
    const user=useInfoUser()

    return (
        <div className={cn('pb-12 dark:border-r side-bs', className)}>
            <div className="space-y-4 py-4 ">
                <div className="mb-4 px-5 gap-3 flex-row flex items-center">
                    <Button size="icon" onClick={() => setCollapse(!collapse)}>
                        <TextAlignJustifyIcon />
                    </Button>
                </div>
                <div className="px-3 py-2">
                    <div className="space-y-2">
                        {user?.RoleName==='Admin' && <Button
                            onClick={() => handleNavitage('admin')}
                            variant={location.pathname.includes('admin') ? 'secondary' : 'ghost'}
                            className="w-full gap-3 justify-start h-10"
                        >
                            <Icons.dashboard
                                className="w-5 h-5"
                                color={theme.theme === 'dark' ? '#ffffff' : ''}
                            />
                            {!collapse && 'Trang quản trị'}
                        </Button>}
                        <Button
                            onClick={() => handleNavitage('info-employee')}
                            variant={
                                location.pathname.includes('info-employee') ? 'secondary' : 'ghost'
                            }
                            className="w-full gap-3 justify-start h-10"
                        >
                            <Icons.group
                                className="w-5 h-5"
                                color={theme.theme === 'dark' ? '#ffffff' : 'black'}
                            />
                            {!collapse && 'Nhân viên'}
                        </Button>
                        <Button
                            onClick={() => handleNavitage('time-keep')}
                            variant={
                                location.pathname.includes('time-keep') ? 'secondary' : 'ghost'
                            }
                            className="w-full gap-3 justify-start h-10"
                        >
                            <Icons.leave
                                className="w-5 h-5"
                                color={theme.theme === 'dark' ? '#ffffff' : 'black'}
                            />
                            {!collapse && 'Chấm công'}
                        </Button>
                        <Button
                            onClick={() => handleNavitage('schedules')}
                            variant={location.pathname.includes('schedules') ? 'secondary' : 'ghost'}
                            className="w-full gap-3 justify-start h-10"
                        >
                            <Icons.schedule
                                className="w-5 h-5"
                                color={theme.theme === 'dark' ? '#ffffff' : 'black'}
                            />
                            {!collapse && 'Đăng kí lịch'}
                        </Button>
                        <Button
                            onClick={() => handleNavitage('leave')}
                            variant={location.pathname.includes('leave') ? 'secondary' : 'ghost'}
                            className="w-full gap-3 justify-start h-10"
                        >
                            <Icons.time
                                className="w-5 h-5"
                                color={theme.theme === 'dark' ? '#ffffff' : 'black'}
                            />
                            {!collapse && 'Nghỉ phép'}
                        </Button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
