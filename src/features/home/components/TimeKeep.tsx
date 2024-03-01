import { Navbar } from '@/components/common';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useInfoUser } from '@/hooks';

import { Link, Outlet } from 'react-router-dom';

export const TimeKeep = () => {
    const user = useInfoUser();
    return (
        <>
            <div className="nav-bs dark:border-b">
                <Navbar />
                <div className="pl-4 pr-[70px] relative z-10 pt-1 pb-4 flex justify-between flex-row">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {user && (user.RoleName === 'Admin' || user.RoleName === 'Hr') && (
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link to="./timekeep-list">Danh sách chấm công</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )}
                            {user?.RoleName !== 'Admin' && (
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link to="./timekeep-reg">Chấm công</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <div className="p-5 flex-1 overflow-hidden">
                <Outlet />
            </div>
        </>
    );
};
